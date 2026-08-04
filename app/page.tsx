"use client";

import { useEffect, useState } from "react";
import { getCopy, LANGUAGES, type Locale } from "./i18n";

type Phase = "brief" | "files" | "analyzing" | "results";
type ResultTab = "overview" | "overlay" | "outputs";

const TEMPLATE_KEYS = ["defaultBrief", "arenaBrief", "brandBrief", "festivalBrief"] as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh-TW");
  const [phase, setPhase] = useState<Phase>("brief");
  const [brief, setBrief] = useState(getCopy("zh-TW", "defaultBrief"));
  const [masterFile, setMasterFile] = useState("NorthStar_MasterShow_v18.dwg");
  const [venueFile, setVenueFile] = useState("O2_Arena_venue_plan.pdf");
  const [agentStep, setAgentStep] = useState(0);
  const [tab, setTab] = useState<ResultTab>("overview");
  const [approved, setApproved] = useState(false);
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const t = (key: Parameters<typeof getCopy>[1]) => getCopy(locale, key);

  const agents = [
    [t("agent1"), t("agent1Task")],
    [t("agent2"), t("agent2Task")],
    [t("agent3"), t("agent3Task")],
    [t("agent4"), t("agent4Task")],
    [t("agent5"), t("agent5Task")],
  ];

  const outputs = [
    [t("output1"), t("output1Meta")],
    [t("output2"), t("output2Meta")],
    [t("output3"), t("output3Meta")],
    [t("output4"), t("output4Meta")],
  ];

  useEffect(() => {
    if (phase !== "analyzing") return;
    const timer = window.setInterval(() => {
      setAgentStep((current) => {
        if (current >= 5) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase("results"), 420);
          return current;
        }
        return current + 1;
      });
    }, 620);
    return () => window.clearInterval(timer);
  }, [phase]);

  const phaseLabel = phase === "brief"
    ? t("phaseNew")
    : phase === "files"
      ? t("phaseIntake")
      : phase === "analyzing"
        ? t("phaseAgents")
        : approved ? t("phaseAdvance") : t("phaseReview");

  function changeLanguage(nextLocale: Locale) {
    const currentTemplate = TEMPLATE_KEYS.find((key) =>
      LANGUAGES.some((language) => getCopy(language.code, key) === brief),
    );
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    if (currentTemplate) setBrief(getCopy(nextLocale, currentTemplate));
  }

  function useDemoFiles() {
    setMasterFile("NorthStar_MasterShow_v18.dwg");
    setVenueFile("O2_Arena_venue_plan.pdf");
  }

  function resetShow() {
    setPhase("brief");
    setBrief(t("defaultBrief"));
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
          <button className="brand" onClick={resetShow} aria-label="Playful OS">
            <span className="brand-mark">P</span>
            <span>Playful <i>OS</i></span>
          </button>
          <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close">×</button>
        </div>

        <button className="new-show" onClick={resetShow}>
          <span>{t("newShow")}</span><span aria-hidden="true">＋</span>
        </button>

        <nav className="primary-nav" aria-label="Workspace">
          <button className="nav-item active"><span className="nav-index">01</span>{t("projects")}<span className="nav-count">04</span></button>
          <button className="nav-item"><span className="nav-index">02</span>{t("venueLibrary")}<span className="nav-count">2.1k</span></button>
          <button className="nav-item"><span className="nav-index">03</span>{t("knowledge")}<span className="nav-count">128</span></button>
        </nav>

        <div className="module-block">
          <p className="section-label">{t("modules")}</p>
          <button className="module active"><span className="module-dot" />VenueFit <em>{t("live")}</em></button>
          <button className="module"><span className="module-dot" />{t("stageDesigner")} <em>{t("soon")}</em></button>
          <button className="module"><span className="module-dot" />{t("lighting")} <em>{t("soon")}</em></button>
          <button className="module"><span className="module-dot" />{t("mediaCamera")} <em>{t("soon")}</em></button>
        </div>

        <div className="profile-card">
          <span className="avatar">PS</span>
          <span><strong>Playful Studio</strong><small>{t("privateWorkspace")}</small></span>
          <span className="profile-more">•••</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Menu">☰</button>
          <div className="context-path"><span>North Star Tour</span><b>/</b><strong>{phaseLabel}</strong></div>
          <div className="topbar-actions">
            <label className="language-picker">
              <span className="language-globe" aria-hidden="true">◎</span>
              <select value={locale} onChange={(event) => changeLanguage(event.target.value as Locale)} aria-label="Language">
                {LANGUAGES.map((language) => <option value={language.code} key={language.code}>{language.label}</option>)}
              </select>
              <span aria-hidden="true">⌄</span>
            </label>
            <div className="system-state"><span className="live-dot" />{t("systemReady")} <kbd>⌘ K</kbd></div>
          </div>
        </header>

        {phase === "brief" && (
          <section className="brief-view view-enter">
            <div className="hero-copy">
              <p className="eyebrow"><span>{t("heroKicker")}</span><b>01 / BRIEF</b></p>
              <h1>{t("heroLine1")}<br /><em>{t("heroLine2")}</em></h1>
              <p className="hero-sub">{t("heroSub")}</p>
            </div>

            <div className="prompt-panel">
              <label htmlFor="show-brief">{t("whatMaking")}</label>
              <textarea id="show-brief" value={brief} onChange={(event) => setBrief(event.target.value)} rows={5} placeholder={t("briefPlaceholder")} />
              <div className="prompt-actions">
                <div className="prompt-tools" aria-label="Brief shortcuts">
                  <button onClick={() => setBrief(t("arenaBrief"))}>{t("arena")}</button>
                  <button onClick={() => setBrief(t("brandBrief"))}>{t("brand")}</button>
                  <button onClick={() => setBrief(t("festivalBrief"))}>{t("festival")}</button>
                </div>
                <button className="primary-cta" onClick={() => setPhase("files")} disabled={!brief.trim()}>
                  {t("buildShow")} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>

            <div className="orchestration-line">
              <span>{t("oneConversation")}</span><i />
              <span>{t("specialistAgents")}</span><i />
              <span>{t("reviewableOutputs")}</span>
            </div>

            <button className="recent-project" onClick={() => setPhase("results")}>
              <span className="project-thumbnail"><i /><b>84</b></span>
              <span className="project-name"><small>{t("continue")}</small><strong>{t("sampleProject")}</strong><em>{t("londonReview")}</em></span>
              <span className="project-status">{t("itemsNeedYou")} <b>→</b></span>
            </button>
          </section>
        )}

        {phase === "files" && (
          <section className="intake-view view-enter">
            <div className="view-heading">
              <button className="back-link" onClick={() => setPhase("brief")}>← {t("backBrief")}</button>
              <p className="eyebrow"><span>{t("venueFitKicker")}</span><b>{t("sourceFiles")}</b></p>
              <h2>{t("fitLine1")}<br /><em>{t("fitLine2")}</em></h2>
              <p>{t("intakeDesc")}</p>
            </div>

            <div className="file-grid">
              <FileCard index="01" title={t("masterShow")} note={t("masterNote")} fileName={masterFile} accept=".dwg,.dxf,.pdf,.vwx" onChange={setMasterFile} readyText={t("readyCompare")} chooseText={t("chooseFile")} />
              <FileCard index="02" title={t("nextVenue")} note={t("venueNote")} fileName={venueFile} accept=".dwg,.dxf,.pdf,.vwx" onChange={setVenueFile} readyText={t("readyCompare")} chooseText={t("chooseFile")} />
            </div>

            <div className="intake-footer">
              <button className="demo-link" onClick={useDemoFiles}>{t("useSample")}</button>
              <div className="privacy-note"><span>{t("privateDefault")}</span>{t("privacy")}</div>
              <button className="primary-cta large" disabled={!masterFile || !venueFile} onClick={() => setPhase("analyzing")}>
                {t("generate")} <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        )}

        {phase === "analyzing" && (
          <section className="analysis-view view-enter">
            <div className="analysis-orbit" aria-hidden="true">
              <span className="orbit orbit-a" /><span className="orbit orbit-b" />
              <span className="orbit-center"><b>{Math.min(99, 18 + agentStep * 17)}%</b><small>VenueFit</small></span>
            </div>
            <div className="analysis-copy">
              <p className="eyebrow"><span>{t("runKicker")}</span><b>{t("analysisStep")}</b></p>
              <h2>{t("shapeLine1")}<br /><em>{t("shapeLine2")}</em></h2>
              <p className="analysis-summary">{t("analysisSummary")}</p>
              <div className="agent-list">
                {agents.map(([name, task], index) => (
                  <div className={`agent-row ${index < agentStep ? "done" : index === agentStep ? "working" : ""}`} key={name}>
                    <span className="agent-state">{index < agentStep ? "✓" : String(index + 1).padStart(2, "0")}</span>
                    <span><strong>{name}</strong><small>{index < agentStep ? t("complete") : index === agentStep ? task : t("waiting")}</small></span>
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
                <button className="back-link" onClick={resetShow}>← {t("allProjects")}</button>
                <p className="eyebrow"><span>{t("tourLocation")}</span><b>VENUEFIT 001</b></p>
                <h2>{t("fitFound")}<br /><em>{t("decisionsRemain")}</em></h2>
              </div>
              <div className="fit-score">
                <span className="score-ring"><b>84</b><small>/ 100</small></span>
                <span><small>{t("venueFit")}</small><strong>{t("viable")}</strong><em>{t("confidence")}</em></span>
              </div>
            </div>

            <div className="result-tabs" role="tablist" aria-label="VenueFit">
              <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")} role="tab">{t("overview")} <span>03</span></button>
              <button className={tab === "overlay" ? "active" : ""} onClick={() => setTab("overlay")} role="tab">{t("planOverlay")}</button>
              <button className={tab === "outputs" ? "active" : ""} onClick={() => setTab("outputs")} role="tab">{t("outputs")} <span>04</span></button>
            </div>

            {tab === "overview" && (
              <div className="overview-grid tab-enter">
                <div className="plan-card">
                  <div className="card-heading"><span><small>{t("livePlan")}</small><strong>{t("masterLondon")}</strong></span><button onClick={() => setTab("overlay")}>{t("openOverlay")} ↗</button></div>
                  <StagePlan masterLabel={t("masterStageLabel")} adaptedLabel={t("adaptedLabel")} cameraLabel={t("cameraPath")} />
                  <div className="plan-legend"><span><i className="master" />{t("masterLegend")}</span><span><i className="venue" />{t("venueBoundary")}</span><span><i className="risk" />{t("needsDecision")}</span></div>
                </div>

                <div className="decision-panel">
                  <div className="card-heading"><span><small>{t("yourReview")}</small><strong>{t("threeDecisions")}</strong></span><em>{t("priority")}</em></div>
                  <DecisionItem level="01" title={t("decision1")} text={t("decision1Text")} tag={t("recommended")} />
                  <DecisionItem level="02" title={t("decision2")} text={t("decision2Text")} tag={t("engineeringCheck")} />
                  <DecisionItem level="03" title={t("decision3")} text={t("decision3Text")} tag={t("lowImpact")} />
                </div>

                <div className="metrics-strip">
                  <Metric title={t("stageEnvelope")} value="−1.8 m" note={t("widthAdjustment")} state="warn" />
                  <Metric title={t("trimHeight")} value="14.2 m" note={t("clearance")} state="good" />
                  <Metric title={t("sightlines")} value="92%" note={t("cleanCoverage")} state="good" />
                  <Metric title={t("loadIn")} value="+45 min" note={t("revisedSequence")} state="neutral" />
                </div>

                <div className={`approval-card ${approved ? "approved" : ""}`}>
                  <span className="approval-symbol">{approved ? "✓" : "!"}</span>
                  <span><small>{approved ? t("humanApproved") : t("humanCheckpoint")}</small><strong>{approved ? t("adaptationApproved") : t("recommendationOnly")}</strong><em>{approved ? t("readyCoordination") : t("confirmThree")}</em></span>
                  <button onClick={() => setApproved(true)} disabled={approved}>{approved ? t("approved") : `${t("approve")} →`}</button>
                </div>
              </div>
            )}

            {tab === "overlay" && (
              <div className="overlay-layout tab-enter">
                <div className="overlay-stage"><StagePlan detailed masterLabel={t("masterStageLabel")} adaptedLabel={t("adaptedLabel")} cameraLabel={t("cameraPath")} /><div className="dimension-note note-a">−1.8 m</div><div className="dimension-note note-b">+1.2 m</div><div className="dimension-note note-c">6 × RIG</div></div>
                <aside className="layers-panel">
                  <p className="section-label">{t("planLayers")}</p>
                  {[t("venueBoundary"), t("masterLegend"), t("adaptedStage"), t("riggingConflicts"), t("cameraAccess")].map((item, index) => <label key={item}><input type="checkbox" defaultChecked /><span className={`layer-swatch layer-${index}`} />{item}</label>)}
                  <div className="scale-block"><small>{t("workingScale")}</small><strong>1 : 200</strong><em>{t("referenceOnly")}</em></div>
                </aside>
              </div>
            )}

            {tab === "outputs" && (
              <div className="outputs-layout tab-enter">
                <div className="outputs-intro"><p className="eyebrow"><span>{t("documentAgent")}</span><b>{t("ready")}</b></p><h3>{t("handoffLine1")}<br /><em>{t("handoffLine2")}</em></h3><p>{t("handoffDesc")}</p></div>
                <div className="output-list">
                  {outputs.map(([name, meta], index) => (
                    <button key={name} onClick={() => setDownloaded(name)}>
                      <span className="output-index">{String(index + 1).padStart(2, "0")}</span>
                      <span><strong>{name}</strong><small>{downloaded === name ? t("readyDownload") : meta}</small></span>
                      <b>{downloaded === name ? `${t("prepared")} ✓` : `${t("prepare")} ↓`}</b>
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

function FileCard({ index, title, note, fileName, accept, onChange, readyText, chooseText }: { index: string; title: string; note: string; fileName: string; accept: string; onChange: (name: string) => void; readyText: string; chooseText: string }) {
  const inputId = `file-${index}`;
  return (
    <label className={`file-card ${fileName ? "has-file" : ""}`} htmlFor={inputId}>
      <input id={inputId} type="file" accept={accept} onChange={(event) => onChange(event.target.files?.[0]?.name ?? "")} />
      <span className="file-index">{index}</span><span className="file-icon"><i /><i /><i /></span>
      <span className="file-copy"><small>{note}</small><strong>{fileName || title}</strong><em>{fileName ? readyText : chooseText}</em></span>
      <span className="file-state">{fileName ? "✓" : "+"}</span>
    </label>
  );
}

function DecisionItem({ level, title, text, tag }: { level: string; title: string; text: string; tag: string }) {
  return <article className="decision-item"><span className="decision-number">{level}</span><div><strong>{title}</strong><p>{text}</p><em>{tag}</em></div><button aria-label={title}>↗</button></article>;
}

function Metric({ title, value, note, state }: { title: string; value: string; note: string; state: string }) {
  return <div className={`metric ${state}`}><small>{title}</small><strong>{value}</strong><em><i />{note}</em></div>;
}

function StagePlan({ detailed = false, masterLabel, adaptedLabel, cameraLabel }: { detailed?: boolean; masterLabel: string; adaptedLabel: string; cameraLabel: string }) {
  return (
    <div className={`stage-plan ${detailed ? "detailed" : ""}`} aria-label="VenueFit plan">
      <div className="grid-lines" />
      <div className="venue-shell"><span className="seat seat-a" /><span className="seat seat-b" /><span className="seat seat-c" /></div>
      <div className="master-stage"><span className="stage-label">{masterLabel} · 42.0 M</span><i className="wing left" /><i className="wing right" /><i className="runway" /><i className="b-stage" /></div>
      <div className="adapted-stage"><span>{adaptedLabel} · 40.2 M</span></div>
      {[1, 2, 3, 4, 5, 6].map((point) => <i className={`rig-point rig-${point}`} key={point}>{point}</i>)}
      <div className="foh">FOH</div><div className="camera-line">{cameraLabel}</div>
      <span className="north">N ↑</span><span className="plan-scale">0&nbsp;&nbsp; 5&nbsp;&nbsp; 10 M</span>
    </div>
  );
}
