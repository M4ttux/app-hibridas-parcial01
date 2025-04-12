import Videojuego from "../models/Videojuego.js";
import { normalizeString } from "../utils/stringUtils.js";

//obtener todos los videojuegos
export const getVideojuegos = async (req, res) => {
    try {
        const videojuegos = await Videojuego.find()
        .populate('desarrolladora', 'nombre')
        .populate('autor', 'nombre');
        res.json(videojuegos);
    } catch (error) {
        console.error('Error al obtener los videojuegos:', error);
        res.status(500).json({ msg: error.message });
    }
};

//obtener videojuego por id
export const getVideojuegoById = async (req, res) => {
    try {
        const videojuego = await Videojuego.findById(req.params.id)
        .populate('desarrolladora', 'nombre')
        .populate('autor', 'nombre');
        if (!videojuego) {
            return res.status(404).json({ msg: "Videojuego no encontrado" });
        }
        res.json(videojuego);
    } catch (error) {
        console.error('Error al obtener el videojuego:', error);
        res.status(500).json({ msg: error.message });
    }
};

//crear videojuego
export const createVideojuego = async (req, res) => {
    try {
        if (!req.usuario) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        const videojuego = new Videojuego({
            ...req.body, autor: req.usuario._id
        });

        await videojuego.save();
        res.status(201).json({msg: 'Videojuego creado', videojuego});
    } catch (error) {
        console.error('Error al crear el videojuego:', error);
        res.status(500).json({ msg: error.message });
    }
};

//actualizar videojuego
export const updateVideojuego = async (req, res) => {
    try {
        const videojuego = await Videojuego.findById(req.params.id);

        if (!videojuego) {
            return res.status(404).json({ msg: "Videojuego no encontrado" });
        }

        if (!req.usuario) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        if (videojuego.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No tienes permiso para actualizar este videojuego" });
        }

        const updatedVideojuego = await Videojuego.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'Videojuego actualizado', videojuego: updatedVideojuego });
    } catch (error) {
        console.error('Error al actualizar el videojuego:', error);
        res.status(500).json({ msg: error.message });
    }
};

//eliminar videojuego
export const deleteVideojuego = async (req, res) => {
    try {
        const videojuego = await Videojuego.findById(req.params.id);

        if (!videojuego) {
            return res.status(404).json({ msg: "Videojuego no encontrado" });
        }

        if (!req.usuario) {
            return res.status(401).json({ msg: "Usuario no autenticado" });
        }

        if (videojuego.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        await Videojuego.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Videojuego eliminado' });
    } catch (error) {
        console.error('Error al eliminar el videojuego:', error);
        res.status(500).json({ msg: error.message });
    }
};

//obtener videojuego por titulo
export const getVideojuegoByTitulo = async (req, res) => {
    try {
        const { titulo } = req.params;

        const todas = await Videojuego.find()
        .populate('desarrolladora', 'nombre')
        .populate('autor', 'nombre');
        const videojuego = todas.find(v => normalizeString(v.titulo) === normalizeString(titulo));

        if (!videojuego) {
            return res.status(404).json({ msg: "Videojuego no encontrado" });
        }
        res.json(videojuego);

    } catch (error) {
        console.error('Error al obtener el videojuego:', error);
        res.status(500).json({ msg: error.message });
    }
}