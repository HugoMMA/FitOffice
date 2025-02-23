// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import ClienteDetailPage from './pages/ClienteDetailPage';
import RutinaPage from './pages/RutinaPage';
import EditClientePage from './pages/EditClientePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-indigo-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/cliente/:clienteId" element={<ClienteDetailPage />} />
            <Route path="/rutina/:rutinaId" element={<RutinaPage />} />
            <Route path="/editar-cliente/:clienteId" element={<EditClientePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
