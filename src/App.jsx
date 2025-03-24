import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Password from './pages/Password/Password';
import ChangePassword from './pages/Password/ChangePassword';
import InsertCode from './pages/Password/InsertCode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login company="Pedro Marcelino" />} />
        <Route path="/register" element={<Register company="Pedro Marcelino" />} />
        <Route path="/password" element={<Password />} />
        <Route path="/password/insertcode" element={<InsertCode />} />
        <Route path="/password/changepassword" element={<ChangePassword />} />
        <Route path="/" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
