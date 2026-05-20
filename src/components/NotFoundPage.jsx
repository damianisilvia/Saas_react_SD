import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/NotFoundPage.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Set document title for SEO and UX
    document.title = '404 - Pagina Non Trovata | Marketing AI'
    
    // Add meta description dynamically for SEO best practices
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    
    if (metaDesc) {
      metaDesc.setAttribute('content', 'La risorsa cercata non è disponibile o è stata spostata all\'interno del sistema di analisi di Marketing AI.')
    }

    return () => {
      // Restore original description if any
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc)
      }
    }
  }, [])

  return (
    <div className="notfound-container">
      {/* Background High-Tech Grid Effect */}
      <div className="tech-bg-grid" />
      
      {/* Laser scanner animation */}
      <div className="notfound-scanline" />

      <div className="notfound-content">
        {/* Technical Corner Markers */}
        <div className="notfound-corner notfound-corner-tl" />
        <div className="notfound-corner notfound-corner-tr" />
        <div className="notfound-corner notfound-corner-bl" />
        <div className="notfound-corner notfound-corner-br" />

        <header className="notfound-header">
          <div className="notfound-code">404</div>
          <span className="notfound-subtext">Errore di Sistema / File Non Trovato</span>
        </header>

        <h1 className="notfound-title">Rotta Inesistente</h1>
        
        <p className="notfound-desc">
          La destinazione cercata non esiste o è stata spostata dal server centrale di Marketing AI. 
          Verifica l'indirizzo inserito o torna alla console principale.
        </p>

        <div className="notfound-actions">
          <button 
            onClick={() => navigate('/')} 
            className="notfound-btn notfound-btn-primary"
            id="btn-notfound-home"
          >
            <span className="material-symbols-outlined">home</span>
            Torna alla Home
          </button>
          
          <Link 
            to="/dashboard" 
            className="notfound-btn notfound-btn-secondary"
            id="btn-notfound-dashboard"
          >
            <span className="material-symbols-outlined">analytics</span>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
