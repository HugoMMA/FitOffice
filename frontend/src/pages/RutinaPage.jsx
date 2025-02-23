// src/pages/RutinaPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRutinaById } from '../services/api';

function RutinaPage() {
  const { rutinaId } = useParams();
  const [rutina, setRutina] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRutina = async () => {
      try {
        const data = await getRutinaById(rutinaId);
        setRutina(data);
      } catch (err) {
        console.error(err);
        setError('Error al obtener la rutina.');
      }
    };
    fetchRutina();
  }, [rutinaId]);

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600">{error}</p>
    </div>
  );
  
  if (!rutina) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p className="text-lg text-gray-600">Cargando rutina...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6">
        Detalle de la Rutina
      </h2>

      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2"><span className="font-semibold text-gray-700">Nombre:</span> {rutina.nombre}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Descripción:</span> {rutina.descripcion}</p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Fecha de Inicio:</span>{' '}
              {new Date(rutina.fechaInicio).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="mb-2"><span className="font-semibold text-gray-700">Meta:</span> {rutina.meta}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Tipo:</span> {rutina.tipo}</p>
          </div>
        </div>
      </div>

      {rutina.plan && Array.isArray(rutina.plan) && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Plan de Entrenamiento</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rutina.plan.map((week, index) => (
              <div key={index} className="card">
                <h4 className="text-xl font-bold text-violet-600 mb-4">
                  Semana {week.weekNumber}
                </h4>
                {week.days && Object.keys(week.days).map(dayKey => (
                  <div key={dayKey} className="mb-4">
                    <h5 className="font-bold text-gray-800 mb-2">{dayKey}</h5>
                    {week.days[dayKey].sessions && week.days[dayKey].sessions.map((session, sIndex) => (
                      <div key={sIndex} className="bg-white/50 rounded-lg p-4 mb-3 shadow-sm">
                        <div className="font-semibold text-violet-700">{session.name}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          Tipo: {session.tipo} - Rondas: {session.rondas}
                        </div>
                        {session.exercises && session.exercises.map((exercise, eIndex) => (
                          <div key={eIndex} className="ml-4 mb-2">
                            <div className="font-medium text-gray-700">{exercise.exercise}</div>
                            {exercise.sets && exercise.sets.map((set, setIndex) => (
                              <div key={setIndex} className="ml-4 text-sm text-gray-600">
                                Reps: {set.reps}, Peso: {set.weight}kg, Descanso: {set.rest}s, RPE: {set.rpe}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <Link 
        to={`/cliente/${rutina.cliente}`}
        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md inline-block"
      >
        Volver al Detalle del Cliente
      </Link>
    </div>
  );
}

export default RutinaPage;