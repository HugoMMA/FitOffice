# FitOffice - Gestión de Clientes y Rutinas de Entrenamiento

## Descripción
FitOffice es una aplicación web para la gestión de clientes de entrenamiento y generación automática de rutinas personalizadas utilizando IA. La aplicación permite a los entrenadores mantener un registro de sus clientes y generar rutinas de entrenamiento adaptadas a sus necesidades específicas.

## Estructura del Proyecto

```
ProyectoInicial/
├── backend/
│   ├── controllers/
│   │   ├── clienteController.js    # Lógica de gestión de clientes
│   │   └── rutinaController.js     # Lógica de generación y gestión de rutinas
│   ├── models/
│   │   ├── Cliente.js              # Modelo de datos para clientes
│   │   └── Rutina.js              # Modelo de datos para rutinas
│   └── server.js                   # Configuración del servidor
└── frontend/
    └── src/
        ├── components/             # Componentes React reutilizables
        ├── pages/                  # Páginas principales de la aplicación
        └── services/              # Servicios de API
```

## Funcionalidades Principales

### Backend

#### Gestión de Clientes
- Crear nuevos clientes
- Listar todos los clientes
- Ver detalles de un cliente específico
- Actualizar información de clientes
- Eliminar clientes (incluye eliminación en cascada de sus rutinas)

#### Gestión de Rutinas
- Generación automática de rutinas usando IA (DeepSeek)
- Obtener todas las rutinas de un cliente
- Ver detalles específicos de una rutina
- Las rutinas incluyen:
  - Plan semanal detallado
  - Ejercicios específicos
  - Notas y recomendaciones
  - Configuración de sets y repeticiones

### Frontend

#### Páginas Principales
- **HomePage**: Página de bienvenida con navegación principal
- **ClientesPage**: Gestión completa de clientes
  - Formulario de creación
  - Lista de clientes
  - Opciones de edición y eliminación
  - Interfaz responsive

#### Características de la UI
- Diseño moderno con Tailwind CSS
- Animaciones y transiciones suaves
- Interfaz intuitiva y fácil de usar
- Feedback visual para acciones del usuario

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- DeepSeek AI API para generación de rutinas

### Frontend
- React
- React Router para navegación
- Tailwind CSS para estilos
- Axios para peticiones HTTP

## Características de Seguridad
- Validación de datos en backend y frontend
- Manejo de errores robusto
- Confirmación para acciones destructivas
- Sanitización de inputs

## Integración con IA
- Generación automática de rutinas personalizadas
- Consideración de:
  - Características físicas del cliente
  - Objetivos de entrenamiento
  - Historial de ejercicio
  - Restricciones específicas

## Instalación y Uso

1. Clonar el repositorio
2. Instalar dependencias:
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Configurar variables de entorno:
```env
MONGODB_URI=tu_uri_de_mongodb
DEEPSEEK_API_KEY=tu_api_key
```
La variable PORT default del backend es 5000.
Para no complicarlo más, en el frontend está configurado a mano en api.js la conexión directa a:
```env
PORT = 5000; 
```

```env
const API_BASE_URL = "http://localhost:5000"; 
```

4. Iniciar el proyecto:
```bash
# Backend
cd backend && node .\server.js

# Frontend
cd frontend && npm run dev
```

