import express from "express";
import { 
    getDesarrolladoras,
    getDesarrolladoraById,
    createDesarrolladora,
    updateDesarrolladora,
    deleteDesarrolladora,
    getDesarrolladoraByNombre,
    getDesarrolladorasByPais,
} from "../controllers/desarrolladoraController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getDesarrolladoras);
router.get("/:id", getDesarrolladoraById);
router.post("/", auth, createDesarrolladora);
router.put("/:id", auth, updateDesarrolladora);
router.delete("/:id", auth, deleteDesarrolladora);

router.get("/nombre/:nombre", getDesarrolladoraByNombre);
router.get("/pais/:pais", getDesarrolladorasByPais);


export default router;