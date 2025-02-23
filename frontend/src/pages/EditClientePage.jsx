// src/pages/EditClientePage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getClienteById, actualizarCliente } from '../services/api';

function EditClientePage() {
  const { clienteId } = useParams();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await getClienteById(clienteId);
        setCliente(data);
      } catch (err) {
        setError('Error al obtener el cliente.');
      }
    };
    fetchCliente();
  }, [clienteId]);

  const handleInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarCliente(clienteId, cliente);
      navigate(`/cliente/${clienteId}`);
    } catch (err) {
      setError('Error al actualizar el cliente.');
    }
  };

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600">{error}</p>
    </div>
  );
  
  if (!cliente) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p className="text-lg text-gray-600">Cargando cliente...</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6">
        Editar Cliente
      </h2>
      
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleInputChange}
              className="input-primary w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad:
            </label>
            <input
              type="number"
              name="edad"
              value={cliente.edad}
              onChange={handleInputChange}
              className="input-primary w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peso:
            </label>
            <input
              type="number"
              name="peso"
              value={cliente.peso}
              onChange={handleInputChange}
              className="input-primary w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Altura:
            </label>
            <input
              type="number"
              name="altura"
              value={cliente.altura}
              onChange={handleInputChange}
              className="input-primary w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objetivo:
          </label>
          <select
            name="objetivo"
            value={cliente.objetivo}
            onChange={handleInputChange}
            className="input-primary w-full"
            required
          >
            <option value="">Selecciona un objetivo</option>
            <option value="Pérdida de peso">Pérdida de peso</option>
            <option value="Ganancia muscular">Ganancia muscular</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Historial:
          </label>
          <input
            type="text"
            name="historialEntrenamiento"
            value={cliente.historialEntrenamiento ? cliente.historialEntrenamiento.join(', ') : ''}
            onChange={handleInputChange}
            className="input-primary w-full"
            placeholder="Separar elementos por comas"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button type="submit" className="btn-primary">
            Guardar Cambios
          </button>
          <Link 
            to={`/cliente/${clienteId}`}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditClientePage;