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
    const systemPrompt = `Genera un plan de entrenamiento semanal totalmente personalizado para un cliente, adaptando la selección de ejercicios, la frecuencia y la intensidad al objetivo específico del cliente. La rutina debe ser única y reflejar las siguientes características del cliente:

-Edad
-Peso
-Altura
-Objetivo
-Historial de entrenamiento

Ten en cuenta lo siguiente:
1. El plan debe adaptarse al objetivo del cliente, modificando la elección de ejercicios, la frecuencia de entrenamiento y la intensidad.
2. El campo "tipo" solo debe tomar uno de estos valores: ["Hipertrofia", "Fuerza", "Resistencia", "Otro"]. Cualquier otro valor es erróneo.
3. La respuesta debe ser siempre en formato JSON EXACTO, sin caracteres adicionales antes o después, y debe seguir la misma estructura que se muestra en el ejemplo de OUTPUT JSON a continuación.

Estructura requerida (OUTPUT JSON):

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
        "Martes": { ... },
        "Miércoles": { ... },
        "Jueves": { ... },
        "Viernes": { ... },
        "Sábado": { ... },
        "Domingo": { ... }
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

Devuelve SOLO el JSON sin comentarios ni caracteres adicionales, asegurándote de que el JSON comience con "{" y termine con "}".
`;
    const prompt = `Genera un plan de entrenamiento semanal para un cliente con las siguientes características:

      Edad: ${cliente.edad}
      Peso: ${cliente.peso} kg
      Altura: ${cliente.altura} cm
      Objetivo: ${cliente.objetivo}
      Historial de entrenamiento: ${cliente.historialEntrenamiento.join(', ') || "Ninguno"}`;
    console.log("Prompt construido");
    // Realizar la llamada 
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{role: "system", content: systemPrompt},
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