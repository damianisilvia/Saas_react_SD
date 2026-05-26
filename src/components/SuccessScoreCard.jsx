export default function SuccessScoreCard({ successScore }) {
  const r = 80
  const circ = Math.PI * r
  const strokeDashoffset = circ - (successScore.score / 100) * circ

  return (
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
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--surface-container-high)"
            strokeWidth="12"
            strokeLinecap="round"
          />
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
          <span className="speedometer-score-num">{successScore.score}</span>
          <span className="speedometer-score-max">/{successScore.maxScore}</span>
        </div>
      </div>
      <div className="speedometer-label">
        {successScore.label}
      </div>
    </section>
  )
}
