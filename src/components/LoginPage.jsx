import { useState } from 'react'
import '../styles/LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('--- Dati di Accesso ---')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('-----------------------')
    alert(`Accesso effettuato! Controlla la console per i dettagli.`)
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

          <button type="submit" className="login-btn">
            Accedi
          </button>
        </form>
      </div>
    </div>
  )
}
