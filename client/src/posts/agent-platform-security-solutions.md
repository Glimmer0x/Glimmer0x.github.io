---
title: "Agent 协作平台安全方案：从威胁到防御的工程实践"
date: "2026-04-16"
tags: ["Agent", "Security", "AI Safety", "System Design"]
excerpt: "在明确了 Agent 协作平台的六类安全威胁之后，本文给出八个具体的工程防御方案（A-H），并通过威胁矩阵和纵深防御结构说明它们如何协同工作。"
---

# Agent 协作平台安全方案：从威胁到防御的工程实践

> 本文是 [Agent 协作平台的安全威胁分类框架](/blog/agent-platform-security-taxonomy) 的续篇。上篇建立了六类威胁的分类体系，本文给出对应的工程防御方案。

## 方案总览

本方案整合了四项核心用户需求与业界成熟实践，扩展为八个防御方案（A-H）。设计约束是**"受控的自由"**——agent 需保留对用户本地设备的真实操作能力，不采用 VM/容器强隔离。

---

## 八个防御方案

### 方案 A：端到端消息加密

**参考**：Signal Protocol、WhatsApp、MLS (Messaging Layer Security)

消息在发送端加密，只有接收端（人类用户或其 agent）能解密。平台作为消息中转，只看到密文。

| 防御类别 | 具体效果 |
|---|---|
| 类型 2 身份真实性 | 防止平台作为 MITM 篡改消息内容 |
| 类型 4 数据机密性 | 防止平台窥探消息内容，防止消息在传输中泄漏 |

**局限**：只防平台级攻击，不防 channel 内合法成员的恶意行为。

---

### 方案 B：消息签名 + Agent 校验

**参考**：Web PKI、OIDC、邮件 DKIM

每条消息由发送方用私钥签名（human 用户设备绑定密钥、agent 有独立身份证书）。Agent 收到消息时校验签名，识别发送者类型（human / agent）和具体身份，签名信息进入 agent context，作为信任层级判断依据。敏感操作要求"必须由可信 human 身份签名的消息触发"。

| 防御类别 | 具体效果 |
|---|---|
| 类型 1 输入完整性 | Agent 可区分指令来源的可信度（human 主人 > 其他 human > 其他 agent > 外部内容），敏感操作只响应高可信来源 |
| 类型 2 身份真实性 | 消息无法被伪造，人/agent 身份明确可验证 |

**关键设计点**：签名仅证明"谁说的"，不证明"该不该执行"。仍需配合其他机制处理"合法用户发出的恶意指令"。

---

### 方案 C：本地文件系统抽象层（Capability-based）

**参考**：macOS TCC、Android 运行时权限、Deno 权限模型（`--allow-read=/path`）、Capability-based Security（KeyKOS、Fuchsia、WebAssembly Component Model）、Linux seccomp-bpf

**默认拒绝**：Agent 进程通过 OS 原生 sandbox 机制启动，默认无法访问 `~/.ssh`、`~/.aws`、`~/Library/Keychains`、浏览器数据目录等敏感位置。

**Capability 申请**：Agent 需访问特定资源时，向用户申请限定范围的 capability token（"读 `~/project-x` 下文件，30 分钟内有效"）。

**Capability 衰减**：user→agent→subagent 传递的 capability 权限只能等于或小于上游，防止权限在委托链中被放大。

| 防御类别 | 具体效果 |
|---|---|
| 类型 3 权限与爆炸半径 | Agent 默认无本地敏感权限，即使被劫持也无法直接访问关键凭证 |
| 类型 3 权限与爆炸半径 | 供应链攻击（恶意 MCP、依赖包）受 capability 范围限制 |
| 类型 4 数据机密性 | 机密文件（SSH key、云凭证、密码库）从源头不进入 agent 视野 |

---

### 方案 D：本地策略执行层（PEP）

**参考**：Open Policy Agent (OPA)、AWS Cedar

**关键设计决策**：我最初的想法是用一个 LLM 形态的"门卫 agent"来审查动作。但这个设计有个根本缺陷——门卫本身是 LLM，它同样会被 prompt injection，反而成为攻击者的帮凶。因此改为**确定性的策略引擎**（规则型，不涉及自然语言理解）——LLM 只负责生成意图，策略引擎负责判断是否允许。

所有 agent 动作（文件访问、网络请求、shell 命令、工具调用）在执行前必须通过策略引擎检查。策略用声明式 DSL（Cedar/Rego）表达，可审查、版本化、分发。

```
输入：{谁, 做什么, 参数, 上下文}
输出：允许 / 拒绝 / 需要人类确认
```

| 防御类别 | 具体效果 |
|---|---|
| 类型 1 输入完整性 | 即使 agent 被 prompt inject，它的动作仍被策略层拦截 |
| 类型 3 权限与爆炸半径 | 提供统一的动作拦截点，限制 agent 服务商作恶、agent bug 的影响范围 |

---

### 方案 E：人类确认分级（HITL Tiering）

**参考**：Claude Code、Cursor、Aider 的实践

操作按可逆性分三级：

- **read-only** → 免确认
- **reversible write** → 正常执行但记录日志，用户可事后撤销
- **irreversible**（`rm -rf`、`git push -f`、发邮件、支付、对外 API 调用）→ 强制 dry-run + 人类确认

**Dry-run 输出**：先展示将要执行的命令/diff/API 调用参数，用户确认后才真正执行。**Batching**：相似操作打包成一次确认，防止确认疲劳。**TTL 偏好**："允许此类操作 1 小时"，而非永久授权。

| 防御类别 | 具体效果 |
|---|---|
| 类型 1 输入完整性 | 即使恶意指令通过前置防御，不可逆操作仍需 human 最后把关 |
| 类型 3 权限与爆炸半径 | Agent 自身失误在不可逆操作上有最后防线 |

