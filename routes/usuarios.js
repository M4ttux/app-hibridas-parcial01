import express from "express";
import { registrar, login, obtenerPerfil } from "../controllers/usuarioController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Rutas publicas
router.post("/registro", registrar);
router.post("/login", login);

// Rutas privadas
router.get("/perfil", auth, obtenerPerfil);

export default router;
