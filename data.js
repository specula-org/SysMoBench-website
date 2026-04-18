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

  // Leaderboard — values TBD; null renders as "TODO" in the UI.
  // To fill in, replace null with a number (score 0-100, cost USD per full run, perTask 0-100).
  models: [
    { id: "gpt-5-4",        name: "GPT-5.4",           org: "OpenAI",    logo: "assets/logos/openai.svg",         ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "gpt-5-2",        name: "GPT-5.2",           org: "OpenAI",    logo: "assets/logos/openai.svg",         ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "claude-opus-47", name: "Claude Opus 4.7",   org: "Anthropic", logo: "assets/logos/claude-color.svg",   ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "claude-sonnet-46",name:"Claude Sonnet 4.6", org: "Anthropic", logo: "assets/logos/claude-color.svg",   ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "gemini-31-pro",  name: "Gemini 3.1 Pro",    org: "Google",    logo: "assets/logos/gemini-color.svg",   ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "grok-4",         name: "Grok 4",            org: "xAI",       logo: "assets/logos/grok.svg",           ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "deepseek-v32",   name: "DeepSeek V3.2",     org: "DeepSeek",  logo: "assets/logos/deepseek-color.svg", ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "deepseek-r1",    name: "DeepSeek R1",       org: "DeepSeek",  logo: "assets/logos/deepseek-color.svg", ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "qwen3-6-plus",   name: "Qwen3.6 Plus",      org: "Alibaba",   logo: "assets/logos/qwen-color.svg",     ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "kimi-k25",       name: "Kimi K2.5",         org: "Moonshot",  logo: "assets/logos/moonshot.svg",       ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "glm-51",         name: "GLM 5.1",           org: "Zhipu",     logo: "assets/logos/zhipu-color.svg",    ctx: "TODO", cost: null, score: null, perTask: {} },
    { id: "minimax-m27",    name: "MiniMax-M2.7",      org: "MiniMax",   logo: "assets/logos/minimax-color.svg",  ctx: "TODO", cost: null, score: null, perTask: {} },
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
