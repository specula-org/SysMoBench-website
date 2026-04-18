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
    abstract: "Formal models are essential to specifying large, complex computer systems and verifying their correctness, but are notoriously expensive to write and maintain. SysMoBench evaluates AI's ability to formally model large, complex concurrent and distributed systems using TLA+, the de facto specification language. We automate metrics like syntactic and runtime correctness, conformance to system code, and invariant correctness across nine real-world system artifacts."
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

  // Placeholder leaderboard — overall score 0-100, cost in USD per full run.
  // perTask is a score per task id (0-100).
  models: [
    { id: "gpt5",       name: "GPT-5",             org: "OpenAI",    ctx: "400K", cost: 12.40, score: 61.2,
      perTask: { spin: 78, mutex: 71, rwmutex: 64, etcd: 58, redis: 55, xline: 44, dqueue: 68, locksvc: 62, raftkvs: 51, ringbuf: 67, zk: 56 } },
    { id: "claude-opus",name: "Claude Opus 4.5",   org: "Anthropic", ctx: "200K", cost: 18.90, score: 64.8,
      perTask: { spin: 82, mutex: 76, rwmutex: 69, etcd: 61, redis: 58, xline: 47, dqueue: 72, locksvc: 66, raftkvs: 54, ringbuf: 72, zk: 59 } },
    { id: "claude-sonnet",name: "Claude Sonnet 4.5",org: "Anthropic",ctx: "200K", cost:  4.20, score: 57.3,
      perTask: { spin: 74, mutex: 68, rwmutex: 59, etcd: 53, redis: 50, xline: 41, dqueue: 64, locksvc: 58, raftkvs: 49, ringbuf: 64, zk: 51 } },
    { id: "gemini3",    name: "Gemini 3 Pro",      org: "Google",    ctx: "1M",   cost:  8.60, score: 59.7,
      perTask: { spin: 76, mutex: 70, rwmutex: 62, etcd: 55, redis: 53, xline: 43, dqueue: 66, locksvc: 60, raftkvs: 50, ringbuf: 65, zk: 53 } },
    { id: "gemini25",   name: "Gemini 2.5 Pro",    org: "Google",    ctx: "1M",   cost:  3.10, score: 52.4,
      perTask: { spin: 69, mutex: 62, rwmutex: 55, etcd: 48, redis: 45, xline: 36, dqueue: 59, locksvc: 52, raftkvs: 45, ringbuf: 58, zk: 46 } },
    { id: "gpt4o",      name: "GPT-4o",            org: "OpenAI",    ctx: "128K", cost:  2.80, score: 48.9,
      perTask: { spin: 65, mutex: 58, rwmutex: 51, etcd: 44, redis: 41, xline: 32, dqueue: 55, locksvc: 48, raftkvs: 42, ringbuf: 54, zk: 42 } },
    { id: "deepseek-r1",name: "DeepSeek R1",       org: "DeepSeek",  ctx: "128K", cost:  0.90, score: 50.6,
      perTask: { spin: 67, mutex: 60, rwmutex: 53, etcd: 46, redis: 43, xline: 35, dqueue: 57, locksvc: 50, raftkvs: 44, ringbuf: 56, zk: 44 } },
    { id: "deepseek-v3",name: "DeepSeek V3",       org: "DeepSeek",  ctx: "128K", cost:  0.40, score: 43.1,
      perTask: { spin: 58, mutex: 51, rwmutex: 44, etcd: 38, redis: 35, xline: 27, dqueue: 48, locksvc: 42, raftkvs: 36, ringbuf: 47, zk: 36 } },
    { id: "qwen3",      name: "Qwen3-235B",        org: "Alibaba",   ctx: "128K", cost:  0.50, score: 41.8,
      perTask: { spin: 56, mutex: 49, rwmutex: 42, etcd: 36, redis: 34, xline: 25, dqueue: 46, locksvc: 40, raftkvs: 35, ringbuf: 45, zk: 34 } },
    { id: "llama3",     name: "Llama 3.3 70B",     org: "Meta",      ctx: "128K", cost:  0.30, score: 34.2,
      perTask: { spin: 48, mutex: 40, rwmutex: 33, etcd: 28, redis: 25, xline: 18, dqueue: 38, locksvc: 32, raftkvs: 27, ringbuf: 37, zk: 26 } },
    { id: "agent-placeholder", name: "[Agent methods — placeholder]", org: "—", ctx: "—", cost: null, score: null,
      perTask: {}, placeholder: true }
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
