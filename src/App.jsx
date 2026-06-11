import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import DashboardPage from './components/DashboardPage'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import Layout from './components/Layout'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectedRoute'
import { IdeaProvider, useIdea } from './context/ideaContext'
import { AuthProvider } from './context/AuthContext'

function AppContent() {
  const { isLoading } = useIdea()

  return (
    <>
      {isLoading && <Loader />}
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <IdeaProvider>
        <AppContent />
      </IdeaProvider>
    </AuthProvider>
  )
}

export default App



