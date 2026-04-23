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
    { id: "claude-opus-47",  name: "Claude Opus 4.7",   org: "Anthropic", logo: "assets/logos/claude-color.svg",   ctx: "TODO", score: 91.3,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 85.8, invariant: 79.4 },
      perTask: { spin: 100, mutex: 81, rwmutex: 97.5, ringbuf: 100, locksvc: 79.2, xline: 83.9, raftkvs: 88.3, redis: 98.4, zk: 84.8, etcd: 91.2, dqueue: 100 } },
    { id: "gemini-31-pro",   name: "Gemini 3.1 Pro",    org: "Google",    logo: "assets/logos/gemini-color.svg",   ctx: "TODO", score: 91.2,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 84.2, invariant: 80.6 },
      perTask: { spin: 100, mutex: 84.5, rwmutex: 97.5, ringbuf: 100, locksvc: 83.3, xline: 88.7, raftkvs: 90, redis: 81.2, zk: 84.8, etcd: 93.1, dqueue: 100 } },
    { id: "gpt-5-4",         name: "GPT-5.4",           org: "OpenAI",    logo: "assets/logos/openai.svg",         ctx: "TODO", score: 88.3,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 88.3, invariant: 64.8 },
      perTask: { spin: 100, mutex: 81, rwmutex: 97.5, ringbuf: 100, locksvc: 83.3, xline: 89.3, raftkvs: 75, redis: 82.3, zk: 91.7, etcd: 96.2, dqueue: 75 } },
    { id: "claude-sonnet-46",name: "Claude Sonnet 4.6", org: "Anthropic", logo: "assets/logos/claude-color.svg",   ctx: "TODO", score: 86.8,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 68.2, invariant: 78.9 },
      perTask: { spin: 100, mutex: 92.9, rwmutex: 95, ringbuf: 75, locksvc: 79.2, xline: 100, raftkvs: 75, redis: 92.7, zk: 82.6, etcd: 87.3, dqueue: 75 } },
    { id: "gpt-5-2",         name: "GPT-5.2",           org: "OpenAI",    logo: "assets/logos/openai.svg",         ctx: "TODO", score: 86.2,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 68.9, invariant: 75.9 },
      perTask: { spin: 100, mutex: 96.4, rwmutex: 97.5, ringbuf: 62.5, locksvc: 89.6, xline: 83.9, raftkvs: 91.7, redis: 85.6, zk: 81.1, etcd: 85, dqueue: 75 } },
    { id: "deepseek-r1",     name: "DeepSeek R1",       org: "DeepSeek",  logo: "assets/logos/deepseek-color.svg", ctx: "TODO", score: 83.5,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 67.5, invariant: 66.4 },
      perTask: { spin: 100, mutex: 100, rwmutex: 95, ringbuf: 75, locksvc: 77.1, xline: 91.7, raftkvs: 64.3, redis: 86.5, zk: 63.6, etcd: 65, dqueue: 100 } },
    { id: "grok-4",          name: "Grok 4",            org: "xAI",       logo: "assets/logos/grok.svg",           ctx: "TODO", score: 83.5,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 65.8, invariant: 68.1 },
      perTask: { spin: 87.5, mutex: 96.4, rwmutex: 97.5, ringbuf: 75, locksvc: 83.3, xline: 88.1, raftkvs: 75, redis: 80.2, zk: 75, etcd: 60, dqueue: 100 } },
    { id: "qwen3-6-plus",    name: "Qwen3.6 Plus",      org: "Alibaba",   logo: "assets/logos/qwen-color.svg",     ctx: "TODO", score: 81.5,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 70.9, invariant: 54.9 },
      perTask: { spin: 100, mutex: 96.4, rwmutex: 89.2, ringbuf: 100, locksvc: 79.2, xline: 81.5, raftkvs: 90, redis: 88, zk: 66.7, etcd: 55, dqueue: 50 } },
    { id: "deepseek-v32",    name: "DeepSeek V3.2",     org: "DeepSeek",  logo: "assets/logos/deepseek-color.svg", ctx: "TODO", score: 77.0,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 65.0, invariant: 43.0 },
      perTask: { spin: 92.9, mutex: 84.5, rwmutex: 81.7, ringbuf: 100, locksvc: 77.1, xline: 75, raftkvs: 86.7, redis: 72.5, zk: 66.7, etcd: 60, dqueue: 50 } },
    { id: "kimi-k25",        name: "Kimi K2.5",         org: "Moonshot",  logo: "assets/logos/moonshot.svg",       ctx: "TODO", score: 74.1,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 54.8, invariant: 41.6 },
      perTask: { spin: 64.3, mutex: 96.4, rwmutex: 75, ringbuf: 75, locksvc: 83.3, xline: 70.8, raftkvs: 80, redis: 58.3, zk: 87.1, etcd: 50, dqueue: 75 } },
    { id: "minimax-m27",     name: "MiniMax-M2.7",      org: "MiniMax",   logo: "assets/logos/minimax-color.svg",  ctx: "TODO", score: 65.8,
      perMetric: { syntax: 100.0, runtime: 100.0, conformance: 44.6, invariant: 18.6 },
      perTask: { spin: 80.4, mutex: 58.3, rwmutex: 66.7, ringbuf: 87.5, locksvc: 70.8, xline: 70.8, raftkvs: 62.5, redis: 66.7, zk: 50, etcd: 60, dqueue: 50 } }
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
