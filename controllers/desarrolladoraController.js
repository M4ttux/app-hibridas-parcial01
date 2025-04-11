import Desarrolladora from "../models/Desarrolladora.js";

//obtener todas las desarrolladoras
export const getDesarrolladoras = async (req, res) => {
    try {
        const desarrolladoras = await Desarrolladora.find();
        res.json(desarrolladoras);
    } catch (error) {
        console.error('Error al obtener las desarrolladoras:', error);
        res.status(500).json({ msg: error.message });
    }
};

//obtener desarrolladora por id
export const getDesarrolladoraById = async (req, res) => {
    try {
        const desarrolladora = await Desarrolladora.findById(req.params.id);
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

        res.status(201).json({mensaje: 'Desarrolladora creada', desarrolladora});
    } catch (error) {
        console.error('Error al crear la desarrolladora:', error);
        res.status(500).json({ mensaje: 'Error al crear la desarrolladora', error: error.message });
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
            mensaje: 'Desarrolladora actualizada',
            desarrolladora: updatedDesarrolladora
        });
    } catch (error) {
        console.error('Error al actualizar la desarrolladora:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la desarrolladora', error: error.message });
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
        
        res.json({ mensaje: 'Desarrolladora eliminada' });
    } catch (error) {
        console.error('Error al eliminar desarrolladora:', error);
        res.status(500).json({ msg: error.message });
    }
};

