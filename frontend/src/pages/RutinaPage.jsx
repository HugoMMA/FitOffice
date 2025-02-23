// src/pages/RutinaPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRutinaById } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6">
          Detalle de la Rutina
        </h2>

        <div className="card mb-6">
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
        
        <Link 
          to={`/cliente/${rutina.cliente}`}
          className="mb-5 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 shadow-md inline-block"
        >
          Volver al Detalle del Cliente
        </Link>
      </div>

      {rutina.plan && Array.isArray(rutina.plan) && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Plan de Entrenamiento</h3>
          {rutina.plan.map((week, weekIndex) => (
            <div key={weekIndex} className="mb-8">
              <h4 className="text-xl font-bold text-violet-600 mb-4">
                Semana {week.weekNumber}
              </h4>
              <div className="relative slider-container"> {/* Changed class name */}
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={25}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2.2 }, // Increased to show partial slides
                    1024: { slidesPerView: 3.2 }  // Increased to show partial slides
                  }}
                  className="h-[auto]"
                >
                  {week.days && Object.keys(week.days).map(dayKey => (
                    <SwiperSlide key={dayKey}>
                      <div className="h-full bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20 overflow-y-auto">
                        <h5 className="text-2xl font-bold text-gray-800 mb-4 sticky top-0 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                          {dayKey}
                        </h5>
                        {week.days[dayKey].sessions && week.days[dayKey].sessions.map((session, sIndex) => (
                          <div key={sIndex} className="bg-white/50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                            <div className="font-semibold text-lg text-violet-700 mb-2">
                              {session.name}
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                              <span className="inline-block px-2 py-1 bg-violet-100 rounded-full mr-2">
                                {session.tipo}
                              </span>
                              <span className="inline-block px-2 py-1 bg-blue-100 rounded-full">
                                {session.rondas} rondas
                              </span>
                            </div>
                            {session.exercises && session.exercises.map((exercise, eIndex) => (
                              <div key={eIndex} className="mb-4 p-3 bg-white/70 rounded-lg">
                                <div className="font-medium text-gray-800 mb-2">
                                  {exercise.exercise}
                                </div>
                                <div className="grid gap-2">
                                  {exercise.sets && exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="text-sm grid grid-cols-2 gap-2">
                                      <div className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium">Reps:</span> {set.reps}
                                      </div>
                                      <div className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium">Peso:</span> {set.weight}kg
                                      </div>
                                      <div className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium">Descanso:</span> {set.rest}s
                                      </div>
                                      <div className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium">RPE:</span> {set.rpe}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RutinaPage;