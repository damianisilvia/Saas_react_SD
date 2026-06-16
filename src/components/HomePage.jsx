import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIdea } from '../context/ideaContext'
import { analyzeIdeaWithAI } from '../services/openaiService'
import LogoutButton from './LogoutButton'
import '../styles/HomePage.css'

export default function HomePage() {
  const [localIdea, setLocalIdea] = useState('')
  const { setIdea, setIsLoading, setAnalyzedData } = useIdea()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmed = localIdea.trim()

    if (trimmed) {
      setIsLoading(true) 
      setIdea(trimmed)   

      try {
        const result = await analyzeIdeaWithAI(trimmed)
        setAnalyzedData(result)
        navigate('/dashboard', { state: { idea: trimmed } })
      } catch (error) {
        console.error("Errore durante l'analisi AI:", error)
        
        // Controlla se l'errore è dovuto ai server sovraccarichi
        if (error.message === "SERVICE_UNAVAILABLE") {
          alert("I server di Gemini sono momentaneamente carichi, per favore riprova tra qualche secondo.");
        } else {
          // Errore generico o inatteso
          alert("Si è verificato un errore durante l'analisi dell'idea. Verifica i tuoi dati e riprova.");
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
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
              value={localIdea}
              onChange={(e) => setLocalIdea(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="home-btn"
            disabled={!localIdea.trim()}
          >
            Convalida Progetto
          </button>
        </form>

        <LogoutButton variant="secondary" />
      </div>
    </div>
  )
}
