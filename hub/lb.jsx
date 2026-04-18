/* global React, SMB_DATA, useReveal, AnimBar */
const { useState: useS_lb, useMemo: useM_lb } = React;

function OrgDot({ org, logo }) {
  const [failed, setFailed] = useS_lb(false);
  const map = { OpenAI: "openai", Anthropic: "anthropic", Google: "google", DeepSeek: "deepseek", Meta: "meta", Alibaba: "alibaba", xAI: "xai", MiniMax: "minimax", Moonshot: "moonshot", Zhipu: "zhipu" };
  const cls = map[org] || "";
  const letter = (org || "?").slice(0, 1);
  if (logo && !failed) {
    return (
      <span className={"logo-dot has-img"}>
        <img src={logo} alt={org} onError={() => setFailed(true)} />
      </span>
    );
  }
  return <span className={"logo-dot " + cls}>{letter}</span>;
}

function HubLeaderboard({ showFilters = true }) {
  const [sort, setSort] = useS_lb({ key: "score", dir: "desc" });
  const [expanded, setExpanded] = useS_lb(null);
  const [orgFilter, setOrgFilter] = useS_lb("All");
  const [method, setMethod] = useS_lb("direct_call");

  const orgs = ["All", ...new Set(SMB_DATA.models.filter(m => !m.placeholder).map(m => m.org))];

  const getVal = (m, key) => key.startsWith("metric:") ? (m.perMetric?.[key.slice(7)] ?? null) : m[key];

  const rows = useM_lb(() => {
    let arr = SMB_DATA.models.filter(m => orgFilter === "All" || m.org === orgFilter || m.placeholder);
    arr = [...arr];
    arr.sort((a, b) => {
      if (a.placeholder) return 1;
      if (b.placeholder) return -1;
      const va = getVal(a, sort.key), vb = getVal(b, sort.key);
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "string") return sort.dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sort.dir === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [sort, orgFilter]);

  const onSort = (key) => setSort(s => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));
  const arrow = (k) => (sort.key !== k ? "↕" : sort.dir === "desc" ? "↓" : "↑");
  const scoredModels = SMB_DATA.models.filter(m => m.score != null);
  const maxScore = Math.max(...scoredModels.map(m => m.score));

  return (
    <div>
      {showFilters && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <span className="eyebrow">Filter</span>
          {orgs.map(o => (
            <button
              key={o}
              className={"pill" + (orgFilter === o ? " solid" : "")}
              onClick={() => setOrgFilter(o)}
              style={{ cursor: "pointer", border: orgFilter === o ? undefined : "1px solid var(--line)" }}
            >
              {o}
            </button>
          ))}
          <div className="method-select-wrap">
            <select className="method-select" value={method} onChange={e => setMethod(e.target.value)}>
              <option value="direct_call">direct_call</option>
              <option value="agent" disabled>agent (coming soon)</option>
            </select>
          </div>
        </div>
      )}
      <div className="lb-wrap">
        <table className="lb">
          <thead>
            <tr>
              <th className="rank">#</th>
              <th className={sort.key === "name" ? "sorted" : ""} onClick={() => onSort("name")}>Model <span className="sort">{arrow("name")}</span></th>
              {SMB_DATA.metrics.map((mt, mi) => {
                const k = "metric:" + mt.id;
                const label = mt.name.replace(/ Correctness$/, "");
                return (
                  <th
                    key={mt.id}
                    className={sort.key === k ? "sorted" : ""}
                    onClick={() => onSort(k)}
                    style={{ textAlign: "right" }}
                    title={`Phase ${mi + 1} · ${mt.name}`}
                  >
                    {label} <span className="sort">{arrow(k)}</span>
                  </th>
                );
              })}
              <th className={sort.key === "score" ? "sorted" : ""} onClick={() => onSort("score")} style={{ textAlign: "right" }}>Score <span className="sort">{arrow("score")}</span></th>
              <th style={{ width: 32 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m, i) => {
              const isOpen = expanded === m.id;
              return (
                <React.Fragment key={m.id}>
                  <tr
                    className={isOpen ? "expanded" : ""}
                    onClick={() => !m.placeholder && setExpanded(isOpen ? null : m.id)}
                    style={m.placeholder ? { opacity: 0.55, cursor: "default" } : {}}
                  >
                    <td className="rank">{m.placeholder || m.score == null ? "—" : i + 1}</td>
                    <td><div className="modelname"><OrgDot org={m.org} logo={m.logo} />{m.name}</div></td>
                    {SMB_DATA.metrics.map(mt => {
                      const v = m.perMetric?.[mt.id];
                      return (
                        <td key={mt.id} style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 13 }}>
                          {v == null
                            ? <span style={{ color: "var(--ink-3)", fontSize: 12 }}>TODO</span>
                            : v.toFixed(1)}
                        </td>
                      );
                    })}
                    <td style={{ textAlign: "right" }}>
                      {m.score == null ? <span style={{ color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 12 }}>TODO</span> : (
                        <span className="scorecell">
                          <span className="bar"><AnimBar pct={(m.score / maxScore) * 100} /></span>
                          <span className="score-num">{m.score.toFixed(1)}</span>
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 14, transition: "transform 260ms", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>{m.placeholder ? "" : "▾"}</td>
                  </tr>
                  {!m.placeholder && (
                    <tr className="expand-row">
                      <td colSpan={8}>
                        <div className={"expand-body" + (isOpen ? " on" : "")}>
                          <div className="inner">
                            <div className="pad">
                              <div className="eyebrow" style={{ marginBottom: 14 }}>
                                Per-task breakdown — {m.name}
                              </div>
                              <div className="taskbars">
                                {SMB_DATA.tasks.map((t, ti) => {
                                  const v = m.perTask[t.id] ?? 0;
                                  return (
                                    <div className="taskbar" key={t.id}>
                                      <span className="tname">{t.id}</span>
                                      {isOpen ? <AnimBar pct={v} delay={ti * 40} height={8} /> : <span style={{display:"inline-block",width:"100%",height:8}} />}
                                      <span className="val">{v.toFixed(1)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { HubLeaderboard, OrgDot });
