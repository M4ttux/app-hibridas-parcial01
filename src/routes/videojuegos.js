import express from "express";
import { getVideojuegos, getVideojuegoById, createVideojuego, updateVideojuego, deleteVideojuego } from "../controllers/videojuegoController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getVideojuegos);
router.get("/:id", getVideojuegoById);
router.post("/", auth, createVideojuego);
router.put("/:id", auth, updateVideojuego);
router.delete("/:id", auth, deleteVideojuego);


router

export default router;