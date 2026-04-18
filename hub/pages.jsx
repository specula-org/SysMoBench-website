/* global React, SMB_DATA, HubLeaderboard, Reveal, CountUp, FadeIn, OrgDot, AnimBar, APhase1, APhase2, APhase3, APhase4 */
const { useState: useS_p, useEffect: useE_p, useRef: useR_p } = React;

function PhaseBanner({ phase }) {
  const Comp = (typeof window !== 'undefined') && [null, window.APhase1, window.APhase2, window.APhase3, window.APhase4][phase];
  if (!Comp) {
    return <div className="fig-placeholder" style={{ height: 200 }}>[ phase diagram loading… ]</div>;
  }
  return (
    <div className="phase-host">
      <Comp />
    </div>
  );
}

function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--ink)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="9" fill="url(#mg)" />
      <path d="M11 27 L11 13 L20 22 L29 13 L29 27" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="20" cy="22" r="2.4" fill="#fff" />
    </svg>
  );
}

function CopyBibBtn() {
  const [ok, setOk] = useS_p(false);
  return (
    <button className="copybtn" onClick={(e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(SMB_DATA.bibtex).then(() => { setOk(true); setTimeout(() => setOk(false), 1400); });
    }}>{ok ? "✓ copied" : "Copy"}</button>
  );
}

