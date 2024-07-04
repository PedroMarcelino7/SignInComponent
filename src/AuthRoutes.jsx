import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import Login from './pages/Login/Login';

function AuthRoutes() {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  return (
    <Routes>
      <Route path="/" element={authToken ? <MainPage /> : <Login company="Pedro Marcelino" />} />
    </Routes>
  );
}

export default AuthRoutes;