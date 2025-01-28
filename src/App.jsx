import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorPage from './pages/error/ErrorPage'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/error-page' element={<ErrorPage />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
