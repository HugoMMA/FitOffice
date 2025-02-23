// src/pages/ClientesPage.jsx
import { useEffect, useState } from 'react';
import { getClientes, createCliente, eliminarCliente } from '../services/api';
import { Link } from 'react-router-dom';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    edad: '',
    peso: '',
    altura: '',
    objetivo: '',
    historialEntrenamiento: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      setError('Error al obtener los clientes.');
    }
  };

  const handleInputChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const edad = parseInt(nuevoCliente.edad, 10);
    const peso = parseFloat(nuevoCliente.peso);
    const altura = parseFloat(nuevoCliente.altura);
    if (isNaN(edad) || isNaN(peso) || isNaN(altura)) {
      setError('Por favor, ingresa valores numéricos válidos para edad, peso y altura.');
      return;
    }
    try {
      const clienteData = {
        ...nuevoCliente,
        edad,
        peso,
        altura,
        historialEntrenamiento: nuevoCliente.historialEntrenamiento
          ? nuevoCliente.historialEntrenamiento.split(',').map(s => s.trim())
          : []
      };
      const creado = await createCliente(clienteData);
      setClientes([...clientes, creado]);
      setNuevoCliente({ nombre: '', edad: '', peso: '', altura: '', objetivo: '', historialEntrenamiento: '' });
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al crear el cliente.');
    }
  };

  // Función para eliminar cliente
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await eliminarCliente(id);
        setClientes(clientes.filter(c => c._id !== id));
      } catch (err) {
        setError("Error al eliminar el cliente.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-8">
        Clientes
      </h2>
      {error && <p className="text-red-600 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
      
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Agregar Nuevo Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoCliente.nombre}
              onChange={handleInputChange}
              className="p-2.5 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              required
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={nuevoCliente.edad}
              onChange={handleInputChange}
              className="p-2.5 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              required
            />
            <input
              type="number"
              name="peso"
              placeholder="Peso (kg)"
              value={nuevoCliente.peso}
              onChange={handleInputChange}
              className="p-2.5 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              required
            />
            <input
              type="number"
              name="altura"
              placeholder="Altura (cm)"
              value={nuevoCliente.altura}
              onChange={handleInputChange}
              className="p-2.5 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              required
            />
            <select
              name="objetivo"
              value={nuevoCliente.objetivo}
              onChange={handleInputChange}
              className="p-2.5 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              required
            >
              <option value="">Selecciona un objetivo</option>
              <option value="Pérdida de peso">Pérdida de peso</option>
              <option value="Ganancia muscular">Ganancia muscular</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Otro">Otro</option>
            </select>
            <input
              type="text"
              name="historialEntrenamiento"
              placeholder="Historial (separado por comas)"
              value={nuevoCliente.historialEntrenamiento}
              onChange={handleInputChange}
              className="p-2.5 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 btn-primary"
          >
            Agregar Cliente
          </button>
        </form>
      </div>

      <div className="animate-slide-up">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Lista de Clientes</h3>
        {clientes.length === 0 ? (
          <p className="text-gray-600 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow">No hay clientes registrados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientes.map((cliente) => (
              <div
                key={cliente._id}
                className="relative group bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <h4 className="font-bold text-xl text-gray-800 mb-2">{cliente.nombre}</h4>
                  <p className="text-gray-600 mb-4">Objetivo: {cliente.objetivo}</p>
                  <Link 
                    to={`/cliente/${cliente._id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Ver Detalles →
                  </Link>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Link
                    to={`/editar-cliente/${cliente._id}`}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(cliente._id)}
                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientesPage;
