// Style A — Clean Academic (compact, uniform 360px, wide spread)

const A = {
  accent: 'var(--accent)', accentDeep: 'var(--accent-deep)',
  ink: 'var(--ink)', ink2: 'var(--ink-2)', ink3: 'var(--ink-3)', ink4: 'var(--ink-4)',
  line: 'var(--line)', ok: 'var(--ok)', err: 'var(--err)',
};
const BODY_H = 308;

function ACode({ title, children, w }) {
  return (
    <div style={{ width: w, background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: 10, color: A.ink3, borderBottom: `1px solid ${A.line}`, background: '#f5f7fb' }}>{title}</div>
      <pre style={{ margin: 0, padding: '8px 10px', fontFamily: 'var(--mono)', fontSize: 10.5, lineHeight: 1.45, color: A.ink2, whiteSpace: 'pre' }}>{children}</pre>
    </div>
  );
}
function AClip({ rows, w = 220 }) {
  return (
    <div style={{ width: w, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 40, height: 7, background: A.ink4, borderRadius: 2 }} />
      <div style={{ background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 4, padding: '8px 10px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontSize: 12, color: A.ink2, fontFamily: 'var(--mono)' }}>
            {r.icon === 'ok' && <span style={{ color: A.ok }}>✓</span>}
            {r.icon === 'err' && <span style={{ color: A.err }}>✕</span>}
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
      {label && <div style={{ fontSize: 10, color: A.ink3, fontFamily: 'var(--mono)', marginBottom: 3 }}>{label}</div>}
      <svg width={w} height={18} viewBox={`0 0 ${w} 18`}>
        <line x1={2} y1={9} x2={w - 10} y2={9} stroke={A.ink3} strokeWidth={1.5} strokeDasharray={dashed ? "4 3" : undefined} />
        <path d={`M${w - 10} 4 L${w - 3} 9 L${w - 10} 14`} fill="none" stroke={A.ink3} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
function AMetric({ formula, style = {} }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, padding: '6px 12px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 11, ...style }}>
      <span style={{ color: A.accentDeep, fontWeight: 600 }}>Metric</span>
      <span style={{ color: A.ink2 }}>{formula}</span>
    </div>
  );
}
function APanel({ title, color = 'var(--accent-deep)', children, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color, letterSpacing: 0.6, fontWeight: 600 }}>{title}</div>
      {children}
    </div>
  );
}

// ── Phase 1 ──  layout: code │ path-a │ path-b │ metric
function APhase1() {
  return (
    <div className="banner">
      <div style={{ padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 18, height: BODY_H, boxSizing: 'border-box' }}>
        <ACode title="etcd_raft.tla" w={280}>
{`---- MODULE etcd_raft ----
CONSTANTS Server, Value
VARIABLES state, term

Init ==
 /\\ state = [i \\in Server |-> "Follower"]
 /\\ term  = [i \\in Server |-> 0]

Next == \\E i \\in Server:
 \\/ Timeout(i)  \\/ Election(i)
 \\/ Heartbeat(i)`}
        </ACode>
        <AArrow label="submit" w={54} />

        <APanel title="PATH A · FULL-MODEL SYNTAX → Score₁" style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#fbfcfe', border: `1px solid ${A.line}`, borderRadius: 4 }}>
            <div style={{ padding: '6px 10px', background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 11 }}>SANY parser</div>
            <AArrow w={32} />
            <span style={{ padding: '5px 12px', background: 'rgba(16,185,129,0.1)', color: A.ok, border: `1px solid ${A.ok}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600 }}>PASS</span>
            <span style={{ padding: '5px 12px', background: 'rgba(239,68,68,0.08)', color: A.err, border: `1px solid ${A.err}`, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600 }}>FAIL</span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: A.ink3 }}>whole-file parse result</div>
        </APanel>

        <APanel title="PATH B · PER-ACTION SYNTAX → Score₂" style={{ flex: 1 }}>
          <AClip w={230} rows={[
            { icon: 'ok', label: 'Timeout(i)' },
            { icon: 'ok', label: 'Election(i)' },
            { icon: 'err', label: 'Heartbeat(i)' },
          ]} />
        </APanel>

        <div style={{ width: 190, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 8, padding: '14px 14px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: A.accentDeep, fontWeight: 700, letterSpacing: 0.5 }}>FINAL METRIC</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: A.ink2, lineHeight: 1.3 }}>0.5 · Score₁<br />+ 0.5 · Score₂</div>
        </div>
      </div>
    </div>
  );
}

// ── Phase 2 ──  layout: code │ TLC │ covered+error │ metric
function APhase2() {
  return (
    <div className="banner">
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 18, height: BODY_H, boxSizing: 'border-box' }}>
        <ACode title="parsed.tla (no syntax errors)" w={270}>
{`Next == \\E i \\in Server:
 \\/ Timeout(i) \\/ Election(i)
 \\/ Heartbeat(i)

Timeout(i) ==
 /\\ state[i] = "Follower"
 /\\ state' = [state EXCEPT
      ![i] = "Candidate"]
 /\\ UNCHANGED term`}
        </ACode>

        <AArrow label="feed" w={54} />

        <div style={{ width: 210, padding: '10px 12px', background: '#fff', border: `1.5px solid ${A.ink3}`, borderRadius: 4, textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: A.ink3, letterSpacing: 0.5, marginBottom: 3 }}>MODEL CHECKER</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600 }}>TLC</div>
          <svg width={180} height={84} viewBox="0 0 180 84" style={{ marginTop: 6, display: 'block' }}>
            {[[18, 20], [60, 12], [110, 28], [155, 22], [36, 54], [88, 60], [140, 62], [165, 64], [70, 78], [120, 78]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={4} fill="var(--accent)" opacity={0.85} />
            ))}
            <path d="M18 20 L60 12 L110 28 L155 22 M60 12 L36 54 L88 60 L140 62 L110 28 M88 60 L70 78 L120 78 L140 62 M140 62 L165 64" fill="none" stroke={A.ink3} strokeWidth={1} opacity={0.5} />
          </svg>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.ink3 }}>state space exploration</div>
        </div>

        <AArrow label="trace" w={54} />

        <div style={{ flex: 1, display: 'flex', gap: 12 }}>
          <APanel title="COVERED SET" color={A.ok} style={{ flex: 1 }}>
            <div style={{ border: `1.5px solid ${A.ok}`, borderRadius: 4, padding: '8px 12px', background: 'rgba(16,185,129,0.05)' }}>
              {['Timeout(i)', 'Election(i)', 'Heartbeat(i)'].map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontFamily: 'var(--mono)', fontSize: 11.5, color: A.ink2 }}>
                  <span style={{ color: A.ok }}>✓</span>{a}
                </div>
              ))}
            </div>
          </APanel>
          <APanel title="ERROR SET" color={A.err} style={{ flex: 1 }}>
            <div style={{ border: `1.5px solid ${A.err}`, borderRadius: 4, padding: '8px 12px', background: 'rgba(239,68,68,0.04)' }}>
              {['Election(i)', 'Heartbeat(i)'].map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontFamily: 'var(--mono)', fontSize: 11.5, color: A.ink2 }}>
                  <span style={{ color: A.err }}>✕</span>{a}
                </div>
              ))}
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: A.ink4, padding: '2px 0' }}>(deadlock, invariant viol.)</div>
            </div>
          </APanel>
        </div>

        <AMetric formula="|Covered \\ Error| / |All actions|" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '12px 8px', alignSelf: 'stretch' }} />
      </div>
    </div>
  );
}

// ── Phase 3 ──  layout: inputs │ harness+traces │ outputs │ metric
function APhase3() {
  return (
    <div className="banner">
      <div style={{ padding: '14px 24px', display: 'flex', gap: 14, height: BODY_H, boxSizing: 'border-box', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240, flexShrink: 0 }}>
          <div style={{ padding: '7px 10px', border: `1.5px solid ${A.ink3}`, borderRadius: 4, background: '#fff', flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.ink3, letterSpacing: 0.5, marginBottom: 4 }}>SYSTEM (INSTRUMENTED)</div>
            <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 9.5, color: A.ink2, whiteSpace: 'pre', lineHeight: 1.45 }}>
{`func (r *raft) tick() {
 // @trace role=Follower
 r.electionTick++
 if r.promotable() { ... }
}`}
            </pre>
          </div>
          <div style={{ padding: '7px 10px', border: `1.5px solid ${A.ink3}`, borderRadius: 4, background: '#fff', flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.ink3, letterSpacing: 0.5, marginBottom: 4 }}>MODEL (NO RUNTIME ERRORS)</div>
            <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 9.5, color: A.ink2, whiteSpace: 'pre', lineHeight: 1.45 }}>
{`Timeout(i) == ...
Election(i) == ...
Heartbeat(i) == ...`}
            </pre>
          </div>
        </div>

        <AArrow w={32} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ padding: '8px 12px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 4 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.accentDeep, letterSpacing: 0.5, marginBottom: 4, fontWeight: 600 }}>HARNESS · TRACE MAPPING</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, rowGap: 2, alignItems: 'center' }}>
              {[
                ['role = "Follower"', 'state[i] = "Follower"'],
                ['role = "Candidate"', 'state[i] = "Candidate"'],
                ['tick++', 'Timeout(i)'],
              ].map(([l, r], i) => (
                <React.Fragment key={i}>
                  <code style={{ fontFamily: 'var(--mono)', fontSize: 10, color: A.ink2, textAlign: 'right' }}>{l}</code>
                  <span style={{ color: A.accentDeep }}>→</span>
                  <code style={{ fontFamily: 'var(--mono)', fontSize: 10, color: A.ink2 }}>{r}</code>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flex: 1 }}>
            <div style={{ flex: 1, padding: '7px 10px', background: '#fff', border: `1px solid ${A.line}`, borderRadius: 4 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.ink3, letterSpacing: 0.5, marginBottom: 3 }}>LINUX · TRACE VALIDATION</div>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 9.5, color: A.ink2, lineHeight: 1.5 }}>
{`[t=0] role=Follower  ✓
[t=1] tick++         ✓
[t=2] role=Candidate ✓
[t=3] Heartbeat      ✕`}
              </pre>
            </div>
            <div style={{ flex: 1, padding: '7px 10px', background: '#fff', border: `1px solid ${A.line}`, borderRadius: 4, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -6, right: 8, padding: '1px 5px', background: 'var(--accent)', color: '#fff', fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: 0.3, borderRadius: 2, fontWeight: 600 }}>NEW</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.ink3, letterSpacing: 0.5, marginBottom: 3 }}>WINDOWS · TRACE VALIDATION</div>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 9.5, color: A.ink2, lineHeight: 1.5 }}>
{`ETW events → trace
[t=0] role=Follower  ✓
[t=1] tick++         ✓
[t=2] role=Candidate ✓`}
              </pre>
            </div>
          </div>
        </div>

        <AArrow w={32} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 220, flexShrink: 0 }}>
          <APanel title="CONFORMED SET" color={A.ok} style={{ flex: 1 }}>
            <div style={{ border: `1.5px solid ${A.ok}`, borderRadius: 4, padding: '6px 10px', background: 'rgba(16,185,129,0.05)' }}>
              {['Timeout(i)', 'Election(i)'].map(a => (
                <div key={a} style={{ display: 'flex', gap: 6, padding: '2px 0', fontFamily: 'var(--mono)', fontSize: 11, color: A.ink2 }}>
                  <span style={{ color: A.ok }}>✓</span>{a}
                </div>
              ))}
            </div>
          </APanel>
          <APanel title="ERROR SET" color={A.err} style={{ flex: 1 }}>
            <div style={{ border: `1.5px solid ${A.err}`, borderRadius: 4, padding: '6px 10px', background: 'rgba(239,68,68,0.04)' }}>
              <div style={{ display: 'flex', gap: 6, padding: '2px 0', fontFamily: 'var(--mono)', fontSize: 11, color: A.ink2 }}>
                <span style={{ color: A.err }}>✕</span>Heartbeat(i)
              </div>
            </div>
          </APanel>
          <AMetric formula="|Conf\\Err| / |code actions|" />
        </div>
      </div>
    </div>
  );
}

// ── Phase 4 ──  layout: yaml │ concretized │ TLC results │ metric
function APhase4() {
  return (
    <div className="banner">
      <div style={{ padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 20, height: BODY_H, boxSizing: 'border-box' }}>
        <ACode title="invariant_template.yaml" w={320}>
{`name: Inv1_LogConsistency
tla_example: |
  Inv1_LogConsistency ==
    \\A i, j \\in Server :
      \\A k \\in 1..minCommit :
        log[i][k] = log[j][k]`}
        </ACode>

        <AArrow label="concretize" w={80} dashed />

        <div style={{ padding: '10px 12px', border: `1.5px solid ${A.ink3}`, borderRadius: 4, background: '#fff', flex: 1 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: A.ink3, letterSpacing: 0.5, marginBottom: 6 }}>CONCRETIZED INVARIANTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              ['Inv1', 'log consistency'],
              ['Inv2', 'leader completeness'],
              ['Inv3', 'election safety'],
            ].map(([id, desc]) => (
              <div key={id} style={{ padding: '5px 8px', background: 'var(--accent-softer)', border: `1px solid var(--accent-soft)`, borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 11, color: A.ink2 }}>
                <span style={{ color: A.accentDeep, fontWeight: 600 }}>{id}</span> &nbsp;{desc}
              </div>
            ))}
          </div>
        </div>

        <AArrow label="TLC check" w={90} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {[['Inv1', true], ['Inv2', true], ['Inv3', false]].map(([id, ok]) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', border: `1.5px solid ${ok ? A.ok : A.err}`, borderRadius: 4, background: ok ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.04)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: ok ? A.ok : A.err, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{ok ? '✓' : '✕'}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, fontWeight: 600 }}>{id}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: A.ink3 }}>{ok ? 'verified' : 'violated'}</div>
            </div>
          ))}
          <AMetric formula="|Verified| / |All invariants|" />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { APhase1, APhase2, APhase3, APhase4 });
