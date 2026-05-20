import { NavLink } from 'react-router-dom'
import '../styles/Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout-root">
      {/* Top Bar */}
      <header className="top-bar glass-panel">
        <div className="top-bar-content">
          <div className="top-bar-logo">
            <span className="logo-pulse" />
            <span className="logo-text">MARKETING AI</span>
          </div>
          <nav className="desktop-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Bottom Bar (Mobile Floating Dock) */}
      <nav className="bottom-bar glass-panel">
        <NavLink 
          to="/" 
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="bottom-nav-label">Home</span>
        </NavLink>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="bottom-nav-label">Dashboard</span>
        </NavLink>
      </nav>
    </div>
  )
}
