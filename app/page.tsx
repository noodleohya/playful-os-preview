"use client";

import { useEffect, useMemo, useState } from "react";

type Phase = "brief" | "files" | "analyzing" | "results";
type ResultTab = "overview" | "overlay" | "outputs";

const DEFAULT_BRIEF =
  "A 12-city arena tour for an Asian pop artist, starting in Taipei and moving to London. Adapt our master show to the next venue without losing the intimate, panoramic feel.";

const AGENTS = [
  ["Show Interpreter", "Reading the creative intent"],
  ["Venue Analyst", "Comparing geometry and access"],
  ["Stage Planner", "Rebuilding the fit strategy"],
  ["Camera Planner", "Checking sightlines and paths"],
  ["Document Agent", "Preparing the approval pack"],
];

const OUTPUTS = [
  ["Venue fit brief", "PDF · 8 pages"],
  ["Plan overlay", "PDF + DWG notes"],
  ["Change log", "12 documented changes"],
  ["Review checklist", "7 items · 3 priority"],
];

export default function Home() {
  const [phase, setPhase] = useState<Phase>("brief");
  const [brief, setBrief] = useState(DEFAULT_BRIEF);
  const [masterFile, setMasterFile] = useState("NorthStar_MasterShow_v18.dwg");
  const [venueFile, setVenueFile] = useState("O2_Arena_venue_plan.pdf");
  const [agentStep, setAgentStep] = useState(0);
  const [tab, setTab] = useState<ResultTab>("overview");
  const [approved, setApproved] = useState(false);
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const timer = window.setInterval(() => {
      setAgentStep((current) => {
        if (current >= AGENTS.length) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase("results"), 420);
          return current;
        }
        return current + 1;
      });
    }, 620);
    return () => window.clearInterval(timer);
  }, [phase]);

  const phaseLabel = useMemo(() => {
    if (phase === "brief") return "New show";
    if (phase === "files") return "Show intake";
    if (phase === "analyzing") return "Agents working";
    return approved ? "Ready to advance" : "Human review";
  }, [approved, phase]);

  function useDemoFiles() {
    setMasterFile("NorthStar_MasterShow_v18.dwg");
    setVenueFile("O2_Arena_venue_plan.pdf");
  }

  function resetShow() {
    setPhase("brief");
    setBrief(DEFAULT_BRIEF);
    setAgentStep(0);
    setApproved(false);
    setTab("overview");
  }

  return (
    <main className="os-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <aside className={mobileNav ? "sidebar is-open" : "sidebar"}>
        <div className="brand-row">
          <button className="brand" onClick={resetShow} aria-label="Playful OS home">
            <span className="brand-mark">P</span>
            <span>Playful <i>OS</i></span>
          </button>
          <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu">Close</button>
        </div>

        <button className="new-show" onClick={resetShow}>
          <span>New show</span><span aria-hidden="true">＋</span>
        </button>

        <nav className="primary-nav" aria-label="Workspace">
          <button className="nav-item active"><span className="nav-index">01</span>Projects<span className="nav-count">04</span></button>
          <button className="nav-item"><span className="nav-index">02</span>Venue library<span className="nav-count">2.1k</span></button>
          <button className="nav-item"><span className="nav-index">03</span>Knowledge<span className="nav-count">128</span></button>
        </nav>

        <div className="module-block">
          <p className="section-label">OS modules</p>
          <button className="module active"><span className="module-dot" />VenueFit <em>Live</em></button>
          <button className="module"><span className="module-dot" />Stage Designer <em>Soon</em></button>
          <button className="module"><span className="module-dot" />Lighting <em>Soon</em></button>
          <button className="module"><span className="module-dot" />Media + Camera <em>Soon</em></button>
        </div>

        <div className="profile-card">
          <span className="avatar">PS</span>
          <span><strong>Playful Studio</strong><small>Private workspace</small></span>
          <span className="profile-more">•••</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu">Menu</button>
          <div className="context-path"><span>North Star Tour</span><b>/</b><strong>{phaseLabel}</strong></div>
          <div className="system-state"><span className="live-dot" />System ready <kbd>⌘ K</kbd></div>
        </header>

        {phase === "brief" && (
          <section className="brief-view view-enter">
            <div className="hero-copy">
              <p className="eyebrow"><span>PLAYFUL INTELLIGENCE</span><b>01 / BRIEF</b></p>
              <h1>Describe your<br /><em>next show.</em></h1>
              <p className="hero-sub">One brief in. A coordinated production system out.</p>
            </div>

            <div className="prompt-panel">
              <label htmlFor="show-brief">What are you making?</label>
              <textarea
                id="show-brief"
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                rows={5}
                placeholder="An arena tour, an awards show, a brand experience…"
              />
              <div className="prompt-actions">
                <div className="prompt-tools" aria-label="Brief shortcuts">
                  <button onClick={() => setBrief("A flexible arena show for 8,000–15,000 people. Prioritize fast load-ins, strong IMAG and a consistent experience across venues.")}>Arena tour</button>
                  <button onClick={() => setBrief("A one-night immersive product launch with a central stage, kinetic light and a dramatic reveal moment.")}>Brand launch</button>
                  <button onClick={() => setBrief("A compact festival stage package that can adapt to different sites while keeping one recognizable visual identity.")}>Festival</button>
                </div>
                <button className="primary-cta" onClick={() => setPhase("files")} disabled={!brief.trim()}>
                  Build my show <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>

            <div className="orchestration-line">
              <span>One conversation</span><i />
              <span>Specialist agents</span><i />
              <span>Reviewable outputs</span>
            </div>

            <button className="recent-project" onClick={() => setPhase("results")}>
              <span className="project-thumbnail"><i /><b>84</b></span>
              <span className="project-name"><small>CONTINUE</small><strong>North Star Arena Tour</strong><em>London · VenueFit review</em></span>
              <span className="project-status">3 items need you <b>→</b></span>
            </button>
          </section>
        )}

        {phase === "files" && (
          <section className="intake-view view-enter">
            <div className="view-heading">
              <button className="back-link" onClick={() => setPhase("brief")}>← Back to brief</button>
              <p className="eyebrow"><span>VENUEFIT</span><b>02 / SOURCE FILES</b></p>
              <h2>Let’s fit the<br /><em>first venue.</em></h2>
              <p>The OS needs a master show and the next venue. It will compare them, surface constraints, and prepare a reviewable adaptation pack.</p>
            </div>

            <div className="file-grid">
              <FileCard
                index="01"
                title="Master show"
                note="Your approved touring configuration"
                fileName={masterFile}
                accept=".dwg,.dxf,.pdf,.vwx"
                onChange={setMasterFile}
              />
              <FileCard
                index="02"
                title="Next venue"
                note="Plan, section, rigging or tech pack"
                fileName={venueFile}
                accept=".dwg,.dxf,.pdf,.vwx"
                onChange={setVenueFile}
              />
            </div>

            <div className="intake-footer">
              <button className="demo-link" onClick={useDemoFiles}>Use sample project</button>
              <div className="privacy-note"><span>Private by default</span>Your files stay inside this workspace.</div>
              <button className="primary-cta large" disabled={!masterFile || !venueFile} onClick={() => setPhase("analyzing")}>
                Generate VenueFit <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}

        {phase === "analyzing" && (
          <section className="analysis-view view-enter">
            <div className="analysis-orbit" aria-hidden="true">
              <span className="orbit orbit-a" />
              <span className="orbit orbit-b" />
              <span className="orbit-center"><b>{Math.min(99, 18 + agentStep * 17)}%</b><small>VenueFit</small></span>
            </div>
            <div className="analysis-copy">
              <p className="eyebrow"><span>MULTI-AGENT RUN</span><b>03 / ANALYSIS</b></p>
              <h2>The show is<br /><em>taking shape.</em></h2>
              <p className="analysis-summary">Five specialists are comparing your creative intent with the physical reality of the venue.</p>
              <div className="agent-list">
                {AGENTS.map(([name, task], index) => (
                  <div className={`agent-row ${index < agentStep ? "done" : index === agentStep ? "working" : ""}`} key={name}>
                    <span className="agent-state">{index < agentStep ? "✓" : String(index + 1).padStart(2, "0")}</span>
                    <span><strong>{name}</strong><small>{index < agentStep ? "Complete" : index === agentStep ? task : "Waiting"}</small></span>
                    <i />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {phase === "results" && (
          <section className="results-view view-enter">
            <div className="results-header">
              <div>
                <button className="back-link" onClick={resetShow}>← All projects</button>
                <p className="eyebrow"><span>NORTH STAR TOUR / LONDON</span><b>VENUEFIT 001</b></p>
                <h2>Fit found.<br /><em>Three decisions remain.</em></h2>
              </div>
              <div className="fit-score">
                <span className="score-ring"><b>84</b><small>/ 100</small></span>
                <span><small>VENUE FIT</small><strong>Viable with changes</strong><em>High confidence · 8 min ago</em></span>
              </div>
            </div>

            <div className="result-tabs" role="tablist" aria-label="VenueFit results">
              <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")} role="tab">Overview <span>03</span></button>
              <button className={tab === "overlay" ? "active" : ""} onClick={() => setTab("overlay")} role="tab">Plan overlay</button>
              <button className={tab === "outputs" ? "active" : ""} onClick={() => setTab("outputs")} role="tab">Outputs <span>04</span></button>
            </div>

            {tab === "overview" && (
              <div className="overview-grid tab-enter">
                <div className="plan-card">
                  <div className="card-heading"><span><small>LIVE PLAN</small><strong>Master show × London venue</strong></span><button onClick={() => setTab("overlay")}>Open overlay ↗</button></div>
                  <StagePlan />
                  <div className="plan-legend"><span><i className="master" />Master show</span><span><i className="venue" />Venue boundary</span><span><i className="risk" />Needs decision</span></div>
                </div>

                <div className="decision-panel">
                  <div className="card-heading"><span><small>YOUR REVIEW</small><strong>3 decisions</strong></span><em>Priority</em></div>
                  <DecisionItem level="01" title="Reduce stage width by 1.8 m" text="Retains the panoramic ratio and clears both venue wings." tag="Recommended" />
                  <DecisionItem level="02" title="Reposition 6 rigging points" text="Four points conflict with house steel; two exceed the preferred bridle angle." tag="Engineering check" />
                  <DecisionItem level="03" title="Shift camera lane 1.2 m" text="Restores a clear audience route without changing the hero shot." tag="Low impact" />
                </div>

                <div className="metrics-strip">
                  <Metric title="Stage envelope" value="−1.8 m" note="Width adjustment" state="warn" />
                  <Metric title="Trim height" value="14.2 m" note="1.1 m clearance" state="good" />
                  <Metric title="Sightlines" value="92%" note="Clean coverage" state="good" />
                  <Metric title="Load-in" value="+45 min" note="Revised sequence" state="neutral" />
                </div>

                <div className={`approval-card ${approved ? "approved" : ""}`}>
                  <span className="approval-symbol">{approved ? "✓" : "!"}</span>
                  <span><small>{approved ? "HUMAN APPROVED" : "HUMAN CHECKPOINT"}</small><strong>{approved ? "Venue adaptation approved" : "The OS has prepared a recommendation—not a final engineering sign-off."}</strong><em>{approved ? "Ready for local engineering and venue coordination." : "Confirm the three decisions before the pack advances."}</em></span>
                  <button onClick={() => setApproved(true)} disabled={approved}>{approved ? "Approved" : "Approve adaptation →"}</button>
                </div>
              </div>
            )}

            {tab === "overlay" && (
              <div className="overlay-layout tab-enter">
                <div className="overlay-stage"><StagePlan detailed /><div className="dimension-note note-a">−1.8 m width</div><div className="dimension-note note-b">+1.2 m route</div><div className="dimension-note note-c">6 rig points</div></div>
                <aside className="layers-panel">
                  <p className="section-label">Plan layers</p>
                  {["Venue boundary", "Master show", "Adapted stage", "Rigging conflicts", "Camera + access"].map((item, index) => <label key={item}><input type="checkbox" defaultChecked /><span className={`layer-swatch layer-${index}`} />{item}</label>)}
                  <div className="scale-block"><small>WORKING SCALE</small><strong>1 : 200</strong><em>Reference only</em></div>
                </aside>
              </div>
            )}

            {tab === "outputs" && (
              <div className="outputs-layout tab-enter">
                <div className="outputs-intro"><p className="eyebrow"><span>DOCUMENT AGENT</span><b>READY</b></p><h3>A clean handoff,<br /><em>already prepared.</em></h3><p>Every change links back to a venue constraint and a review decision. Nothing gets buried in a chat.</p></div>
                <div className="output-list">
                  {OUTPUTS.map(([name, meta], index) => (
                    <button key={name} onClick={() => setDownloaded(name)}>
                      <span className="output-index">{String(index + 1).padStart(2, "0")}</span>
                      <span><strong>{name}</strong><small>{downloaded === name ? "Prepared for download" : meta}</small></span>
                      <b>{downloaded === name ? "Ready ✓" : "Prepare ↓"}</b>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

function FileCard({ index, title, note, fileName, accept, onChange }: { index: string; title: string; note: string; fileName: string; accept: string; onChange: (name: string) => void }) {
  const inputId = `file-${index}`;
  return (
    <label className={`file-card ${fileName ? "has-file" : ""}`} htmlFor={inputId}>
      <input id={inputId} type="file" accept={accept} onChange={(event) => onChange(event.target.files?.[0]?.name ?? "")} />
      <span className="file-index">{index}</span>
      <span className="file-icon"><i /><i /><i /></span>
      <span className="file-copy"><small>{note}</small><strong>{fileName || title}</strong><em>{fileName ? "Ready to compare · Click to replace" : "DWG, DXF, PDF or VWX · Click to choose"}</em></span>
      <span className="file-state">{fileName ? "✓" : "+"}</span>
    </label>
  );
}

function DecisionItem({ level, title, text, tag }: { level: string; title: string; text: string; tag: string }) {
  return <article className="decision-item"><span className="decision-number">{level}</span><div><strong>{title}</strong><p>{text}</p><em>{tag}</em></div><button aria-label={`Open ${title}`}>↗</button></article>;
}

function Metric({ title, value, note, state }: { title: string; value: string; note: string; state: string }) {
  return <div className={`metric ${state}`}><small>{title}</small><strong>{value}</strong><em><i />{note}</em></div>;
}

function StagePlan({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`stage-plan ${detailed ? "detailed" : ""}`} aria-label="Top view comparison of master show and venue">
      <div className="grid-lines" />
      <div className="venue-shell"><span className="seat seat-a" /><span className="seat seat-b" /><span className="seat seat-c" /></div>
      <div className="master-stage"><span className="stage-label">MASTER STAGE · 42.0 M</span><i className="wing left" /><i className="wing right" /><i className="runway" /><i className="b-stage" /></div>
      <div className="adapted-stage"><span>ADAPTED · 40.2 M</span></div>
      {[1, 2, 3, 4, 5, 6].map((point) => <i className={`rig-point rig-${point}`} key={point}>{point}</i>)}
      <div className="foh">FOH</div>
      <div className="camera-line">CAMERA PATH</div>
      <span className="north">N ↑</span>
      <span className="plan-scale">0&nbsp;&nbsp; 5&nbsp;&nbsp; 10 M</span>
    </div>
  );
}
