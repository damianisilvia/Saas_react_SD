import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/LogoutButton.css'

/**
 * LogoutButton — Bottone di logout riutilizzabile.
 * Varianti:
 *   - "secondary" (default): bordo Cyan, testo Cyan (stile bottone secondario da DESIGN.md)
 *   - "nav":     compatto per la navbar desktop
 *   - "nav-mobile": icona + label per la bottom bar mobile
 */
export default function LogoutButton({ variant = 'secondary' }) {
  const { logout, user, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // Non mostrare se l'utente non è autenticato
  if (!user) return null

  if (variant === 'nav-mobile') {
    return (
      <button
        id="logout-btn-mobile"
        className="bottom-nav-item logout-nav-mobile"
        onClick={handleLogout}
        disabled={loading}
        aria-label="Logout"
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="bottom-nav-label">Logout</span>
      </button>
    )
  }

  if (variant === 'nav') {
    return (
      <button
        id="logout-btn-nav"
        className="nav-link logout-nav-btn"
        onClick={handleLogout}
        disabled={loading}
        aria-label="Logout"
      >
        {loading ? 'Uscita…' : 'Logout'}
      </button>
    )
  }

  // Default: secondary variant
  return (
    <button
      id="logout-btn"
      className="logout-btn"
      onClick={handleLogout}
      disabled={loading}
    >
      <span className="material-symbols-outlined logout-btn-icon">logout</span>
      {loading ? 'Uscita in corso…' : 'Esci dall\'account'}
    </button>
  )
}
