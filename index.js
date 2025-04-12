import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Rutas
import videojuegosRoutes from "./src/routes/videojuegos.js";
import desarrolladorasRoutes from "./src/routes/desarrolladoras.js";
import usuariosRoutes from "./src/routes/usuarios.js";

// Configuracion para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

app.use('/api/videojuegos', videojuegosRoutes);
app.use('/api/desarrolladoras', desarrolladorasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Conexion a MongoDB
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión exitosa a MongoDB');
} catch (error) {
  console.error('Error al conectar a MongoDB:', error);
} 

// ruta principal
app.get("/", (req, res) => {
  res.redirect('/public/index.html');
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});