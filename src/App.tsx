import Home from './pages/home/home'
import { Login } from './pages/login/login'
import Admin from './pages/admin/admin'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Register } from './pages/register/register'
import { PageError }from './pages/404/404'

function App() {
  return (
    <>
    <Routes>
      <Route
        path="/home"
        element={<Home />}
      />
      
      <Route
        path="/login"
        element={<Login />}
      />
            
      <Route
        path="/admin"
        element={<Admin />}
      />

      <Route
        path="/register"
        element={<Register />}
      />      
      
      <Route
        path="/404"
        element={<PageError />}
      />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>    
    </>
  )
}

export default App
