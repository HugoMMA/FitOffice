// src/pages/ClienteDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getClienteById, getRutinas, generarRutina, eliminarCliente } from '../services/api';

function ClienteDetailPage() {
  const { clienteId } = useParams();
  const [cliente, setCliente] = useState(null);
  const [rutinas, setRutinas] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchClienteAndRutinas = async () => {
    try {
      const dataCliente = await getClienteById(clienteId);
      setCliente(dataCliente);
      const dataRutinas = await getRutinas(clienteId);
      setRutinas(Array.isArray(dataRutinas) ? dataRutinas : []);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los detalles del cliente o sus rutinas.');
    }
  };

  useEffect(() => {
    fetchClienteAndRutinas();
  }, [clienteId]);

  const handleGenerarRutina = async () => {
    try {
      const nuevaRutina = await generarRutina(clienteId);
      setRutinas(prev => [...prev, nuevaRutina]);
    } catch (err) {
      console.error(err);
      setError('Error al generar nueva rutina.');
    }
  };

  const handleEliminarDetail = async () => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await eliminarCliente(cliente._id);
        navigate("/clientes");
      } catch (err) {
        console.error(err);
        setError('Error al eliminar el cliente.');
      }
    }
  };

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600">{error}</p>
    </div>
  );
  
  if (!cliente) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p className="text-lg text-gray-600">Cargando...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Detalle del Cliente
        </h2>
        <div className="flex space-x-3">
          <Link
            to={`/editar-cliente/${cliente._id}`}
            state={{ from: 'detail' }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            Editar
          </Link>
          <button
            onClick={handleEliminarDetail}
            className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><span className="font-semibold text-gray-700">Nombre:</span> {cliente.nombre}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Edad:</span> {cliente.edad} años</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Peso:</span> {cliente.peso} kg</p>
          </div>
          <div>
            <p className="mb-2"><span className="font-semibold text-gray-700">Altura:</span> {cliente.altura} cm</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Objetivo:</span> {cliente.objetivo}</p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Historial:</span> {cliente.historialEntrenamiento ? cliente.historialEntrenamiento.join(', ') : ''}
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-6 mb-4">
        <button onClick={handleGenerarRutina} className="btn-primary">
          Generar Nueva Rutina
        </button>
        <Link 
          to="/clientes" 
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          Volver a Clientes
        </Link>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Rutinas Generadas</h3>
        {rutinas.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-600">No hay rutinas generadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rutinas.map((rutina) => (
              <div
                key={rutina._id}
                onClick={() => navigate(`/rutina/${rutina._id}`)}
                className="card cursor-pointer group"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-violet-600 transition-colors">
                  {rutina.nombre}
                </h4>
                <p className="text-gray-600 mb-2">{rutina.descripcion}</p>
                <p className="text-sm text-gray-500">
                  Inicio: {new Date(rutina.fechaInicio).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
}

export default ClienteDetailPage;