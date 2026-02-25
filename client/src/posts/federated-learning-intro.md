---
title: "Federated Learning: Training AI Without Sharing Your Data"
date: "2025-01-15"
tags: ["Federated Learning", "Privacy", "Machine Learning"]
excerpt: "A deep dive into how federated learning enables collaborative model training while keeping sensitive data on-device — and why it matters for the future of AI."
---

# Federated Learning: Training AI Without Sharing Your Data

The conventional approach to training machine learning models is straightforward: collect data from users, centralize it on a server, and train a model on the aggregated dataset. This paradigm has powered the AI revolution, but it comes with a fundamental tension — the more data you collect, the more privacy you compromise.

**Federated Learning** (FL) offers a compelling alternative. Instead of moving data to the model, we move the model to the data.

## The Core Idea

In a federated learning setup, the training process looks like this:

1. A central server distributes the current global model to a set of participating clients (e.g., mobile devices, hospitals, edge nodes).
2. Each client trains the model locally on its private data.
3. Only the **model updates** (gradients or weight deltas) are sent back to the server — never the raw data.
4. The server aggregates these updates (typically via FedAvg) to produce an improved global model.
5. The cycle repeats.

```python
# Simplified FedAvg aggregation
def federated_average(client_weights, client_sizes):
    total_samples = sum(client_sizes)
    averaged_weights = {}
    for key in client_weights[0].keys():
        averaged_weights[key] = sum(
            w[key] * (n / total_samples)
            for w, n in zip(client_weights, client_sizes)
        )
    return averaged_weights
```

## The Non-IID Challenge

The most significant challenge in federated learning is **statistical heterogeneity**. In practice, data across clients is rarely independent and identically distributed (IID). A hospital in Boston sees different patient demographics than one in rural China. A smartphone user in Tokyo has different typing patterns than one in São Paulo.

This non-IID nature causes the local models to drift in different directions during training, a phenomenon known as **client drift**. Naive aggregation of drifted models leads to a global model that performs poorly for everyone.

My work on [*A Bayesian Federated Learning Framework with Online Laplace Approximation*](https://scholar.google.com/citations?user=LOsVJ_8AAAAJ) (TPAMI 2023) addresses this challenge by maintaining a Bayesian posterior over model parameters at each client, enabling more principled aggregation that accounts for local data uncertainty.

## Privacy: A Nuanced Picture

It's tempting to assume that federated learning is inherently private because raw data never leaves the client. The reality is more nuanced.

**Gradient inversion attacks** have demonstrated that it's often possible to reconstruct training data from shared gradients with surprising fidelity. This has spurred research into combining FL with formal privacy guarantees:

- **Differential Privacy (DP)**: Adding calibrated noise to gradients before sharing.
- **Secure Aggregation**: Using cryptographic protocols so the server only sees the aggregate, never individual updates.
- **Homomorphic Encryption (HE)**: Computing on encrypted gradients directly.

Our recent work on PFL-MD explores multi-party fully homomorphic encryption for medical image analysis — enabling multiple hospitals to collaboratively train melanoma detection models without any party seeing another's patient data.

## One-Shot Federated Learning

A newer direction that I find particularly exciting is **one-shot federated learning**, where the entire training process completes in a single round of communication. This dramatically reduces communication overhead and is especially relevant for settings where clients have limited connectivity.

Our NeurIPS 2024 paper, FedLPA, introduces layer-wise posterior aggregation for one-shot FL, achieving competitive accuracy with far fewer communication rounds than traditional approaches.

## Looking Ahead

Federated learning is no longer just an academic curiosity. Google uses it to improve Gboard's next-word prediction. Apple applies it to Siri and QuickType. Healthcare consortia are using it to train diagnostic models across hospital networks.

The next frontier lies at the intersection of FL with **large language models** — how do you fine-tune a 70B parameter model in a federated setting? How do you handle the communication costs? These are open problems that will define the next decade of distributed AI research.

---

*If you're interested in discussing federated learning research or collaboration opportunities, feel free to [reach out](/contact).*
