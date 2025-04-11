import Desarrolladora from "../models/Desarrolladora.js";

//obtener todas las desarrolladoras
export const getDesarrolladoras = async (req, res) => {
    try {
        const desarrolladoras = await Desarrolladora.find();
        res.json(desarrolladoras);
    } catch (error) {
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
        res.status(500).json({ msg: error.message });
    }
};

//crear desarrolladora
export const createDesarrolladora = async (req, res) => {
    try {
        const desarrolladoraExistente = await Desarrolladora.findOne({ nombre: req.body.nombre });
        if (desarrolladoraExistente) {
            return res.status(400).json({ msg: "Ya existe una desarrolladora con ese nombre" });
        }
        const desarrolladora = new Desarrolladora(req.body);
        await desarrolladora.save();
        res.status(201).json({mensaje: 'Desarrolladora creada', desarrolladora});
    } catch (error) {
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
        if (desarrolladora.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No autorizado" });
        }
        const updatedDesarrolladora = await Desarrolladora.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            mensaje: 'Desarrolladora actualizada',
            desarrolladora: updatedDesarrolladora
        });
    } catch (error) {
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
        if (desarrolladora.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No autorizado" });
        }
        await desarrolladora.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Desarrolladora eliminada' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

