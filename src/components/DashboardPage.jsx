import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { analyzeIdea } from '../utils/analyzer'
import '../styles/DashboardPage.css'

export default function DashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Default fallback idea if accessed directly
  const defaultIdea = "Piattaforma software (SaaS) basata su intelligenza artificiale per l'ottimizzazione automatica delle campagne di marketing sui social media per e-commerce di piccole dimensioni."
  const idea = location.state?.idea || defaultIdea

  // Create state based on the object structure from example.js
  const [dashboardData, setDashboardData] = useState(() => {
    const analyzed = analyzeIdea(idea)
    return {
      ideaDescription: analyzed.sintesi,
      successScore: {
        score: analyzed.score,
        maxScore: 100,
        label: analyzed.score >= 80 ? "Potenziale Elevato" : analyzed.score >= 60 ? "Potenziale Moderato" : "Basso Potenziale"
      },
      verdettoValidazione: {
        status: analyzed.verdict,
        description: "L'analisi algoritmica ha elaborato la fattibilità di esecuzione, i concorrenti di riferimento e le barriere commerciali. Il verdetto indica se l'idea possiede i presupposti per avanzare alla fase operativa."
      },
      analisiDifficolta: [
        {
          id: "01",
          title: analyzed.diffParagraph1Title,
          description: analyzed.diffParagraph1Text
        },
        {
          id: "02",
          title: analyzed.diffParagraph2Title,
          description: analyzed.diffParagraph2Text
        }
      ],
      mappaturaCompetitor: analyzed.competitors.map(comp => ({
        name: comp.name,
        coreBusiness: comp.core,
        puntoDebole: comp.weakness
      })),
      targetUserPersonas: analyzed.personas.map(persona => ({
        name: persona.name,
        role: persona.role.toUpperCase(),
        avatar: persona.name ? persona.name.charAt(0) : 'U',
        quote: persona.quote,
        description: persona.description
      }))
    }
  })

  // Update state if the idea changes
  useEffect(() => {
    const analyzed = analyzeIdea(idea)
    setDashboardData({
      ideaDescription: analyzed.sintesi,
      successScore: {
        score: analyzed.score,
        maxScore: 100,
        label: analyzed.score >= 80 ? "Potenziale Elevato" : analyzed.score >= 60 ? "Potenziale Moderato" : "Basso Potenziale"
      },
      verdettoValidazione: {
        status: analyzed.verdict,
        description: "L'analisi algoritmica ha elaborato la fattibilità di esecuzione, i concorrenti di riferimento e le barriere commerciali. Il verdetto indica se l'idea possiede i presupposti per avanzare alla fase operativa."
      },
      analisiDifficolta: [
        {
          id: "01",
          title: analyzed.diffParagraph1Title,
          description: analyzed.diffParagraph1Text
        },
        {
          id: "02",
          title: analyzed.diffParagraph2Title,
          description: analyzed.diffParagraph2Text
        }
      ],
      mappaturaCompetitor: analyzed.competitors.map(comp => ({
        name: comp.name,
        coreBusiness: comp.core,
        puntoDebole: comp.weakness
      })),
      targetUserPersonas: analyzed.personas.map(persona => ({
        name: persona.name,
        role: persona.role.toUpperCase(),
        avatar: persona.name ? persona.name.charAt(0) : 'U',
        quote: persona.quote,
        description: persona.description
      }))
    })
  }, [idea])

  // Speedometer path calculations (radius = 80, path length = Math.PI * 80 = 251.33)
  const r = 80
  const circ = Math.PI * r
  const strokeDashoffset = circ - (dashboardData.successScore.score / 100) * circ

  return (
    <div className="dashboard-container">
      {/* Background Grid */}
      <div className="tech-bg-grid" />

      <main className="dashboard-content">
        {/* Header Section */}
        <header className="dashboard-header">
          <button onClick={() => navigate('/')} className="back-btn">
            <span className="material-symbols-outlined">arrow_back</span>
            Torna alla Home
          </button>
          <div className="text-label-sm" style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>
            Assistente Marketing AI • ID: {Math.floor(Math.random() * 900000) + 100000}
          </div>
        </header>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* 1. Synthesis Card */}
          <section className="bento-card glass-panel card-sintesi">
            <div className="card-title-row">
              <span className="card-indicator" />
              <h2 className="card-title">Sintesi Idea Business</h2>
            </div>
            <p className="sintesi-text">"{dashboardData.ideaDescription}"</p>
          </section>

          {/* 2. Success Score Speedometer Card */}
          <section className="bento-card glass-panel card-score">
            <h2 className="card-title" style={{ marginBottom: '16px' }}>Success Score</h2>
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
                {/* Background arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="var(--surface-container-high)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Active progress arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${circ} ${circ}`}
                  strokeDashoffset={strokeDashoffset}
                  filter="url(#gaugeGlow)"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
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

          {/* 3. Prominent Verdict Card */}
          <section className="bento-card glass-panel card-verdict">
            <div className="verdict-info">
              <h2 className="verdict-title">Verdetto Validazione</h2>
              <p className="verdict-desc">
                {dashboardData.verdettoValidazione.description}
              </p>
            </div>
            <div className={`verdict-badge ${dashboardData.verdettoValidazione.status === 'GO' ? 'verdict-go' : 'verdict-nogo'}`}>
              Verdetto: {dashboardData.verdettoValidazione.status}
            </div>
          </section>

          {/* 4. Difficulty Analysis Card */}
          <section className="bento-card glass-panel card-difficolta">
            <div className="card-title-row">
              <span className="card-indicator" style={{ backgroundColor: 'var(--secondary)' }} />
              <h2 className="card-title" style={{ color: 'var(--secondary)' }}>Analisi Difficoltà</h2>
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

          {/* 5. Competitors Card */}
          <section className="bento-card glass-panel card-competitors">
            <div className="card-title-row">
              <span className="card-indicator" style={{ backgroundColor: 'var(--secondary)' }} />
              <h2 className="card-title" style={{ color: 'var(--secondary)' }}>Mappatura Competitor (Top 3)</h2>
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

          {/* 6. User Personas Title */}
          <div className="personas-title-row">
            <span className="card-indicator" style={{ backgroundColor: 'var(--primary-container)', height: '20px' }} />
            <h2 className="text-headline-md" style={{ color: 'var(--on-surface)', margin: 0 }}>Target User Personas</h2>
          </div>

          {/* 7. User Personas Grid */}
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
