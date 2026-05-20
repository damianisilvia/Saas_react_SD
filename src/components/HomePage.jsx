import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'

export default function HomePage() {
  const [idea, setIdea] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (idea.trim()) {
      navigate('/dashboard', { state: { idea: idea.trim() } })
    }
  }

  return (
    <div className="home-container">
      {/* Background High-Tech Grid Effect */}
      <div className="tech-bg-grid" />
      
      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title">MARKETING AI</h1>
          <p className="home-description">
            Valuta all'istante il potenziale della tua idea di business con l'analisi di mercato guidata dall'intelligenza artificiale.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="home-form">
          <div className="home-textarea-wrapper">
            <textarea
              className="home-textarea"
              placeholder="Inserisci qui la tua idea di business da validare... (es: Un'app per trovare compagni di allenamento in zona)"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="home-btn"
            disabled={!idea.trim()}
          >
            Convalida Progetto
          </button>
        </form>
      </div>
    </div>
  )
}
