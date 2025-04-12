import express from "express";
import { login, obtenerPerfil, getUsuarios, registrarUsuario } from "../controllers/usuarioController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getUsuarios);
router.post("/login", login);
router.post("/registro", registrarUsuario);
router.get("/perfil", auth, obtenerPerfil);

export default router;
