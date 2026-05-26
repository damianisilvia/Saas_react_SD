export default function SintesiCard({ ideaDescription }) {
  return (
    <section className="bento-card glass-panel card-sintesi">
      <div className="card-title-row">
        <span className="card-indicator" />
        <h2 className="card-title">Sintesi Idea Business</h2>
      </div>
      <p className="sintesi-text">"{ideaDescription}"</p>
    </section>
  )
}
