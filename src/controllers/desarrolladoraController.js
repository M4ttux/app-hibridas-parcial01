import Desarrolladora from "../models/Desarrolladora.js";
import { normalizeString } from "../utils/stringUtils.js";

//obtener todas las desarrolladoras
export const getDesarrolladoras = async (req, res) => {
    try {
        const { nombre , pais } = req.query;

        const desarrolladoras = await Desarrolladora.find()
        .populate('autor', 'nombre');

        let filtradas = desarrolladoras;

        if (nombre) {
            filtradas = filtradas.filter(d => normalizeString(d.nombre).includes(normalizeString(nombre)));
        }

        if (pais) {
            filtradas = filtradas.filter(d => normalizeString(d.pais).includes(normalizeString(pais)));
        }

        if (!filtradas.length) {
            return res.status(404).json({ msg: "Desarrolladoras no encontradas" });
        }
        res.json(filtradas);
    } catch (error) {
        console.error('Error al obtener las desarrolladoras:', error);
        res.status(500).json({ msg: error.message });
    }
};

//obtener desarrolladora por id
export const getDesarrolladoraById = async (req, res) => {
    try {
        const desarrolladora = await Desarrolladora.findById(req.params.id)
        .populate('autor', 'nombre');
        if (!desarrolladora) {
            return res.status(404).json({ msg: "Desarrolladora no encontrada" });
        }
        res.json(desarrolladora);
    } catch (error) {
        console.error('Error al obtener la desarrolladora:', error);
        res.status(500).json({ msg: error.message });
    }
};

//crear desarrolladora
export const createDesarrolladora = async (req, res) => {
    try {
        if (!req.usuario) {
            return res.status(401).json({ msg: "Usuario no autorizado" });
        }

        const desarrolladora = new Desarrolladora({
            ...req.body, autor: req.usuario._id
        });

        await desarrolladora.save();

        res.status(201).json({msg: 'Desarrolladora creada', desarrolladora});
    } catch (error) {
        console.error('Error al crear la desarrolladora:', error);
        res.status(500).json({ msg: error.message });
    }
};

//actualizar desarrolladora
export const updateDesarrolladora = async (req, res) => {
    try {
        const desarrolladora = await Desarrolladora.findById(req.params.id);

        if (!desarrolladora) {
            return res.status(404).json({ msg: "Desarrolladora no encontrada" });
        }

        if (!req.usuario) {
            return res.status(401).json({ msg: "Usuario no autorizado" });
        }

        if (desarrolladora.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No tienes permiso para actualizar esta desarrolladora" });
        }
        
        const updatedDesarrolladora = await Desarrolladora.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({
            msg: 'Desarrolladora actualizada',
            desarrolladora: updatedDesarrolladora
        });
    } catch (error) {
        console.error('Error al actualizar la desarrolladora:', error);
        res.status(500).json({ msg: error.message });
    }
};

//eliminar desarrolladora
export const deleteDesarrolladora = async (req, res) => {
    try {
        const desarrolladora = await Desarrolladora.findById(req.params.id);

        if (!desarrolladora) {
            return res.status(404).json({ msg: "Desarrolladora no encontrada" });
        }

        if (!req.usuario) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        if (desarrolladora.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No tienes permiso para eliminar esta desarrolladora" });
        }

        await Desarrolladora.findByIdAndDelete(req.params.id);
        
        res.json({ msg: 'Desarrolladora eliminada' });
    } catch (error) {
        console.error('Error al eliminar desarrolladora:', error);
        res.status(500).json({ msg: error.message });
    }
};