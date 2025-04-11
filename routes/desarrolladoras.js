import express from "express";
import { 
    getDesarrolladoras,
    getDesarrolladoraById,
    createDesarrolladora,
    updateDesarrolladora,
    deleteDesarrolladora
} from "../controllers/desarrolladoraController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Rutas publicas
router.get("/", getDesarrolladoras);
router.get("/:id", getDesarrolladoraById);

// Rutas privadas
router.post("/", auth, createDesarrolladora);
router.put("/:id", auth, updateDesarrolladora);
router.delete("/:id", auth, deleteDesarrolladora);

export default router;