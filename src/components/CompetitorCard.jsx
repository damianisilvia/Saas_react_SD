export default function CompetitorCard({ mappaturaCompetitor }) {
  return (
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
            {mappaturaCompetitor.map((comp, idx) => (
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
  )
}
