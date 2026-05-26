export default function TargetUserPersonas({ targetUserPersonas }) {
  return (
    <>
      <div className="personas-title-row">
        <span className="card-indicator" style={{ backgroundColor: 'var(--primary-container)', height: '20px' }} />
        <h2 className="text-headline-md" style={{ color: 'var(--on-surface)', margin: 0 }}>Target User Personas</h2>
      </div>

      <div className="personas-grid">
        {targetUserPersonas.map((persona, idx) => (
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
        ))}
      </div>
    </>
  )
}
