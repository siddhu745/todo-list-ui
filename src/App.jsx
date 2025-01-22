import './App.css'
import HomePage from './HomePage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
    </Router>
  )
}

export default App
