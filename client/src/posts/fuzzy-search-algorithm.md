---
title: "From O(N²) to O(N log N): How We Rebuilt a Search Engine for 20M Users"
date: "2024-11-08"
tags: ["Algorithms", "Rust", "Search", "Performance"]
excerpt: "The story of redesigning a fuzzy search system serving 20 million users — from identifying the bottleneck to shipping a novel two-stage ranking algorithm in Rust."
---

# From O(N²) to O(N log N): How We Rebuilt a Search Engine for 20M Users

When I joined OKBL USA Technology, the search team had a problem: the fuzzy search system was slow. Not "could be faster" slow — *blocking user experience* slow. With over 20 million active users, even a 50ms improvement in search latency translated to millions of better experiences per day.

This is the story of how we redesigned it.

## The Problem: Substring Matching at Scale

The original system used a straightforward approach: for each query, iterate over the entire product catalog and compute edit distance against every candidate. Clean, correct, and catastrophically slow at scale.

The time complexity was effectively **O(N × M × K)** where:
- N = number of catalog entries (~10 million)
- M = average entry length
- K = query length

For a typical query, this meant hundreds of milliseconds of pure computation before any ranking could begin.

## Identifying the Bottleneck

Before rewriting anything, we profiled extensively. The flamegraph told a clear story: 78% of CPU time was spent in the edit distance computation loop, and another 15% in memory allocation for intermediate strings.

Two insights emerged from this analysis:

1. **Most candidates can be eliminated early.** If a candidate shares no common substrings with the query, it cannot possibly be a good match. We were wasting cycles computing full edit distances for obviously irrelevant entries.

2. **The ranking step was doing redundant work.** The top-K selection was re-examining candidates that had already been partially scored.

## The Two-Stage Ranking Algorithm

The solution we designed separates the search into two distinct phases:

### Stage 1: Substring Cache Filtering

We precompute a **substring index** — a hash map from n-grams to candidate IDs. At query time, we decompose the query into n-grams and use set intersection to identify candidates that share at least one substring with the query.

```rust
struct SubstringIndex {
    ngram_to_ids: HashMap<String, Vec<u32>>,
    n: usize,
}

impl SubstringIndex {
    fn query(&self, q: &str) -> HashSet<u32> {
        let ngrams = extract_ngrams(q, self.n);
        ngrams.iter()
            .filter_map(|ng| self.ngram_to_ids.get(ng))
            .flatten()
            .copied()
            .collect()
    }
}
```

This reduces the candidate set from 10M to typically a few thousand — a **3-4 order of magnitude reduction** before any expensive computation.

### Stage 2: Progressive Dynamic Programming

For the filtered candidates, we use a modified edit distance algorithm with **early termination**. If the running minimum distance exceeds a threshold, we abandon the computation for that candidate.

```rust
fn bounded_edit_distance(s: &[u8], t: &[u8], max_dist: usize) -> Option<usize> {
    let m = s.len();
    let n = t.len();
    
    if m.abs_diff(n) > max_dist {
        return None; // Length difference alone exceeds threshold
    }
    
    let mut dp = vec![0usize; n + 1];
    for j in 0..=n { dp[j] = j; }
    
    for i in 1..=m {
        let mut prev = dp[0];
        dp[0] = i;
        let mut row_min = i;
        
        for j in 1..=n {
            let temp = dp[j];
            dp[j] = if s[i-1] == t[j-1] {
                prev
            } else {
                1 + prev.min(dp[j]).min(dp[j-1])
            };
            prev = temp;
            row_min = row_min.min(dp[j]);
        }
        
        if row_min > max_dist {
            return None; // Early termination
        }
    }
    
    if dp[n] <= max_dist { Some(dp[n]) } else { None }
}
```

## The Rust Rewrite

The algorithm was initially prototyped in Python for correctness validation. The production implementation was written in Rust, which gave us:

- **Zero-cost abstractions**: The iterator chains compile to tight loops with no overhead.
- **Memory control**: We pre-allocate the DP table once per search thread and reuse it across queries.
- **SIMD opportunities**: The n-gram extraction step benefits from SIMD string operations on modern CPUs.

The Rust implementation was exposed as a Python extension via PyO3, allowing seamless integration with the existing Python service layer.

## Results

After a staged rollout:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| P50 latency | 180ms | 42ms | **76% faster** |
| P99 latency | 890ms | 195ms | **78% faster** |
| Search hit rate | 61.3% | 87.1% | **+42.1%** |
| CPU usage | baseline | -56% | **56% reduction** |

The hit rate improvement was perhaps the most impactful metric — it meant users were finding what they were looking for far more often.

## Lessons Learned

**Profile before optimizing.** The bottleneck was not where we initially assumed. Without the flamegraph data, we might have spent weeks optimizing the wrong thing.

**Algorithmic improvements beat micro-optimizations.** Moving from O(N²) to O(N log N) delivered more than any amount of low-level tuning could have.

**Rust is worth the learning curve for performance-critical paths.** The 56% CPU reduction paid for the implementation time many times over.

---

*The full algorithm is described in our internal technical report. If you're working on similar problems, I'm happy to discuss the approach in more detail.*
