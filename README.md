# API RESTful de Videojuegos

Una API RESTful para gestionar videojuegos y desarrolladoras, con autenticación JWT.

## Datos del Proyecto

- **Nombre y Apellido:** Matias Neto
- **Nombre de la materia:** Aplicaciones Híbridas
- **Nombre del docente:** Jonathan Emanuel Cruz
- **Comisión:** DWT4AV

## Características

- Autenticación de usuarios con JWT
- CRUD completo para videojuegos y desarrolladoras
- Filtrado por género, plataforma y búsqueda por título/nombre
- Relaciones entre videojuegos, desarrolladoras y usuarios

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB con Mongoose
- JWT para autenticación
- ES Modules para importación/exportación

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/M4ttux/app-hibridas-parcial01.git
   cd videojuegos-api
   ```

2. Instalar dependencias:
   ```
   npm install bcryptjs cors dotenv express jsonwebtoken mongoose nodemon

   ```

3. Crear archivo .env con las siguientes variables:
   ```
   PORT="Tu puerto"
   MONGODB_URI="Tu URI de MongoDB"
   JWT_SECRET= 'videojuegos_api_secret_key'
   ```

4. Iniciar el servidor:
   ```
   npm run dev
   ```

## Como usar la API

### Primero debe registrar un usuario y luego iniciar sesión

### Para usar la API debe usar el token de autenticación obtenido al iniciar sesión

### Hecho esto, podrá utilizar los endpoints de Desarrolladoras

### Una vez creada una desarrolladora, puede usar los endpoints de Videojuegos, pero debe usar el id de la desarrolladora a la hora de crear un videojuego

## Endpoints de la API

### Usuarios
- `POST /api/usuarios/login` - Iniciar sesión
- `POST /api/usuarios/registro` - Registrar un nuevo usuario
- `GET /api/usuarios/perfil` - Obtener perfil de usuario (requiere autenticación)
- `GET /api/usuarios/` -  Obtener todos los usuarios

### Desarrolladoras
- `POST /api/desarrolladoras` - Crear una nueva desarrolladora (requiere autenticación)
- `PUT /api/desarrolladoras/:id` - Actualizar una desarrolladora (requiere autenticación)
- `DELETE /api/desarrolladoras/:id` - Eliminar una desarrolladora (requiere autenticación)
- `GET /api/desarrolladoras` - Obtener todas las desarrolladoras
- `GET /api/desarrolladoras/:id` - Obtener una desarrolladora por ID
- `GET /api/desarrolladoras?nombre=Nintendo` - Buscar desarrolladoras por nombre
- `GET /api/desarrolladoras?pais=Japón` - Filtrar desarrolladoras por país


### Videojuegos
- `POST /api/videojuegos` - Crear un nuevo videojuego (requiere autenticación)
- `PUT /api/videojuegos/:id` - Actualizar un videojuego (requiere autenticación)
- `DELETE /api/videojuegos/:id` - Eliminar un videojuego (requiere autenticación)
- `GET /api/videojuegos` - Obtener todos los videojuegos
- `GET /api/videojuegos/:id` - Obtener un videojuego por ID
- `GET /api/videojuegos?titulo=Zelda` - Buscar videojuegos por título
- `GET /api/videojuegos?genero=Acción` - Filtrar videojuegos por género
- `GET /api/videojuegos?plataforma=PC` - Filtrar videojuegos por plataforma