import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { login, signUp, loading, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    
    const trimmedEmail = email.trim()
    
    if (isLoginMode) {
      const { error } = await login(trimmedEmail, password)
      if (error) {
        if (error.message === 'Email not confirmed') {
          setErrorMsg('Questo indirizzo email non è stato ancora confermato. Controlla la tua casella di posta!')
        } else {
          setErrorMsg(error.message || 'Errore durante l\'accesso')
        }
      } else {
        navigate('/dashboard')
      }
    } else {
      const { error } = await signUp(trimmedEmail, password)
      if (error) {
        setErrorMsg(error.message || 'Errore durante la registrazione')
      } else {
        setSuccessMsg('Registrazione completata con successo! Ti abbiamo inviato un\'email di conferma. Clicca sul link all\'interno per attivare il tuo account prima di accedere.')
        setIsLoginMode(true)
        setEmail('')
        setPassword('')
      }
    }
  }


  return (
    <div className="login-container">
      {/* Background High-Tech Grid Effect */}
      <div className="tech-bg-grid" />

      <div className="login-content">
        <header className="login-header">
          <h1 className="login-title">{isLoginMode ? 'LOGIN' : 'REGISTRATI'}</h1>
          <p className="login-description">
            {isLoginMode 
              ? 'Accedi per gestire i tuoi progetti di marketing AI.' 
              : 'Crea un nuovo account per iniziare.'}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field-group">
            <label className="login-label" htmlFor="email-input">
              Indirizzo Email
            </label>
            <div className="login-input-wrapper">
              <input
                id="email-input"
                type="email"
                className="login-input"
                placeholder="nome@azienda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-field-group">
            <label className="login-label" htmlFor="password-input">
              Password
            </label>
            <div className="login-input-wrapper">
              <input
                id="password-input"
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {errorMsg && <p className="login-error-message" style={{ color: '#ff4d4f', marginTop: '10px' }}>{errorMsg}</p>}
          {successMsg && <p className="login-success-message" style={{ color: '#00ff88', marginTop: '10px', lineHeight: '1.4' }}>{successMsg}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {isLoginMode 
              ? (loading ? 'Accesso in corso...' : 'Accedi') 
              : (loading ? 'Registrazione in corso...' : 'Registrati')}
          </button>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <span style={{ color: '#aaa' }}>
              {isLoginMode ? "Non hai un account? " : "Hai già un account? "}
            </span>
            <button 
              type="button" 
              onClick={() => {
                setIsLoginMode(!isLoginMode)
                setErrorMsg('')
                setSuccessMsg('')
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#00f0ff', 
                cursor: 'pointer', 
                textDecoration: 'underline',
                padding: 0,
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            >
              {isLoginMode ? 'Registrati' : 'Accedi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
