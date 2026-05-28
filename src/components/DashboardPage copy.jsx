import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { analyzeIdea } from '../utils/analyzer'
import '../styles/DashboardPage.css'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Idea di fallback se l'utente arriva sulla pagina direttamente senza passare dalla home
  const defaultIdea = "Piattaforma software (SaaS) basata su intelligenza artificiale per l'ottimizzazione automatica delle campagne di marketing sui social media per e-commerce di piccole dimensioni."

  // Recupera l'idea passata dalla pagina precedente (tramite router), altrimenti usa quella di default
  const idea = location.state?.idea || defaultIdea

  /* 
    1. INIZIALIZZAZIONE DELLO STATO (useState)
    Qui viene usata una "lazy initialization" (passando una funzione freccia anziché direttamente l'oggetto).
    In questo modo l'analisi pesante di `analyzeIdea` viene eseguita SOLO al primissimo rendering della pagina.
  */
  const [dashboardData, setDashboardData] = useState(() => {
    // Esegue la funzione che analizza il testo dell'idea di business
    const analyzed = analyzeIdea(idea)

    // Ritorna l'oggetto di stato strutturato ESATTAMENTE come richiesto dal tuo mockup/example.js
    return {
      ideaDescription: analyzed.sintesi,

      successScore: {
        score: analyzed.score,
        maxScore: 100,
        // Operatore ternario concatenato per decidere l'etichetta in base al punteggio
        label: analyzed.score >= 80 ? "Potenziale Elevato" : analyzed.score >= 60 ? "Potenziale Moderato" : "Basso Potenziale"
      },

      verdettoValidazione: {
        status: analyzed.verdict, // es. "GO" o "NO GO"
        description: "L'analisi algoritmica ha elaborato la fattibilità di esecuzione, i concorrenti di riferimento e le barriere commerciali. Il verdetto indica se l'idea possiede i presupposti per avanzare alla fase operativa."
      },

      // Crea un array fisso prendendo i blocchi di testo sparsi restituiti dall'analizzatore
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

      /* 
        Il metodo .map() prende l'array grezzo di competitor (analyzed.competitors) 
        e lo trasforma (mappa) rinominando le proprietà per adattarle alla tua interfaccia.
      */
      mappaturaCompetitor: analyzed.competitors.map(comp => ({
        name: comp.name,
        coreBusiness: comp.core,        // trasforma la proprietà 'core' in 'coreBusiness'
        puntoDebole: comp.weakness      // trasforma 'weakness' in 'puntoDebole'
      })),

      // Stessa cosa qui: trasforma l'array delle personas standardizzando i dati
      targetUserPersonas: analyzed.personas.map(persona => ({
        name: persona.name,
        role: persona.role.toUpperCase(), // Forza il ruolo in MAIUSCOLO
        // Se c'è un nome prende la prima lettera per l'avatar, altrimenti mette 'U' (User)
        avatar: persona.name ? persona.name.charAt(0) : 'U',
        quote: persona.quote,
        description: persona.description
      }))
    }
  })

  /*
    2. AGGIORNAMENTO DLLO STATO (useEffect)
    Questo blocco "ascolta" la variabile `idea`. Se per qualsiasi motivo l'idea cambia 
    (es. l'utente ne analizza una nuova), riesegue l'analisi e aggiorna lo stato.
    I passaggi di trasformazione dei dati qui dentro sono identici a quelli sopra.
  */
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
  }, [idea]) // <- Dependency array: l'effetto scatta solo quando cambia questa variabile

  /*
    3. CALCOLO DINAMICO GRAFICA SVG (Tachimetro)
    Calcola la lunghezza della linea del tachimetro (semicircolo) usando la geometria.
    Poi calcola lo 'strokeDashoffset' per riempire la barra in base al punteggio (0-100).
  */
  const r = 80
  const circ = Math.PI * r // Circonferenza del semicerchio
  const strokeDashoffset = circ - (dashboardData.successScore.score / 100) * circ

  return (
    <div className="dashboard-container">
      <div className="tech-bg-grid" />

      <main className="dashboard-content">
        {/* Pulsante di navigazione indietro */}
        <header className="dashboard-header">
          <button onClick={() => navigate('/')} className="back-btn">
            <span className="material-symbols-outlined">arrow_back</span>
            Torna alla Home
          </button>
          <div className="text-label-sm">
            Assistente Marketing AI • ID: {Math.floor(Math.random() * 900000) + 100000}
          </div>
        </header>

        {/* Layout a Griglia (Bento Grid) */}
        <div className="bento-grid">

          {/* CARD 1: SINTESI IDEA */}
          <section className="bento-card glass-panel card-sintesi">
            <div className="card-title-row">
              <span className="card-indicator" />
              <h2 className="card-title">Sintesi Idea Business</h2>
            </div>
            {/* Mostra la descrizione salvata nello stato */}
            <p className="sintesi-text">"{dashboardData.ideaDescription}"</p>
          </section>

          {/* CARD 2: TACHIMETRO DEL PUNTEGGIO */}
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
                {/* Arco di sfondo grigio */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="var(--surface-container-high)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Arco colorato dinamico: usa lo strokeDashoffset calcolato prima */}
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
              {/* Testo centrale con il voto */}
              <div className="speedometer-score-container">
                <span className="speedometer-score-num">{dashboardData.successScore.score}</span>
                <span className="speedometer-score-max">/{dashboardData.successScore.maxScore}</span>
              </div>
            </div>
            <div className="speedometer-label">
              {dashboardData.successScore.label}
            </div>
          </section>

          {/* CARD 3: ANALISI DIFFICOLTÀ (Ciclo Render) */}
          <section className="bento-card glass-panel card-difficolta">
            <div className="card-title-row">
              <span className="card-indicator card-indicator-secondary" />
              <h2 className="card-title card-title-secondary">Analisi Difficoltà</h2>
            </div>
            <div className="diff-content">
              {/* 
                Prende l'array 'analisiDifficolta' dallo stato e cicla con .map() 
                per generare un blocco HTML/JSX per ogni paragrafo trovato.
              */}
              {dashboardData.analisiDifficolta.map((diff) => (
                <div key={diff.id} className="diff-paragraph">
                  <h3 className="diff-paragraph-title">{diff.id}. {diff.title}</h3>
                  <p className="diff-paragraph-text">{diff.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CARD 4: VERDETTO (GO / NO GO) */}
          <section className="bento-card glass-panel card-verdict">
            <div className="verdict-info">
              <h2 className="verdict-title">Verdetto Validazione</h2>
              <p className="verdict-desc">
                {dashboardData.verdettoValidazione.description}
              </p>
            </div>
            {/* Applica una classe CSS dinamica in base al fatto che sia 'GO' o meno */}
            <div className={`verdict-badge ${dashboardData.verdettoValidazione.status === 'GO' ? 'verdict-go' : 'verdict-nogo'}`}>
              Verdetto: {dashboardData.verdettoValidazione.status}
            </div>
          </section>

          {/* CARD 5: TABELLA DEI COMPETITOR (Ciclo Render) */}
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
                  {/* Cicla sull'array dei competitor inserendo i dati nelle righe (tr) della tabella */}
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

          {/* CARD 6 & 7: GRIGLIA PERSONAS (Ciclo Render) */}
          <div className="personas-grid">
            {/* Cicla sull'array targetUserPersonas e genera una card per ogni utente target */}
            {dashboardData.targetUserPersonas.map((persona, idx) => {
              return (
                <article key={idx} className="bento-card glass-panel glass-panel-hover persona-card">
                  <div className="persona-header">
                    {/* Visualizza l'iniziale della persona dentro il cerchio-avatar */}
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