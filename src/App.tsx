  import React from 'react';
  import Home from './pages/home/home';
  import { Login } from './pages/login/login';
  import { RootState } from "./store/store"
  import { Route, Routes, Navigate } from 'react-router-dom';
  import { useSelector } from "react-redux"


  function App() {
    const isAuth = useSelector(
      (state: RootState) => state.isAuthenticated
    )

    return (
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  export default App;