// ============ HOME ============
function PageHome({ go }) {
  return (
    <div>
      <section className="hero">
        <div className="wrap-narrow">
          <FadeIn>
            <div className="news-banner"><span className="dot" />Accepted at ICLR 2026</div>
            <h1>Can LLMs <em>Formally Model</em> Real-World Systems?</h1>
            <p className="lead">A benchmark for evaluating LLMs on generating TLA+ specifications for real-world concurrent and distributed systems — from Spinlocks to Raft.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
              <a className="btn accent" href="https://arxiv.org/pdf/2509.23130" target="_blank">Read the Paper</a>
              <button className="btn primary" onClick={() => go("leaderboard")}>View Leaderboard</button>
              <a className="btn ghost" href="https://github.com/specula-org/SysMoBench" target="_blank">GitHub ↗</a>
            </div>
            <div className="stats">
              <div><span className="big"><CountUp to={11} /></span>system artifacts</div>
              <div><span className="big"><CountUp to={9} /></span>automated metrics</div>
              <div><span className="big accent">TLA+</span><span className="sub-dim">Alloy · PAT</span></div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 20 }}>
        <div className="wrap-narrow" style={{ textAlign: "center" }}>
          <Reveal delay={120}>
            <span className="eyebrow">Abstract</span>
            <p style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.75, color: "var(--ink)", marginTop: 16, textWrap: "pretty" }}>
              {SMB_DATA.paper.abstract}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal delay={80}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span className="eyebrow accent">Explore</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="highlight-grid">
              {[
                { route: "leaderboard", eyebrow: "Results", title: "Leaderboard", desc: "The performance and cost of each LLM" },
                { route: "systems", eyebrow: "Benchmark", title: "Systems & Metrics", desc: "Real-world systems evaluated across four automated phases." },
                { route: "cite", eyebrow: "Use it", title: "Contribute", desc: "Contribute to our leaderboard." }
              ].map(c => (
                <div key={c.route} className="highlight-card" onClick={() => go(c.route)}>
                  <span className="eyebrow accent" style={{ marginBottom: 12 }}>{c.eyebrow}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <span className="arrow">Open <span className="ar">→</span></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ============ LEADERBOARD ============
function PageLeaderboard() {
  return (
    <section className="section">
      <div className="wrap">
        <FadeIn>
          <span className="eyebrow accent">Results</span>
          <h1 style={{ fontSize: 44, marginTop: 10 }}>Leaderboard</h1>
          <p className="lead" style={{ maxWidth: 720 }}>
            Overall score is a weighted composite across the four evaluation phases. Click any row to expand the per-task breakdown, filter by organization, or switch the evaluation method.
          </p>
        </FadeIn>
        <div style={{ marginTop: 32 }}>
          <HubLeaderboard />
        </div>
      </div>
    </section>
  );
}

// ============ SYSTEMS + METRICS (phases first, artifacts second) ============
function PageSystems() {
  const [open, setOpen] = useS_p(null);
  const [metric, setMetric] = useS_p("syntax");
  const [rowOpen, setRowOpen] = useS_p(() => new Set());
  const gridRef = useR_p(null);
  const activeMetric = SMB_DATA.metrics.find(m => m.id === metric);

  React.useLayoutEffect(() => {
    const compute = () => {
      if (!open || !gridRef.current) { setRowOpen(new Set()); return; }
      const cards = gridRef.current.querySelectorAll(".task-card");
      let openTop = null;
      cards.forEach(c => { if (c.dataset.id === open) openTop = c.offsetTop; });
      if (openTop == null) { setRowOpen(new Set()); return; }
      const ids = new Set();
      cards.forEach(c => { if (Math.abs(c.offsetTop - openTop) < 2) ids.add(c.dataset.id); });
      setRowOpen(ids);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [open]);

  return (
    <>
      <section className="section-tight" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <FadeIn>
            <span className="eyebrow accent">Benchmark</span>
            <h1 style={{ fontSize: 44, marginTop: 10 }}>Evaluating real-world systems through 4 systematic phases</h1>
            <p className="lead" style={{ maxWidth: 760 }}>
              Each AI-generated model is pushed through four automated phases, from parsing to invariant checking. Tasks come with system code, expert-written invariant templates, and instrumented traces.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <Reveal>
            <h2 style={{ fontSize: 32 }}>System artifacts</h2>
            <p className="lead" style={{ fontSize: 17 }}>Click a card to see its details and source repository.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="task-grid" ref={gridRef} style={{ marginTop: 24 }}>
              {SMB_DATA.tasks.map((t, i) => {
                const isOpen = open === t.id;
                const inRow = rowOpen.has(t.id);
                return (
                  <div
                    key={t.id}
                    data-id={t.id}
                    className={"task-card" + (isOpen ? " open" : "") + (inRow ? " row-open" : "")}
                    onClick={() => setOpen(isOpen ? null : t.id)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                      <h3 style={{ fontSize: 16, margin: 0 }}>{t.name}</h3>
                      <span className="pill">{t.kind}</span>
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-3)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.desc}</div>
                    <div className="kv-wrap">
                      <div className="kv-inner">
                        <div className="kv">
                          <span>Language</span><b>{t.lang}</b>
                          <span>Task id</span><b style={{ color: "var(--accent)" }}>{t.id}</b>
                          {t.github && (
                            <a
                              className="gh"
                              href={t.github}
                              target="_blank"
                              rel="noopener"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span style={{fontSize:13}}>↗</span> View source on GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
      
      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 style={{ fontSize: 32 }}>The four phases</h2>
            <p className="lead" style={{ fontSize: 17 }}>A syntactically valid TLA+ module is just the start. Each phase adds a stricter correctness bar.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mtabs" style={{ marginTop: 24 }}>
              {SMB_DATA.metrics.map((m, i) => (
                <button key={m.id} className={"mtab" + (metric === m.id ? " active" : "")} onClick={() => setMetric(m.id)}>
                  Phase {i + 1} · {m.name}
                </button>
              ))}
            </div>
            <div className="phase-swap" key={"card-" + metric}>
              <div className="card" style={{ borderColor: "var(--line-soft)" }}>
                <span className="eyebrow accent">Phase {SMB_DATA.metrics.indexOf(activeMetric) + 1}</span>
                <h3 style={{ marginTop: 10 }}>{activeMetric.name}</h3>
                <p style={{ margin: 0, fontSize: 16 }}>{activeMetric.blurb}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="phase-swap phase-swap--delayed" key={"banner-" + metric} style={{ marginTop: 24 }}>
              <PhaseBanner phase={SMB_DATA.metrics.indexOf(activeMetric) + 1} />
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

// ============ CITE ============
function PageCite() {
  return (
    <section className="section">
      <div className="wrap-narrow">

        <FadeIn delay={280}>
          <h2 style={{ fontSize: 28 }}>Contribute</h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            Want to see more models on the leaderboard? Email <a className="link" href="mailto:cq@smail.nju.edu.cn">cq@smail.nju.edu.cn</a> or open a pull request on our GitHub repository.
            For instructions on how to add a model, please see the <a className="link" href="https://github.com/specula-org/SysMoBench/blob/main/docs/Usage.md" target="_blank">documentation</a>.
          </p>
          <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)", marginTop: 12 }}>
            We also welcome other contributions — new system artifacts, evaluation metrics, documentation improvements, or bug reports. Feel free to open an issue or reach out to discuss your ideas.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <a className="btn primary" href="https://github.com/specula-org/SysMoBench" target="_blank">Open a PR ↗</a>
            <a className="btn ghost" href="mailto:cq@smail.nju.edu.cn">Email us</a>
          </div>
        </FadeIn>

        <FadeIn>
          <hr className="sep" />
          <h2 style={{ fontSize: 28 }}>Cite</h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            If SysMoBench is useful in your research, please cite the paper.</a>.
          </p>
        </FadeIn>

        <FadeIn delay={160}>
          <div className="card bibbox" style={{ padding: 0, marginTop: 28, overflow: "hidden" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px 8px 14px",
              borderBottom: "1px solid var(--line-soft)",
              background: "var(--paper-2)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              minHeight: 36
            }}>
              <span>bibtex</span>
              <CopyBibBtn />
            </div>
            <pre className="code" style={{ borderRadius: 0, border: "none" }}>{SMB_DATA.bibtex}</pre>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

Object.assign(window, { PageHome, PageLeaderboard, PageSystems, PageCite, Mark, CopyBibBtn, PhaseBanner });
