import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login company="Pedro Marcelino" />} />
        <Route path="/register" element={<Register company="Pedro Marcelino" />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