---

### 方案 F：资源配额与熔断

**参考**：Netflix Hystrix、AWS quota 体系、Stripe rate limiting

**多层配额**：per-user / per-agent / per-session / per-operation 的 token、API call、成本上限。**Runaway detection**：同一动作重复无变化地执行 N 次自动熔断（防 infinite loop）。**三级 Kill Switch**（带外触发，不依赖可能被攻破的组件）：

- Per-agent：停单个 agent
- Per-user：停用户所有 agent
- Global：停整个平台 agent 活动

**实时成本 Dashboard**：用户能看到所有活跃 agent 的实时花费——用户心理掌控感（看得见的配额比实际数字更消除顾虑）。

| 防御类别 | 具体效果 |
|---|---|
| 类型 5 资源与成本控制 | 防止经济型攻击（烧 API quota、挖矿、代理跳板） |
| 类型 5 资源与成本控制 | Agent bug 导致的成本失控有硬性上限 |

---

### 方案 G：哈希链审计日志与会话回放

**参考**：Certificate Transparency、AWS CloudTrail、Git、LangSmith、LangFuse

**Append-only + Hash chain**：每条日志记录前一条的 hash，任何篡改断裂链条。**结构化 5W1H**：Who / What / When / Where / Why（Why 对 agent 尤其重要——包含 LLM reasoning trace）。**完整会话记录**：Agent 看到的所有 input（消息、文件、工具返回）+ 产生的所有 output（推理、工具调用、消息）。

**定期 Checkpoint 外发**：日志 head hash 定期推送到独立位置（如用户邮箱），防攻击者抹除本地证据。**可回放**：给定 session ID，能精确重建"agent 当时眼中的世界"。

| 防御类别 | 具体效果 |
|---|---|
| 类型 6 可观测性与事后恢复 | 出事后可查清攻击路径、追责 |
| 类型 6 可观测性与事后恢复 | 日志抗篡改，攻击者无法抹痕迹 |
| 类型 6 可观测性与事后恢复 | Reasoning trace 可判断事故是 injection、bug 还是恶意指令 |

---

### 方案 H：凭证撤销与设备管理

**参考**：Web PKI（CRL/OCSP）、OAuth token revocation、AWS STS

**短命 Token + 在线验证**：避免长期 JWT 无法撤销的问题。**中心化 Dashboard**：用户看到所有活跃设备、活跃 agent 实例、活跃凭证。**设备绑定**：每台设备的 agent 凭证独立，换机/离职/卖电脑时可精准撤销。

| 防御类别 | 具体效果 |
|---|---|
| 类型 2 身份真实性 | 离职、换机、设备丢失后旧身份立即作废 |
| 类型 6 可观测性与事后恢复 | 发现异常时可立即切断攻击链 |

---

## 方案与威胁类型的矩阵对照

| | 类型 1 输入完整性 | 类型 2 身份真实性 | 类型 3 权限/爆炸半径 | 类型 4 数据机密性 | 类型 5 资源成本 | 类型 6 可观测性 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| A. E2E 消息加密 | | ● | | ● | | |
| B. 消息签名 + 校验 | ● | ●●● | | | | |
| C. 文件系统抽象层 + Capability | | | ●●● | ●●● | | |
| D. 策略执行层（PEP） | ●● | | ●●● | | | |
| E. 人类确认分级 | ●● | | ●● | | | |
| F. 配额与熔断 | | | | | ●●● | |
| G. 哈希链审计日志 | | | | | | ●●● |
| H. 凭证撤销 | | ●● | | | | ●● |

**●●● 主要防御 / ●● 重要贡献 / ● 辅助作用**

---

## 纵深防御结构

一次成功的攻击需要同时突破多层防御：

```
攻击尝试：恶意消息 → 我的 agent → 本地破坏
           ↓
      [A] 平台层加密？   → 平台看不到消息内容
           ↓
      [B] 签名校验？     → Agent 识别为低可信来源
           ↓
      [D] 策略执行层？   → 动作被规则拦截
           ↓
      [C] 文件系统层？   → 敏感路径默认拒绝
           ↓
      [E] HITL 确认？    → 不可逆操作需 human 确认
           ↓
      [F] 配额熔断？     → 异常重复被阻断
           ↓
      [G] 审计日志       → 即使突破所有层，留下完整证据
           ↓
      [H] 凭证撤销       → 发现后立即切断
```

**关键洞察**：任何单一机制都不能完整解决任何一类问题。真正的安全性来自多层机制的组合，且每层机制**独立运作、互不依赖**——一层被攻破不影响其他层。

---

## 与原始顾虑的最终映射

| 用户原始顾虑 | 主要防御机制 |
|---|---|
| ① 平台方发布恶意 prompt | A（加密）+ B（签名） |
| ② 社区成员恶意指挥他人 agent | B（签名区分来源）+ D（策略拦截）+ E（HITL）|
| ③ Agent 服务商攻击本地设备 | C（capability 限制）+ D（策略拦截）+ G（日志追责）|
| ④ Agent 出错造成不可逆后果 | E（HITL 强制确认）+ F（熔断）+ G（可回放）|

---

## 实施优先级

**MVP（不做就不能上线）**：B（消息签名）、C（文件系统 sandbox + 基础 capability）、E（HITL 分级）、F（基础配额 + kill switch）、G（基础审计日志）

**V1.5**：A（E2E 加密）、D（策略引擎接入）、H（凭证撤销 Dashboard）

**V2+**：哈希链 + checkpoint 外发、Reasoning trace 完整记录、Capability 衰减机制、复杂策略 DSL
