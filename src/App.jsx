import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import DashboardPage from './components/DashboardPage'
import NotFoundPage from './components/NotFoundPage'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
