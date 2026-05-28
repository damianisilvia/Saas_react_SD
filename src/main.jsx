import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IdeaProvider } from './context/ideaContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IdeaProvider>
      <App />
    </IdeaProvider>
  </StrictMode>,
)
