/*
 * Publications data — sourced from Google Scholar
 * Profile: https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en
 * Last synced: Feb 2026 | Total citations: 156 | h-index: 3
 */

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  citations: number;
  link: string;
  tags: string[];
  featured?: boolean;
}

export const scholarStats = {
  totalCitations: 156,
  hIndex: 3,
  i10Index: 3,
  profileUrl: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
};

export const publications: Publication[] = [
  {
    title: "Ofl-Md: Exploring One-Shot Federated Learning for Melanoma Diagnosis With Pre-Trained Models",
    authors: "Z Jiang, L Liu, Z Li, Y Xie, Y Wang, B Hou, J Chi, X Liu",
    venue: "IEEE International Conference on Bioinformatics and Biomedicine (BIBM)",
    year: "2025",
    citations: 0,
    link: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
    tags: ["Federated Learning", "Medical AI", "One-Shot Learning"],
  },
  {
    title: "PFL-MD: A Privacy-Preserving Federated Learning Framework for Melanoma Diagnosis with Multiple Party Fully Homomorphic Encryption",
    authors: "L Liu, Y Wang, J Li, M Zheng, Z Jiang, Y Song, X Liu",
    venue: "IEEE International Conference on Bioinformatics and Biomedicine (BIBM)",
    year: "2025",
    citations: 0,
    link: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
    tags: ["Federated Learning", "Privacy", "Homomorphic Encryption", "Medical AI"],
    featured: true,
  },
  {
    title: "Yotta: A Large-Scale Trustless Data Trading Scheme for Blockchain System",
    authors: "X Liu, Z Guo, L Liu, M Zheng, Y Qiu, L Jiang",
    venue: "arXiv preprint",
    year: "2025",
    citations: 0,
    link: "https://arxiv.org/abs/2506.19368",
    tags: ["Blockchain", "Data Trading", "Trustless Systems"],
  },
  {
    title: "FedLPA: One-shot Federated Learning with Layer-Wise Posterior Aggregation",
    authors: "X Liu, L Liu, F Ye, Y Shen, X Li, L Jiang, J Li",
    venue: "Conference on Neural Information Processing Systems (NeurIPS)",
    year: "2024",
    citations: 22,
    link: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
    tags: ["Federated Learning", "Bayesian Inference", "Posterior Aggregation"],
    featured: true,
  },
  {
    title: "Evaluating Modern Approaches in 3D Scene Reconstruction: NeRF vs Gaussian-Based Methods",
    authors: "Y Zhou, Z Zeng, A Chen, X Zhou, H Ni, S Zhang, P Li, L Liu, et al.",
    venue: "International Conference on Data-driven Optimization of Complex Systems (DOCS), IEEE",
    year: "2024",
    citations: 40,
    link: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
    tags: ["NeRF", "3D Reconstruction", "Gaussian Splatting"],
  },
  {
    title: "A Bayesian Federated Learning Framework with Online Laplace Approximation",
    authors: "L Liu, X Jiang, F Zheng, H Chen, GJ Qi, H Huang, L Shao",
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI), 46(1), 1–16",
    year: "2023",
    citations: 94,
    link: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
    tags: ["Bayesian Learning", "Federated Learning", "Laplace Approximation", "Non-IID"],
    featured: true,
  },
  {
    title: "Brain Storm Optimized Swarm Collaboration for Bus Scheduling",
    authors: "L Liu, S Ma, JS Huang",
    venue: "IEEE 90th Vehicular Technology Conference (VTC)",
    year: "2019",
    citations: 0,
    link: "https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en",
    tags: ["Swarm Intelligence", "Optimization", "Transportation"],
  },
];
