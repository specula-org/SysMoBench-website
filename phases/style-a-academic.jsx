// Style A — Clean Academic. Each phase lays itself out naturally; the host
// container sets the width, the phase sets its own height via content.

const A = {
  accent: 'var(--accent)', accentDeep: 'var(--accent-deep)',
  ink: 'var(--ink)', ink2: 'var(--ink-2)', ink3: 'var(--ink-3)', ink4: 'var(--ink-4)',
  line: 'var(--line)', ok: 'var(--ok)', err: 'var(--err)',
};
function ACode({ title, children, w }) {
  return (
    <div style={{ width: w, background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ padding: '6px 12px', fontFamily: 'var(--mono)', fontSize: 11, color: A.ink3, borderBottom: `1px solid ${A.line}`, background: '#f5f7fb' }}>{title}</div>
      <pre style={{ margin: 0, padding: '12px 14px', fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.55, color: A.ink2, whiteSpace: 'pre' }}>{children}</pre>
    </div>
  );
}
function AClip({ rows, w = 220 }) {
  return (
    <div style={{ width: w, position: 'relative' }}>
      <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 40, height: 7, background: A.ink4, borderRadius: 2 }} />
      <div style={{ background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 4, padding: '10px 12px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontSize: 12.5, color: A.ink2, fontFamily: 'var(--mono)' }}>
            {r.icon === 'ok' && <span style={{ color: A.ok, fontWeight: 700 }}>✓</span>}
            {r.icon === 'err' && <span style={{ color: A.err, fontWeight: 700 }}>✕</span>}
            <span>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function AArrow({ label, w = 60, dashed = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: w, flexShrink: 0 }}>
      {label && <div style={{ fontSize: 11, color: A.ink3, fontFamily: 'var(--mono)', marginBottom: 4 }}>{label}</div>}
      <svg width={w} height={20} viewBox={`0 0 ${w} 20`}>
        <line x1={2} y1={10} x2={w - 10} y2={10} stroke={A.ink3} strokeWidth={1.5} strokeDasharray={dashed ? "4 3" : undefined} />
        <path d={`M${w - 10} 5 L${w - 3} 10 L${w - 10} 15`} fill="none" stroke={A.ink3} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
function AMetric({ formula, style = {} }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, padding: '8px 14px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12.5, ...style }}>
      <span style={{ color: A.accentDeep, fontWeight: 600 }}>Metric</span>
      <span style={{ color: A.ink2 }}>{formula}</span>
    </div>
  );
}
function APanel({ title, color = 'var(--accent-deep)', children, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>{title}</div>
      {children}
    </div>
  );
}

// ── Phase 1 ──  code splits into Path A (full-file parse) + Path B (per-action),
// both converge on the final metric on the right.
function APhase1() {
  return (
    <div className="banner">
      <div style={{
        padding: '28px 32px',
        display: 'grid',
        gridTemplateColumns: '340px 56px 1fr 56px 240px',
        gridTemplateRows: 'auto auto',
        columnGap: 0,
        rowGap: 18,
        alignItems: 'center',
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

        <div style={{ gridColumn: '2', gridRow: '1', display: 'flex', justifyContent: 'center' }}>
          <AArrow label="parse" w={52} />
        </div>
        <div style={{ gridColumn: '3', gridRow: '1' }}>
          <APanel title="PATH A · FULL-FILE PARSE → Score₁">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6 }}>
              <div style={{ padding: '8px 14px', background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12.5 }}>SANY parser</div>
              <AArrow w={32} />
              <span style={{ padding: '7px 16px', background: 'rgba(16,185,129,0.1)', color: A.ok, border: `1px solid ${A.ok}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600 }}>PASS</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: A.ink3 }}>or</span>
              <span style={{ padding: '7px 16px', background: 'rgba(239,68,68,0.08)', color: A.err, border: `1px solid ${A.err}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600 }}>FAIL</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: A.ink3 }}>whole file</span>
            </div>
          </APanel>
        </div>
        <div style={{ gridColumn: '4', gridRow: '1', display: 'flex', justifyContent: 'center' }}>
          <AArrow w={52} />
        </div>

        <div style={{ gridColumn: '2', gridRow: '2', display: 'flex', justifyContent: 'center' }}>
          <AArrow label="extract" w={52} />
        </div>
        <div style={{ gridColumn: '3', gridRow: '2' }}>
          <APanel title="PATH B · PER-ACTION SYNTAX → Score₂">
            <div style={{ padding: '14px 16px', background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              {[['ok', 'Timeout(i)'], ['ok', 'Election(i)'], ['err', 'Heartbeat(i)']].map(([k, name]) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2 }}>
                  {k === 'ok'
                    ? <span style={{ color: A.ok, fontWeight: 700, fontSize: 14 }}>✓</span>
                    : <span style={{ color: A.err, fontWeight: 700, fontSize: 14 }}>✕</span>}
                  <span>{name}</span>
                </div>
              ))}
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: A.ink3 }}>2 / 3 actions</span>
            </div>
          </APanel>
        </div>
        <div style={{ gridColumn: '4', gridRow: '2', display: 'flex', justifyContent: 'center' }}>
          <AArrow w={52} />
        </div>

        <div style={{
          gridColumn: '5', gridRow: '1 / span 2',
          display: 'flex', flexDirection: 'column', gap: 12,
          padding: '22px 22px',
          background: 'var(--accent-softer)',
          border: `1px solid var(--accent-soft)`,
          borderRadius: 8,
          alignSelf: 'stretch',
          justifyContent: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, color: A.ink2, lineHeight: 1.35 }}>
            0.5 · Score₁<br />+ 0.5 · Score₂
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phase 2 ──  parsed code → TLC model checker → covered / error → metric
function APhase2() {
  return (
    <div className="banner">
      <div style={{
        padding: '28px 32px',
        display: 'grid',
        gridTemplateColumns: '300px 52px 220px 52px 1fr 210px',
        gridTemplateRows: 'auto auto',
        rowGap: 18,
        alignItems: 'center',
      }}>
        <div style={{ gridColumn: '1', gridRow: '1 / span 2' }}>
          <ACode title="parsed.tla (no syntax errors)" w="100%">
{`Next == \\E i \\in Server:
 \\/ Timeout(i) \\/ Election(i)
 \\/ Heartbeat(i)

Timeout(i) ==
 /\\ state[i] = "Follower"
 /\\ state' = [state EXCEPT
      ![i] = "Candidate"]
 /\\ UNCHANGED term`}
          </ACode>
        </div>

        <div style={{ gridColumn: '2', gridRow: '1 / span 2', display: 'flex', justifyContent: 'center' }}>
          <AArrow label="feed" w={52} />
        </div>

        <div style={{
          gridColumn: '3', gridRow: '1 / span 2',
          padding: '18px 16px',
          background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 6,
          textAlign: 'center',
          alignSelf: 'stretch',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>Model Checker</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, marginTop: 4 }}>TLC</div>
          <svg width={180} height={96} viewBox="0 0 180 96" style={{ marginTop: 10, display: 'block', margin: '10px auto 0' }}>
            {[[18, 22], [60, 12], [110, 30], [155, 24], [36, 58], [88, 62], [140, 64], [165, 68], [70, 86], [120, 86]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={4.5} fill="var(--accent)" opacity={0.85} />
            ))}
            <path d="M18 22 L60 12 L110 30 L155 24 M60 12 L36 58 L88 62 L140 64 L110 30 M88 62 L70 86 L120 86 L140 64 M140 64 L165 68" fill="none" stroke={A.ink3} strokeWidth={1} opacity={0.55} />
          </svg>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: A.ink3, marginTop: 8 }}>state space exploration</div>
        </div>

        <div style={{ gridColumn: '4', gridRow: '1', display: 'flex', justifyContent: 'center' }}>
          <AArrow label="covered" w={52} />
        </div>
        <div style={{ gridColumn: '5', gridRow: '1' }}>
          <APanel title="COVERED SET" color={A.ok}>
            <div style={{ border: `1.5px solid ${A.ok}`, borderRadius: 6, padding: '12px 16px', background: 'rgba(16,185,129,0.05)', display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
              {['Timeout(i)', 'Election(i)', 'Heartbeat(i)'].map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2 }}>
                  <span style={{ color: A.ok, fontWeight: 700, fontSize: 14 }}>✓</span>{a}
                </div>
              ))}
            </div>
          </APanel>
        </div>

        <div style={{ gridColumn: '4', gridRow: '2', display: 'flex', justifyContent: 'center' }}>
          <AArrow label="errors" w={52} />
        </div>
        <div style={{ gridColumn: '5', gridRow: '2' }}>
          <APanel title="ERROR SET" color={A.err}>
            <div style={{ border: `1.5px solid ${A.err}`, borderRadius: 6, padding: '12px 16px', background: 'rgba(239,68,68,0.04)', display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
              {['Election(i)', 'Heartbeat(i)'].map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2 }}>
                  <span style={{ color: A.err, fontWeight: 700, fontSize: 14 }}>✕</span>{a}
                </div>
              ))}
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: A.ink4 }}>deadlock / inv. viol.</span>
            </div>
          </APanel>
        </div>

        <div style={{
          gridColumn: '6', gridRow: '1 / span 2',
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '22px 20px',
          background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 8,
          alignSelf: 'stretch', justifyContent: 'center', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: A.ink2, lineHeight: 1.55 }}>
            |Covered ∖ Error|<br />──────────<br />|All actions|
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phase 3 ──  system + model → harness trace mapping → validation (linux/win) → conformed/error → metric
function APhase3() {
  return (
    <div className="banner">
      <div style={{
        padding: '28px 28px',
        display: 'grid',
        gridTemplateColumns: '260px 48px 1fr 48px 240px 180px',
        gridTemplateRows: 'auto auto',
        rowGap: 14,
        columnGap: 0,
        alignItems: 'stretch',
      }}>
        <div style={{ gridColumn: '1', gridRow: '1' }}>
          <APanel title="SYSTEM (INSTRUMENTED)">
            <div style={{ background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, padding: '12px 14px' }}>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12, color: A.ink2, lineHeight: 1.55, whiteSpace: 'pre' }}>
{`func (r *raft) tick() {
 // @trace role=Follower
 r.electionTick++
 if r.promotable() { ... }
}`}
              </pre>
            </div>
          </APanel>
        </div>
        <div style={{ gridColumn: '1', gridRow: '2' }}>
          <APanel title="MODEL (NO RUNTIME ERRORS)">
            <div style={{ background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 6, padding: '12px 14px' }}>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12, color: A.ink2, lineHeight: 1.55, whiteSpace: 'pre' }}>
{`Timeout(i)   == ...
Election(i)  == ...
Heartbeat(i) == ...`}
              </pre>
            </div>
          </APanel>
        </div>

        <div style={{ gridColumn: '2', gridRow: '1 / span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="trace" w={48} />
        </div>

        <div style={{ gridColumn: '3', gridRow: '1 / span 2', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <APanel title="HARNESS · TRACE MAPPING">
            <div style={{ padding: '14px 18px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 6 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', rowGap: 5, columnGap: 12, alignItems: 'center' }}>
                {[
                  ['role = "Follower"', 'state[i] = "Follower"'],
                  ['role = "Candidate"', 'state[i] = "Candidate"'],
                  ['tick++', 'Timeout(i)'],
                ].map(([l, r], i) => (
                  <React.Fragment key={i}>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: 12, color: A.ink2, textAlign: 'right' }}>{l}</code>
                    <span style={{ color: A.accentDeep, fontSize: 14 }}>→</span>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: 12, color: A.ink2 }}>{r}</code>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </APanel>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, padding: '12px 14px', background: '#fff', border: `1px solid ${A.line}`, borderRadius: 6 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Linux · Validation</div>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12, color: A.ink2, lineHeight: 1.6 }}>
{`[t=0] role=Follower  ✓
[t=1] tick++         ✓
[t=2] role=Cand.     ✓
[t=3] Heartbeat      ✕`}
              </pre>
            </div>
            <div style={{ flex: 1, padding: '12px 14px', background: '#fff', border: `1px solid ${A.line}`, borderRadius: 6, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -9, right: 12, padding: '2px 7px', background: 'var(--accent)', color: '#fff', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: 0.4, borderRadius: 3, fontWeight: 700 }}>NEW</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Windows · Validation</div>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12, color: A.ink2, lineHeight: 1.6 }}>
{`ETW events → trace
[t=0] role=Follower  ✓
[t=1] tick++         ✓
[t=2] role=Cand.     ✓`}
              </pre>
            </div>
          </div>
        </div>

        <div style={{ gridColumn: '4', gridRow: '1 / span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="check" w={48} />
        </div>

        <div style={{ gridColumn: '5', gridRow: '1' }}>
          <APanel title="CONFORMED SET" color={A.ok}>
            <div style={{ border: `1.5px solid ${A.ok}`, borderRadius: 6, padding: '12px 14px', background: 'rgba(16,185,129,0.05)' }}>
              {['Timeout(i)', 'Election(i)'].map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2 }}>
                  <span style={{ color: A.ok, fontWeight: 700, fontSize: 14 }}>✓</span>{a}
                </div>
              ))}
            </div>
          </APanel>
        </div>
        <div style={{ gridColumn: '5', gridRow: '2' }}>
          <APanel title="ERROR SET" color={A.err}>
            <div style={{ border: `1.5px solid ${A.err}`, borderRadius: 6, padding: '12px 14px', background: 'rgba(239,68,68,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2 }}>
                <span style={{ color: A.err, fontWeight: 700, fontSize: 14 }}>✕</span>Heartbeat(i)
              </div>
            </div>
          </APanel>
        </div>

        <div style={{
          gridColumn: '6', gridRow: '1 / span 2',
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '22px 18px',
          background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 8,
          alignSelf: 'stretch', justifyContent: 'center', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2, lineHeight: 1.55 }}>
            |Conf ∖ Err|<br />──────────<br />|code actions|
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
        padding: '28px 32px',
        display: 'grid',
        gridTemplateColumns: '340px 72px 1fr 72px 1fr 200px',
        alignItems: 'stretch',
        columnGap: 0,
      }}>
        <div style={{ alignSelf: 'center' }}>
          <ACode title="invariant_template.yaml" w="100%">
{`name: Inv1_LogConsistency
tla_example: |
  Inv1_LogConsistency ==
    \\A i, j \\in Server :
      \\A k \\in 1..minCommit :
        log[i][k] = log[j][k]`}
          </ACode>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="concretize" w={72} dashed />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignSelf: 'stretch', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>Concretized Invariants</div>
          {[
            ['Inv1', 'log consistency'],
            ['Inv2', 'leader completeness'],
            ['Inv3', 'election safety'],
          ].map(([id, desc]) => (
            <div key={id} style={{ padding: '10px 14px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 6, fontFamily: 'var(--mono)', fontSize: 12.5, color: A.ink2 }}>
              <span style={{ color: A.accentDeep, fontWeight: 700 }}>{id}</span>&nbsp;&nbsp;{desc}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AArrow label="TLC check" w={72} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignSelf: 'stretch', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: A.ink3, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' }}>Results</div>
          {[['Inv1', true], ['Inv2', true], ['Inv3', false]].map(([id, ok]) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: `1.5px solid ${ok ? A.ok : A.err}`, borderRadius: 6, background: ok ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.04)' }}>
              <div style={{ width: 24, height: 24, borderRadius: 12, background: ok ? A.ok : A.err, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{ok ? '✓' : '✕'}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600 }}>{id}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: A.ink3, marginLeft: 'auto' }}>{ok ? 'verified' : 'violated'}</div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '22px 20px',
          background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 8,
          alignSelf: 'center', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.8 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: A.ink2, lineHeight: 1.55 }}>
            |Verified|<br />──────────<br />|All invariants|
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { APhase1, APhase2, APhase3, APhase4 });
