const { Configuration, OpenAI } = require("openai");
const Rutina = require('../models/Rutina');
const Cliente = require('../models/Cliente');


const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

// Generar una rutina basada en IA
exports.generarRutina = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.clienteId);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    // Construir el prompt para OpenAI
    const prompt = `Genera un plan de entrenamiento semanal para un cliente con las siguientes características:

      Edad: ${cliente.edad}
      Peso: ${cliente.peso} kg
      Altura: ${cliente.altura} cm
      Objetivo: ${cliente.objetivo}
      Historial de entrenamiento: ${cliente.historialEntrenamiento.join(', ') || "Ninguno"}

      Estructura requerida:
        Incluir 7 días de entrenamiento con estructura idéntica al ejemplo adjunto
        Cada día debe contener:
          _id único en formato MongoDB ObjectId
          Sesiones con estructura detallada de ejercicios
          Sets con parámetros completos (reps, peso, descanso, RPE)
          renderConfig específico para cada tipo de ejercicio
        Las notas deben incluir _id y seguir el formato del ejemplo
        Asegúrate que el campo "tipo" solo coja uno de estos valores: ["Hipertrofia", "Fuerza", "Resistencia", "Otro"]. Cualquier otro valor para "tipo" es erróneo.

      Ejemplo de OUTPUT JSON a seguir:
      {
        "nombre": "Plan de Entrenamiento Semanal Completo",
        "descripcion": "Plan de entrenamiento que cubre los 7 días de la semana con diferentes grupos musculares",
        "fechaInicio": "2025-02-11T00:00:00.000Z",
        "meta": "Entrenamiento completo para todo el cuerpo",
        "semanas": 12,
        "tipo": "Hipertrofia",
        "plan": [
          {
            "_id": "65123456789abcdef12345680",
            "weekNumber": 1,
            "startDate": "2025-02-11T00:00:00.000Z",
            "days": {
              "Lunes": {
                "_id": "65123456789abcdef12345681",
                "day": "Lunes",
                "fecha": "2025-02-11T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345682",
                    "name": "Pecho y Tríceps",
                    "tipo": "Normal",
                    "rondas": 4,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345683",
                        "sets": [
                          {
                            "reps": 12,
                            "weight": 60,
                            "rest": 90,
                            "rpe": 8,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "reps",
                              "campo2": "weight",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Martes": {
                "_id": "65123456789abcdef12345684",
                "day": "Martes",
                "fecha": "2025-02-12T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345685",
                    "name": "Espalda y Bíceps",
                    "tipo": "Normal",
                    "rondas": 4,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345686",
                        "sets": [
                          {
                            "reps": 10,
                            "weight": 70,
                            "rest": 120,
                            "rpe": 7,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "reps",
                              "campo2": "weight",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Miércoles": {
                "_id": "65123456789abcdef12345687",
                "day": "Miércoles",
                "fecha": "2025-02-13T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345688",
                    "name": "Piernas",
                    "tipo": "Normal",
                    "rondas": 4,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345689",
                        "sets": [
                          {
                            "reps": 8,
                            "weight": 100,
                            "rest": 180,
                            "rpe": 9,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "reps",
                              "campo2": "weight",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Jueves": {
                "_id": "65123456789abcdef12345690",
                "day": "Jueves",
                "fecha": "2025-02-14T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345691",
                    "name": "Hombros y Abdominales",
                    "tipo": "Normal",
                    "rondas": 4,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345692",
                        "sets": [
                          {
                            "reps": 15,
                            "weight": 40,
                            "rest": 60,
                            "rpe": 7,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "reps",
                              "campo2": "weight",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Viernes": {
                "_id": "65123456789abcdef12345693",
                "day": "Viernes",
                "fecha": "2025-02-15T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345694",
                    "name": "Full Body",
                    "tipo": "Normal",
                    "rondas": 3,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345695",
                        "sets": [
                          {
                            "reps": 12,
                            "weight": 50,
                            "rest": 90,
                            "rpe": 8,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "reps",
                              "campo2": "weight",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Sábado": {
                "_id": "65123456789abcdef12345696",
                "day": "Sábado",
                "fecha": "2025-02-16T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345697",
                    "name": "Cardio y HIIT",
                    "tipo": "Normal",
                    "rondas": 5,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345698",
                        "sets": [
                          {
                            "distance": 1000,
                            "calories": 150,
                            "rest": 60,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "distance",
                              "campo2": "calories",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "Domingo": {
                "_id": "65123456789abcdef12345699",
                "day": "Domingo",
                "fecha": "2025-02-17T00:00:00.000Z",
                "sessions": [
                  {
                    "_id": "65123456789abcdef12345700",
                    "name": "Movilidad y Recuperación",
                    "tipo": "Normal",
                    "rondas": 2,
                    "exercises": [
                      {
                        "exercise": "65123456789abcdef12345701",
                        "sets": [
                          {
                            "reps": 10,
                            "tempo": "4-2-4",
                            "rest": 30,
                            "completed": false,
                            "renderConfig": {
                              "campo1": "reps",
                              "campo2": "tempo",
                              "campo3": "rest"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          }
        ],
        "notas": [
          {
            "_id": "65123456789abcdef12345702",
            "titulo": "Recomendaciones generales",
            "contenido": "Mantener una buena hidratación durante todos los entrenamientos. Realizar calentamiento previo de 10 minutos.",
            "fecha": "2025-02-11T00:00:00.000Z",
            "importante": true
          }
        ]
      }

      Responde en formato JSON siguiendo EXCLUSIVAMENTE el esquema del ejemplo.
        Mantén la misma profundidad de objetos anidados
        Usa fechas coherentes con fechaInicio
        Genera _id válidos en formato ObjectId
        Incluye todos los campos mostrados en el ejemplo
      Devuelve SOLO el JSON sin comentarios ni caracteres adicionales. Responde exclusivamente con un JSON que comience y acabe con "{" y "}" respectivamente, igual que en el ejemplo proporcionado. No añadas caracteres antes o despues de la respuesta JSON`;
    console.log("Prompt construido");
    // Realizar la llamada 
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{role: "system", content: "Eres el mejor entrenador de gimnasio del mundo. Eres famoso por generar planes específicos y adaptados según las características e intereses del cliente."},
        { role: "user", content: prompt}],
      max_tokens: 4000,
      temperature: 1
    });
    console.log("Mensaje mandado a la IA");
    console.log(response.choices[0].message.content);


    // Obtener y verificar el contenido de la respuesta
    const rawContent = response.choices[0].message.content;
    if (!rawContent) {
      throw new Error("La respuesta de DeepSeek está vacía.");
    }
    const startIndex = rawContent.indexOf('{');
    const endIndex = rawContent.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("La respuesta no contiene un objeto JSON válido.");
    }
    const jsonString = rawContent.substring(startIndex, endIndex + 1);
    let rutinaGenerada;
    try {
      rutinaGenerada = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Error al parsear JSON. Contenido extraído:", response.choices[0].message.content);
      throw new Error("No se pudo interpretar la respuesta como JSON válido.");
    }
    console.log("Datos obtenidos de la IA");

    const existingCount = await Rutina.countDocuments({ cliente: cliente._id });
    const tipo = rutinaGenerada.tipo || "Desconocido";
    rutinaGenerada.nombre = `Rutina ${existingCount + 1} - ${tipo}`;

    // Guardar la rutina en la base de datos
    const nuevaRutina = new Rutina({
        cliente: cliente._id,
        ...rutinaGenerada
    });
    console.log("Rutina creada");
    await nuevaRutina.save();
    res.status(201).json(nuevaRutina);
    console.log("Rutina guardada");
  } catch (error) {
    console.error('Error en la solicitud a DeepSeek:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las rutinas de un cliente
exports.obtenerRutinas = async (req, res) => {
  try {
    const rutinas = await Rutina.find({ cliente: req.params.clienteId });
    return res.status(200).json(rutinas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Obtener el detalle de una rutina
exports.obtenerRutinaDetalle = async (req, res) => {
  try {
    const { rutinaId } = req.params;
    const rutina = await Rutina.findById(rutinaId);
    if (!rutina) return res.status(404).json({ message: 'Rutina no encontrada' });
    return res.status(200).json(rutina);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};