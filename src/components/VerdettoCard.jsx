export default function VerdettoCard({ verdettoValidazione }) {
  return (
    <section className="bento-card glass-panel card-verdict">
      <div className="verdict-info">
        <h2 className="verdict-title">Verdetto Validazione</h2>
        <p className="verdict-desc">
          {verdettoValidazione.description}
        </p>
      </div>
      <div className={`verdict-badge ${verdettoValidazione.status === 'GO' ? 'verdict-go' : 'verdict-nogo'}`}>
        Verdetto: {verdettoValidazione.status}
      </div>
    </section>
  )
}
