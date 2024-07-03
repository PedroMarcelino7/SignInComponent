import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MainPage from './pages/Main/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login company="Pedro Marcelino" />} />
        <Route path="/register" element={<Register company="Pedro Marcelino" />} />
      </Routes>
    </Router>
  );
}

export default App;
