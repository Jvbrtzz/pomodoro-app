import Home from './pages/home/home'
import { Login } from './pages/login/login'
import { Route, Routes, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route
        path="/home"
        element={<Home />}
      />
      
      <Route
        path="/login"
        element={<Login />}
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
