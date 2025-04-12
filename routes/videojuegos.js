import express from "express";
import {
    getVideojuegos,
    getVideojuegoById,
    createVideojuego,
    updateVideojuego,
    deleteVideojuego,
    getVideojuegoByTitulo

} from "../controllers/videojuegoController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();


router.get("/", getVideojuegos);
router.get("/:id", getVideojuegoById);
router.post("/", auth, createVideojuego);
router.put("/:id", auth, updateVideojuego);
router.delete("/:id", auth, deleteVideojuego);

router.get("/titulo/:titulo", getVideojuegoByTitulo);

router

export default router;