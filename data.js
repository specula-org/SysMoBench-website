// Shared placeholder data for SysMoBench wireframes.
// All numbers are placeholders until real results are plugged in.

window.SMB_DATA = {
  paper: {
    title: "SysMoBench: Evaluating AI on Formally Modeling Complex Real-World Systems",
    venue: "ICLR 2026",
    arxiv: "2509.23130",
    authors: [
      "Qian Cheng", "Ruize Tang", "Emilie Ma", "Finn Hackett", "Peiyang He",
      "Yiming Su", "Ivan Beschastnikh", "Yu Huang", "Xiaoxing Ma", "Tianyin Xu"
    ],
    // {NUM_SYSTEMS} is substituted with SMB_DATA.tasks.length at render time.
    abstract: "Formal models are essential to specifying large, complex computer systems and verifying their correctness, but are notoriously expensive to write and maintain. SysMoBench evaluates AI's ability to formally model large, complex concurrent and distributed systems using TLA+, the de facto specification language. We automate metrics like syntactic and runtime correctness, conformance to system code, and invariant correctness across {NUM_SYSTEMS} real-world system artifacts."
  },

  tasks: [
    { id: "spin",    name: "Asterinas Spinlock", kind: "Concurrent",  desc: "Synchronization",        lang: "Rust", github: "https://github.com/asterinas/asterinas" },
    { id: "mutex",   name: "Asterinas Mutex",    kind: "Concurrent",  desc: "Synchronization",        lang: "Rust", github: "https://github.com/asterinas/asterinas" },
    { id: "rwmutex", name: "Asterinas Rwmutex",  kind: "Concurrent",  desc: "Synchronization",        lang: "Rust", github: "https://github.com/asterinas/asterinas" },
    { id: "ringbuf", name: "Asterinas Ringbuffer",kind: "Concurrent", desc: "Lock-free Queue",        lang: "Rust", github: "https://github.com/asterinas/asterinas" },
    { id: "etcd",    name: "Etcd Raft",          kind: "Distributed", desc: "Consensus (Raft)",       lang: "Go",   github: "https://github.com/etcd-io/raft" },
    { id: "redis",   name: "Redis Raft",         kind: "Distributed", desc: "Consensus (Raft)",       lang: "C",    github: "https://github.com/RedisLabs/redisraft" },
    { id: "zk",      name: "ZooKeeper LE",       kind: "Distributed", desc: "Leader Election",        lang: "Java", github: "https://github.com/apache/zookeeper" },
    { id: "xline",   name: "Xline CURP",         kind: "Distributed", desc: "Replication (CURP)",    lang: "Rust", github: "https://github.com/xline-kv/Xline" },
    { id: "dqueue",  name: "PGo dqueue",         kind: "Distributed", desc: "Distributed Queue",     lang: "Go",   github: "https://github.com/DistCompiler/pgo" },
    { id: "locksvc", name: "PGo locksvc",        kind: "Distributed", desc: "Lock Server",            lang: "Go",   github: "https://github.com/DistCompiler/pgo" },
    { id: "raftkvs", name: "PGo raftkvs",        kind: "Distributed", desc: "Consensus (Raft)",       lang: "Go",   github: "https://github.com/DistCompiler/pgo" }
  ],

  metrics: [
    { id: "syntax",     name: "Syntax Correctness",   blurb: "SANY parser + per-action decomposition." },
    { id: "runtime",    name: "Runtime Correctness",  blurb: "TLC bounded model checking + coverage." },
    { id: "conformance",name: "Conformance",          blurb: "Trace validation against instrumented code." },
    { id: "invariant",  name: "Invariant Correctness",blurb: "TLC with expert-written invariant templates." }
  ],

  // Leaderboard — sourced from docs/leaderboard/paper_summary_repaired.csv (values ×100).
  models: [
    { id: "gemini-31-pro",   name: "Gemini 3.1 Pro",    org: "Google",    logo: "assets/logos/gemini-color.svg",   ctx: "TODO", score: 86.6,
      perMetric: { syntax: 100.0, runtime: 92.4, conformance: 84.2, invariant: 80.6 },
      perTask: { spin: 100, mutex: 78.3, rwmutex: 96.5, ringbuf: 100, locksvc: 76.7, xline: 84.2, raftkvs: 78.5, redis: 73.7, zk: 78.8, etcd: 85.3, dqueue: 100 } },
    { id: "claude-opus-47",  name: "Claude Opus 4.7",   org: "Anthropic", logo: "assets/logos/claude-color.svg",   ctx: "TODO", score: 82.8,
      perMetric: { syntax: 100.0, runtime: 66.7, conformance: 85.8, invariant: 79.4 },
      perTask: { spin: 100, mutex: 58.3, rwmutex: 96.5, ringbuf: 100, locksvc: 70.8, xline: 62.5, raftkvs: 83.7, redis: 82.8, zk: 68.8, etcd: 87.6, dqueue: 100 } },
    { id: "gpt-5-4",         name: "GPT-5.4",           org: "OpenAI",    logo: "assets/logos/openai.svg",         ctx: "TODO", score: 79.8,
      perMetric: { syntax: 100.0, runtime: 74.8, conformance: 88.3, invariant: 64.8 },
      perTask: { spin: 100, mutex: 73.3, rwmutex: 96.5, ringbuf: 90, locksvc: 76.7, xline: 73.8, raftkvs: 61.2, redis: 73.6, zk: 88.3, etcd: 79.6, dqueue: 65 } },
    { id: "claude-sonnet-46",name: "Claude Sonnet 4.6", org: "Anthropic", logo: "assets/logos/claude-color.svg",   ctx: "TODO", score: 78.0,
      perMetric: { syntax: 100.0, runtime: 77.0, conformance: 68.2, invariant: 78.9 },
      perTask: { spin: 100, mutex: 90, rwmutex: 93, ringbuf: 65, locksvc: 70.8, xline: 85, raftkvs: 60, redis: 74.8, zk: 75.6, etcd: 79.2, dqueue: 65 } },
    { id: "grok-4",          name: "Grok 4",            org: "xAI",       logo: "assets/logos/grok.svg",           ctx: "TODO", score: 70.8,
      perMetric: { syntax: 95.5, runtime: 64.5, conformance: 65.8, invariant: 68.1 },
      perTask: { spin: 82.5, mutex: 95, rwmutex: 96.5, ringbuf: 65, locksvc: 61.7, xline: 83.3, raftkvs: 42.5, redis: 57.3, zk: 65, etcd: 30.5, dqueue: 100 } },
    { id: "deepseek-r1",     name: "DeepSeek R1",       org: "DeepSeek",  logo: "assets/logos/deepseek-color.svg", ctx: "TODO", score: 67.8,
      perMetric: { syntax: 85.1, runtime: 54.5, conformance: 67.5, invariant: 66.4 },
      perTask: { spin: 100, mutex: 100, rwmutex: 93, ringbuf: 65, locksvc: 67.9, xline: 73.3, raftkvs: 27.1, redis: 57.5, zk: 34.1, etcd: 27.8, dqueue: 100 } },
    { id: "qwen3-6-plus",    name: "Qwen3.6 Plus",      org: "Alibaba",   logo: "assets/logos/qwen-color.svg",     ctx: "TODO", score: 67.4,
      perMetric: { syntax: 95.3, runtime: 60.6, conformance: 70.9, invariant: 54.9 },
      perTask: { spin: 100, mutex: 95, rwmutex: 84.8, ringbuf: 100, locksvc: 59.6, xline: 69.2, raftkvs: 71, redis: 60.5, zk: 53.3, etcd: 33.2, dqueue: 15 } },
    { id: "gpt-5-2",         name: "GPT-5.2",           org: "OpenAI",    logo: "assets/logos/openai.svg",         ctx: "TODO", score: 66.5,
      perMetric: { syntax: 75.6, runtime: 30.0, conformance: 68.9, invariant: 75.9 },
      perTask: { spin: 100, mutex: 95, rwmutex: 96.5, ringbuf: 37, locksvc: 62.9, xline: 62.5, raftkvs: 65.3, redis: 56.2, zk: 58.5, etcd: 55.8, dqueue: 42.1 } },
    { id: "kimi-k25",        name: "Kimi K2.5",         org: "Moonshot",  logo: "assets/logos/moonshot.svg",       ctx: "TODO", score: 62.1,
      perMetric: { syntax: 100.0, runtime: 64.8, conformance: 56.7, invariant: 50.0 },
      perTask: { spin: 50, mutex: 95, rwmutex: 65, ringbuf: 65, locksvc: 74.5, xline: 59.2, raftkvs: 57, redis: 30.8, zk: 82, etcd: 54.3, dqueue: 50 } },
    { id: "deepseek-v32",    name: "DeepSeek V3.2",     org: "DeepSeek",  logo: "assets/logos/deepseek-color.svg", ctx: "TODO", score: 53.8,
      perMetric: { syntax: 70.2, runtime: 36.4, conformance: 65.0, invariant: 43.0 },
      perTask: { spin: 90, mutex: 78.3, rwmutex: 51.1, ringbuf: 100, locksvc: 45, xline: 41.4, raftkvs: 58.3, redis: 38.2, zk: 38.3, etcd: 20.7, dqueue: 30 } },
    { id: "minimax-m27",     name: "MiniMax-M2.7",      org: "MiniMax",   logo: "assets/logos/minimax-color.svg",  ctx: "TODO", score: 39.1,
      perMetric: { syntax: 81.4, runtime: 31.8, conformance: 44.6, invariant: 18.6 },
      perTask: { spin: 72.5, mutex: 30.4, rwmutex: 49.6, ringbuf: 82.5, locksvc: 36.7, xline: 44.2, raftkvs: 24.7, redis: 30.4, zk: 22.5, etcd: 21.5, dqueue: 15 } }
  ],

  bibtex: `@inproceedings{cheng2026sysmobench,
  title     = {SysMoBench: Evaluating AI on Formally Modeling Complex Real-World Systems},
  author    = {Cheng, Qian and Tang, Ruize and Ma, Emilie and Hackett, Finn and
               He, Peiyang and Su, Yiming and Beschastnikh, Ivan and Huang, Yu and
               Ma, Xiaoxing and Xu, Tianyin},
  booktitle = {International Conference on Learning Representations (ICLR)},
  year      = {2026},
  url       = {https://arxiv.org/abs/2509.23130}
}`
};
