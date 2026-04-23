// Style A — Clean Academic. Each phase lays itself out naturally; the host
// container sets the width, the phase sets its own height via content.

const A = {
  accent: 'var(--accent)', accentDeep: 'var(--accent-deep)',
  ink: 'var(--ink)', ink2: 'var(--ink-2)', ink3: 'var(--ink-3)', ink4: 'var(--ink-4)',
  line: 'var(--line)', ok: 'var(--ok)', err: 'var(--err)',
};
// One scale, five rungs. Use these instead of raw fontSize numbers so the
// diagrams stay visually consistent. Tweak a value here to retune the whole set.
const FS = {
  caption: 11,   // eyebrows, panel titles, arrow labels, hints, unit prefixes
  body: 12.5,    // default text — code, list items, formulas, inline labels
  icon: 14,      // ✓ / ✕ glyphs and inline arrows
  num: 20,       // section numeric values (Score₁, Score₂, TLC, etc.)
  hero: 28,      // headline numerics (2 / 3, 0.83)
};
function ACode({ title, children, w }) {
  return (
    <div style={{ width: w, background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ padding: '6px 12px', fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, borderBottom: `1px solid ${A.line}`, background: '#f5f7fb' }}>{title}</div>
      <pre style={{ margin: 0, padding: '12px 14px', fontFamily: 'var(--mono)', fontSize: FS.body, lineHeight: 1.55, color: A.ink2, whiteSpace: 'pre' }}>{children}</pre>
    </div>
  );
}
function AClip({ rows, w = 220 }) {
  return (
    <div style={{ width: w, position: 'relative' }}>
      <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 40, height: 7, background: A.ink4, borderRadius: 2 }} />
      <div style={{ background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 4, padding: '10px 12px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontSize: FS.body, color: A.ink2, fontFamily: 'var(--mono)' }}>
            {r.icon === 'ok' && <span style={{ color: A.ok, fontWeight: 700 }}>✓</span>}
            {r.icon === 'err' && <span style={{ color: A.err, fontWeight: 700 }}>✕</span>}
            <span>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function ABrace({ h = 160 }) {
  // Right-facing brace } — tall, with tip on the right pointing at the final metric
  const w = 20;
  const mid = h / 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <path
        d={`M2 2
            Q ${w - 6} 2, ${w - 6} ${mid - 18}
            Q ${w - 6} ${mid - 4}, ${w - 2} ${mid}
            Q ${w - 6} ${mid + 4}, ${w - 6} ${mid + 18}
            Q ${w - 6} ${h - 2}, 2 ${h - 2}`}
        fill="none"
        stroke={A.ink3}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function AArrow({ label, w = 60, dashed = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: w, flexShrink: 0 }}>
      {label && <div style={{ fontSize: FS.caption, color: A.ink3, fontFamily: 'var(--mono)', marginBottom: 4 }}>{label}</div>}
      <svg width={w} height={20} viewBox={`0 0 ${w} 20`}>
        <line x1={2} y1={10} x2={w - 10} y2={10} stroke={A.ink3} strokeWidth={1.5} strokeDasharray={dashed ? "4 3" : undefined} />
        <path d={`M${w - 10} 5 L${w - 3} 10 L${w - 10} 15`} fill="none" stroke={A.ink3} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
function AMetric({ formula, style = {} }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, padding: '8px 14px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: FS.body, ...style }}>
      <span style={{ color: A.accentDeep, fontWeight: 600 }}>Metric</span>
      <span style={{ color: A.ink2 }}>{formula}</span>
    </div>
  );
}
function APanel({ title, color = 'var(--accent-deep)', children, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>{title}</div>
      {children}
    </div>
  );
}

// ── Phase 1 ──  code splits into Path A (full-file parse) + Path B (per-action),
// both converge on the final metric on the right.
function APhase1() {
  const actions = [
    { ok: true, name: 'Timeout(i)' },
    { ok: true, name: 'Election(i)' },
    { ok: false, name: 'Heartbeat(i)' },
  ];
  return (
    <div className="banner">
      <div style={{
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '330px 72px 320px 36px 1fr',
        gridTemplateRows: 'auto 1fr',
        columnGap: 0,
        rowGap: 10,
        alignItems: 'stretch',
        height: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ gridColumn: '1', gridRow: '1 / span 2' }}>
          <ACode title="etcd_raft.tla" w="100%">
{`---- MODULE etcd_raft ----
CONSTANTS Server, Value
VARIABLES state, term

Init ==
 /\\ state = [i \\in Server |-> "Follower"]
 /\\ term  = [i \\in Server |-> 0]

Next == \\E i \\in Server:
 \\/ Timeout(i) \\/ Election(i)
 \\/ Heartbeat(i)`}
          </ACode>
        </div>

        <div style={{ gridColumn: '2', gridRow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AArrow label="parse" w={68} />
        </div>
        <div style={{ gridColumn: '3', gridRow: '1', display: 'flex', alignItems: 'center' }}>
          <APanel title="PATH A · WHOLE-FILE PARSE → Score₁" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ padding: '6px 12px', background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 6, fontFamily: 'var(--mono)', fontSize: FS.body, textAlign: 'center' }}>SANY parser</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ flex: 1, padding: '5px 10px', textAlign: 'center', background: 'rgba(16,185,129,0.1)', color: A.ok, border: `1.5px solid ${A.ok}`, borderRadius: 6, fontFamily: 'var(--mono)', fontSize: FS.body, fontWeight: 700 }}>✓ PASS</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink4 }}>/</span>
                  <span style={{ flex: 1, padding: '5px 10px', textAlign: 'center', background: 'rgba(239,68,68,0.08)', color: A.err, border: `1.5px solid ${A.err}`, borderRadius: 6, fontFamily: 'var(--mono)', fontSize: FS.body, fontWeight: 700 }}>✕ FAIL</span>
                </div>
              </div>
              <div style={{ width: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px 8px', background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 6 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: FS.hero, fontWeight: 700, lineHeight: 1, whiteSpace: 'nowrap' }}>
                  <span style={{ color: A.ok }}>1.0</span>
                  <span style={{ color: A.ink4, fontWeight: 400 }}> / </span>
                  <span style={{ color: A.err }}>0</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, marginTop: 4, textAlign: 'center' }}>Score₁</div>
              </div>
            </div>
          </APanel>
        </div>

        <div style={{ gridColumn: '2', gridRow: '2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AArrow label="extract" w={68} />
        </div>
        <div style={{ gridColumn: '3', gridRow: '2', display: 'flex', alignItems: 'center' }}>
          <APanel title="PATH B · PER-ACTION SYNTAX → Score₂" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {actions.map(a => (
                  <div key={a.name} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 12px',
                    background: a.ok ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)',
                    border: `1.5px solid ${a.ok ? A.ok : A.err}`,
                    borderRadius: 6,
                    fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2,
                  }}>
                    <span style={{ color: a.ok ? A.ok : A.err, fontWeight: 700, fontSize: FS.icon }}>{a.ok ? '✓' : '✕'}</span>
                    <span>{a.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ width: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px 8px', background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 6 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: FS.hero, fontWeight: 700, color: A.accentDeep, lineHeight: 1, textAlign: 'center' }}>0.67</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, marginTop: 4, textAlign: 'center' }}>Score₂ (2/3)</div>
              </div>
            </div>
          </APanel>
        </div>

        <div style={{
          gridColumn: '4', gridRow: '1 / span 2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ABrace h={220} />
        </div>

        <div style={{
          gridColumn: '5', gridRow: '1 / span 2',
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '16px 18px',
          background: 'var(--accent-softer)',
          border: `1px solid var(--accent-soft)`,
          borderRadius: 8,
          alignSelf: 'stretch',
          justifyContent: 'center',
          marginLeft: 6,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 600, color: A.ink2, lineHeight: 1.4 }}>
            w₁·Score₁ + w₂·Score₂
          </div>
          <div style={{ height: 1, background: 'var(--accent-soft)' }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, lineHeight: 1.4 }}>
            e.g. w₁ = w₂ = ½
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2 }}>
            ½·1.0 + ½·0.67
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>=</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 700, color: A.accentDeep, lineHeight: 1 }}>0.83</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phase 2 ──  parsed code → TLC model checker → single actions panel (✓/✕ mixed) → brace → metric
function APhase2() {
  const actions = [
    { s: 'ok',   name: 'Timeout(i)' },
    { s: 'ok',   name: 'Election(i)' },
    { s: 'ok',   name: 'AppendLog(i)' },
    { s: 'warn', name: 'Heartbeat(i)' },
    { s: 'err',  name: 'CommitIdx(i)' },
  ];
  const cfg = {
    ok:   { color: A.ok,      bg: 'rgba(16,185,129,0.08)', glyph: '✓', label: 'covered' },
    warn: { color: 'var(--warn)', bg: 'rgba(245,158,11,0.10)', glyph: '!', label: 'covered · error' },
    err:  { color: A.err,     bg: 'rgba(239,68,68,0.06)',  glyph: '✕', label: 'uncovered' },
  };
  return (
    <div className="banner">
      <div style={{
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '260px 56px 150px 48px 260px 36px 1fr',
        gridTemplateRows: '1fr',
        columnGap: 0,
        alignItems: 'stretch',
        height: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ gridColumn: '1', gridRow: '1', alignSelf: 'center' }}>
          <ACode title="parsed.tla (no syntax errors)" w="100%">
{`Next == \\E i \\in Server:
 \\/ Timeout(i) \\/ Election(i)
 \\/ Heartbeat(i)

Timeout(i) ==
 /\\ state[i] = "Follower"
 /\\ state' = [state EXCEPT
      ![i] = "Candidate"]`}
          </ACode>
        </div>

        <div style={{ gridColumn: '2', gridRow: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="feed" w={52} />
        </div>

        <div style={{
          gridColumn: '3', gridRow: '1',
          padding: '10px 10px',
          background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 6,
          textAlign: 'center',
          alignSelf: 'center',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>Model Checker</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: FS.num, fontWeight: 600, marginTop: 2 }}>TLC</div>
          <svg width={120} height={64} viewBox="0 0 180 96" style={{ marginTop: 6 }}>
            {[[18, 22], [60, 12], [110, 30], [155, 24], [36, 58], [88, 62], [140, 64], [165, 68], [70, 86], [120, 86]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={4.5} fill="var(--accent)" opacity={0.85} />
            ))}
            <path d="M18 22 L60 12 L110 30 L155 24 M60 12 L36 58 L88 62 L140 64 L110 30 M88 62 L70 86 L120 86 L140 64 M140 64 L165 68" fill="none" stroke={A.ink3} strokeWidth={1} opacity={0.55} />
          </svg>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, marginTop: 4 }}>state space</div>
        </div>

        <div style={{ gridColumn: '4', gridRow: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="check" w={48} />
        </div>

        <div style={{ gridColumn: '5', gridRow: '1', alignSelf: 'center' }}>
          <APanel title="ACTIONS · COVERAGE RESULT">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {actions.map(a => {
                const c = cfg[a.s];
                return (
                  <div key={a.name} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '5px 12px',
                    background: c.bg,
                    border: `1.5px solid ${c.color}`,
                    borderRadius: 6,
                    fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2,
                  }}>
                    <span style={{ color: c.color, fontWeight: 700, fontSize: FS.icon }}>{c.glyph}</span>
                    <span>{a.name}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: FS.caption, color: c.color, opacity: 0.85 }}>{c.label}</span>
                  </div>
                );
              })}
            </div>
          </APanel>
        </div>

        <div style={{ gridColumn: '6', gridRow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ABrace h={240} />
        </div>

        <div style={{
          gridColumn: '7', gridRow: '1',
          display: 'flex', flexDirection: 'column', gap: 8,
          padding: '14px 16px',
          background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 8,
          alignSelf: 'stretch', justifyContent: 'center',
          marginLeft: 6,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: A.ink2, lineHeight: 1.3, textAlign: 'center' }}>
            |Covered ∖ Error|<br />
            <span style={{ display: 'inline-block', borderTop: `1.5px solid ${A.ink2}`, padding: '2px 30px', marginTop: 2 }}>|All actions|</span>
          </div>
          <div style={{ height: 1, background: 'var(--accent-soft)' }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>example</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, textAlign: 'center' }}>
            3 / 5
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>=</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 700, color: A.accentDeep, lineHeight: 1 }}>0.60</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phase 3 ──  system + model → harness trace mapping → linux/windows validation → brace → metric
function APhase3() {
  return (
    <div className="banner">
      <div style={{
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '220px 56px 1fr 30px 160px',
        gridTemplateRows: 'auto auto',
        rowGap: 10,
        columnGap: 0,
        alignItems: 'stretch',
        height: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ gridColumn: '1', gridRow: '1' }}>
          <APanel title="SYSTEM (INSTRUMENTED)">
            <div style={{ background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, padding: '8px 10px' }}>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, lineHeight: 1.5, whiteSpace: 'pre' }}>
{`func (r *raft) tick() {
 // @trace role=Foll.
 r.electionTick++
}`}
              </pre>
            </div>
          </APanel>
        </div>
        <div style={{ gridColumn: '1', gridRow: '2' }}>
          <APanel title="MODEL (NO RUNTIME ERR)">
            <div style={{ background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, padding: '8px 10px' }}>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, lineHeight: 1.5, whiteSpace: 'pre' }}>
{`Timeout(i)   == ...
Election(i)  == ...
Heartbeat(i) == ...`}
              </pre>
            </div>
          </APanel>
        </div>

        <div style={{ gridColumn: '2', gridRow: '1 / span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="trace" w={52} />
        </div>

        <div style={{ gridColumn: '3', gridRow: '1 / span 2', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <APanel title="HARNESS · TRACE MAPPING">
            <div style={{ padding: '8px 12px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', rowGap: 3, columnGap: 10, alignItems: 'center', justifyContent: 'center' }}>
                {[
                  ['role = "Follower"', 'state[i] = "Follower"'],
                  ['role = "Candidate"', 'state[i] = "Candidate"'],
                  ['tick++', 'Timeout(i)'],
                ].map(([l, r], i) => (
                  <React.Fragment key={i}>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, textAlign: 'right', whiteSpace: 'nowrap' }}>{l}</code>
                    <span style={{ color: A.accentDeep, fontSize: FS.icon }}>→</span>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, whiteSpace: 'nowrap' }}>{r}</code>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </APanel>
          <div style={{ padding: '10px 12px', background: '#fff', border: `1px solid ${A.line}`, borderRadius: 6 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Trace Conformance · Code vs Spec</div>
            <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 24px 1fr 28px', rowGap: 6, columnGap: 10, alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink4 }}></div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, fontWeight: 600 }}>CODE TRACE</div>
              <div></div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, fontWeight: 600 }}>SPEC TRACE</div>
              <div></div>

              {[
                ['t=0', 'role = Follower',   'state[i] = Follower',   true],
                ['t=1', 'tick++',            'Timeout(i)',            true],
                ['t=2', 'Heartbeat',         '— (no match)',          false],
              ].map(([t, code, spec, ok], i) => {
                const color = ok ? A.ok : A.err;
                const bg = ok ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.07)';
                return (
                  <React.Fragment key={i}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink4 }}>{t}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: ok ? A.ink2 : A.err, padding: '4px 8px', background: bg, border: `1px solid ${color}`, borderRadius: 4, whiteSpace: 'nowrap' }}>{code}</div>
                    <div style={{ textAlign: 'center', color: color, fontSize: FS.icon, fontFamily: 'var(--mono)' }}>{ok ? '≡' : '≠'}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: ok ? A.ink2 : A.err, padding: '4px 8px', background: bg, border: `1px solid ${color}`, borderRadius: 4, whiteSpace: 'nowrap' }}>{spec}</div>
                    <div style={{ width: 22, height: 22, borderRadius: 11, background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ok ? '✓' : '✕'}</div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ gridColumn: '4', gridRow: '1 / span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ABrace h={240} />
        </div>

        <div style={{
          gridColumn: '5', gridRow: '1 / span 2',
          display: 'flex', flexDirection: 'column', gap: 8,
          padding: '14px 16px',
          background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 8,
          alignSelf: 'stretch', justifyContent: 'center',
          marginLeft: 6,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: A.ink2, lineHeight: 1.3, textAlign: 'center', whiteSpace: 'nowrap' }}>
            |Conformed|<br />
            <span style={{ display: 'inline-block', borderTop: `1.5px solid ${A.ink2}`, padding: '2px 10px', marginTop: 2 }}>|code actions|</span>
          </div>
          <div style={{ height: 1, background: 'var(--accent-soft)' }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>example</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, textAlign: 'center' }}>
            2 / 3
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>=</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 700, color: A.accentDeep, lineHeight: 1 }}>0.67</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phase 4 ──  yaml template → concretize → invariants → TLC check → results → metric
function APhase4() {
  return (
    <div className="banner">
      <div style={{
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '210px 90px 210px 90px 210px 30px 180px',
        gridTemplateRows: '1fr',
        alignItems: 'stretch',
        columnGap: 0,
        height: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ gridColumn: '1', alignSelf: 'center' }}>
          <ACode title="invariant_template.yaml" w="100%">
{`name: Inv1_LogCons
tla_example: |
  Inv1 ==
    \\A i, j \\in Server :
     log[i] = log[j]`}
          </ACode>
        </div>

        <div style={{ gridColumn: '2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="concretize" w={84} dashed />
        </div>

        <div style={{ gridColumn: '3', display: 'flex', flexDirection: 'column', gap: 6, alignSelf: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>Concretized Invariants</div>
          {[
            ['Inv1', 'log consistency'],
            ['Inv2', 'leader completeness'],
            ['Inv3', 'election safety'],
          ].map(([id, desc]) => (
            <div key={id} style={{ padding: '7px 10px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 6, fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, textAlign: 'center', whiteSpace: 'nowrap' }}>
              <span style={{ color: A.accentDeep, fontWeight: 700 }}>{id}</span>
              <span style={{ color: A.ink4, margin: '0 6px' }}>·</span>
              {desc}
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '4', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="TLC check" w={84} />
        </div>

        <div style={{ gridColumn: '5', display: 'flex', flexDirection: 'column', gap: 6, alignSelf: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>Results</div>
          {[['Inv1', true], ['Inv2', true], ['Inv3', false]].map(([id, ok]) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px', border: `1.5px solid ${ok ? A.ok : A.err}`, borderRadius: 6, background: ok ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.04)' }}>
              <div style={{ width: 18, height: 18, borderRadius: 9, background: ok ? A.ok : A.err, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{ok ? '✓' : '✕'}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, fontWeight: 600 }}>{id}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3, marginLeft: 'auto' }}>{ok ? 'verified' : 'violated'}</div>
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ABrace h={220} />
        </div>

        <div style={{
          gridColumn: '7',
          display: 'flex', flexDirection: 'column', gap: 8,
          padding: '14px 16px',
          background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 8,
          alignSelf: 'stretch', justifyContent: 'center',
          marginLeft: 6,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 600, color: A.ink2, lineHeight: 1.3, textAlign: 'center', whiteSpace: 'nowrap' }}>
            |Verified|<br />
            <span style={{ display: 'inline-block', borderTop: `1.5px solid ${A.ink2}`, padding: '2px 10px', marginTop: 2 }}>|All invariants|</span>
          </div>
          <div style={{ height: 1, background: 'var(--accent-soft)' }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>example</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: FS.body, color: A.ink2, textAlign: 'center' }}>
            2 / 3
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: FS.caption, color: A.ink3 }}>=</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 700, color: A.accentDeep, lineHeight: 1 }}>0.67</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { APhase1, APhase2, APhase3, APhase4 });
