export default function DifficoltaCard({ analisiDifficolta }) {
  return (
    <section className="bento-card glass-panel card-difficolta">
      <div className="card-title-row">
        <span className="card-indicator" style={{ backgroundColor: 'var(--secondary)' }} />
        <h2 className="card-title" style={{ color: 'var(--secondary)' }}>Analisi Difficoltà</h2>
      </div>
      <div className="diff-content">
        {analisiDifficolta.map((diff) => (
          <div key={diff.id} className="diff-paragraph">
            <h3 className="diff-paragraph-title">{diff.id}. {diff.title}</h3>
            <p className="diff-paragraph-text">{diff.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
