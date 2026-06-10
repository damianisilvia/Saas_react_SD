import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    
    console.log('--- Dati di Accesso ---')
    console.log('Email:', email)
    console.log('-----------------------')
    
    const { data, error } = await login(email, password)
    
    if (error) {
      setErrorMsg(error.message || 'Errore durante l\'accesso')
    } else {
      alert(`Accesso effettuato con successo!`)
      navigate('/dashboard')
    }
  }


  return (
    <div className="login-container">
      {/* Background High-Tech Grid Effect */}
      <div className="tech-bg-grid" />

      <div className="login-content">
        <header className="login-header">
          <h1 className="login-title">LOGIN</h1>
          <p className="login-description">
            Accedi per gestire i tuoi progetti di marketing AI.
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

          {errorMsg && <p className="login-error-message" style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}
