import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIdea } from '../context/ideaContext'
import '../styles/DashboardPage.css'

export default function DashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // 1. Recuperiamo l'idea e i dati veri dal Context
  const { idea, analyzedData } = useIdea()

  // 2. Controllo di sicurezza: se i dati non sono pronti, si torna in Home
  useEffect(() => {
    if (!idea || !idea.trim() || !analyzedData) {
      navigate('/')
    }
  }, [idea, analyzedData, navigate])

  // 🔥 IL MURO DI SICUREZZA: evita crash se i dati non sono ancora mappati
  if (!idea || !idea.trim() || !analyzedData) {
    return null
  }

  /* 🚀 CALCOLO IN TEMPO REALE (Senza blocco useState)
     Ogni volta che analyzedData si aggiorna con il JSON di Gemini,
     questo oggetto si popola istantaneamente.
  */
  const dashboardData = {
    ideaDescription: analyzedData.sintesi || "Nessuna sintesi disponibile",

    successScore: {
      score: analyzedData.score || 0,
      maxScore: 100,
      label: (analyzedData.score || 0) >= 80 ? "Potenziale Elevato" : (analyzedData.score || 0) >= 60 ? "Potenziale Moderato" : "Basso Potenziale"
    },

    verdettoValidazione: {
      status: analyzedData.verdict || "N/D",
      description: "L'analisi in tempo reale ha elaborato la fattibilità di esecuzione, i concorrenti di riferimento e le barriere commerciali. Il verdetto indica se l'idea possiede i presupposti per avanzare alla fase operativa."
    },

    analisiDifficolta: [
      {
        id: "01",
        title: analyzedData.diffParagraph1Title || "Barriera d'ingresso",
        description: analyzedData.diffParagraph1Text || "Dettagli non disponibili"
      },
      {
        id: "02",
        title: analyzedData.diffParagraph2Title || "Sostenibilità",
        description: analyzedData.diffParagraph2Text || "Dettagli non disponibili"
      }
    ],

    mappaturaCompetitor: (analyzedData.competitors || []).map(comp => ({
      name: comp.name || "Nero aziendale",
      coreBusiness: comp.core || "Non specificato",
      puntoDebole: comp.weakness || "Non specificato"
    })),

    targetUserPersonas: (analyzedData.personas || []).map(persona => ({
      name: persona.name || "Utente Target",
      role: persona.role ? persona.role.toUpperCase() : "TARGET",
      avatar: persona.name ? persona.name.charAt(0) : 'U',
      quote: persona.quote || "Nessuna citazione",
      description: persona.description || "Descrizione non disponibile"
    }))
  }

  // 3. CALCOLO DINAMICO GRAFICA SVG (Tachimetro)
  const r = 80
  const circ = Math.PI * r
  const strokeDashoffset = circ - (dashboardData.successScore.score / 100) * circ

  return (
    <div className="dashboard-container">
      <div className="tech-bg-grid" />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <button onClick={() => navigate('/')} className="back-btn">
            <span className="material-symbols-outlined">arrow_back</span>
            Torna alla Home
          </button>
          <div className="text-label-sm">
            Assistente Marketing AI • ID: {Math.floor(Math.random() * 900000) + 100000}
          </div>
        </header>

        <div className="bento-grid">

          {/* CARD 1: SINTESI IDEA */}
          <section className="bento-card glass-panel card-sintesi">
            <div className="card-title-row">
              <span className="card-indicator" />
              <h2 className="card-title">Sintesi Idea Business</h2>
            </div>
            <p className="sintesi-text">"{dashboardData.ideaDescription}"</p>
          </section>

          {/* CARD 2: TACHIMETRO */}
          <section className="bento-card glass-panel card-score">
            <h2 className="card-title">Success Score</h2>
            <div className="speedometer-widget">
              <svg viewBox="0 0 200 120" width="100%">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--secondary-container)" />
                    <stop offset="100%" stopColor="var(--primary-container)" />
                  </linearGradient>
                  <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="var(--surface-container-high)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  className="speedometer-active-path"
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${circ} ${circ}`}
                  strokeDashoffset={strokeDashoffset}
                  filter="url(#gaugeGlow)"
                />
              </svg>
              <div className="speedometer-score-container">
                <span className="speedometer-score-num">{dashboardData.successScore.score}</span>
                <span className="speedometer-score-max">/{dashboardData.successScore.maxScore}</span>
              </div>
            </div>
            <div className="speedometer-label">
              {dashboardData.successScore.label}
            </div>
          </section>

          {/* CARD 3: ANALISI DIFFICOLTÀ */}
          <section className="bento-card glass-panel card-difficolta">
            <div className="card-title-row">
              <span className="card-indicator card-indicator-secondary" />
              <h2 className="card-title card-title-secondary">Analisi Difficoltà</h2>
            </div>
            <div className="diff-content">
              {dashboardData.analisiDifficolta.map((diff) => (
                <div key={diff.id} className="diff-paragraph">
                  <h3 className="diff-paragraph-title">{diff.id}. {diff.title}</h3>
                  <p className="diff-paragraph-text">{diff.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CARD 4: VERDETTO */}
          <section className="bento-card glass-panel card-verdict">
            <div className="verdict-info">
              <h2 className="verdict-title">Verdetto Validazione</h2>
              <p className="verdict-desc">
                {dashboardData.verdettoValidazione.description}
              </p>
            </div>
            <div className={`verdict-badge ${dashboardData.verdettoValidazione.status === 'GO' || dashboardData.verdettoValidazione.status === 'APPROVATO' ? 'verdict-go' : 'verdict-nogo'}`}>
              Verdetto: {dashboardData.verdettoValidazione.status}
            </div>
          </section>

          {/* CARD 5: TABELLA COMPETITOR */}
          <section className="bento-card glass-panel card-competitors">
            <div className="card-title-row">
              <span className="card-indicator card-indicator-secondary" />
              <h2 className="card-title card-title-secondary">Mappatura Competitor (Top 3)</h2>
            </div>
            <div className="table-wrapper">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Core Business</th>
                    <th>Punto Debole</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.mappaturaCompetitor.map((comp, idx) => (
                    <tr key={idx}>
                      <td className="comp-name" data-label="Nome">{comp.name}</td>
                      <td className="comp-core" data-label="Core Business">{comp.coreBusiness}</td>
                      <td data-label="Punto Debole">
                        <span className="comp-weakness">{comp.puntoDebole}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* TITOLO SEZIONE PERSONAS */}
          <div className="personas-title-row">
            <span className="card-indicator card-indicator-large" />
            <h2 className="text-headline-md">Target User Personas</h2>
          </div>

          {/* CARD 6 & 7: GRIGLIA PERSONAS */}
          <div className="personas-grid">
            {dashboardData.targetUserPersonas.map((persona, idx) => {
              return (
                <article key={idx} className="bento-card glass-panel glass-panel-hover persona-card">
                  <div className="persona-header">
                    <div className="persona-avatar-initials">{persona.avatar}</div>
                    <div className="persona-meta">
                      <span className="persona-name">{persona.name}</span>
                      <span className="persona-role">{persona.role}</span>
                    </div>
                  </div>
                  <blockquote className="persona-quote">
                    "{persona.quote}"
                  </blockquote>
                  <p className="persona-desc">
                    {persona.description}
                  </p>
                </article>
              )
            })}
          </div>

        </div>
      </main>
    </div>
  )
}