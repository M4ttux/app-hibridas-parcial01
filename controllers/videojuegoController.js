import Videojuego from "../models/Videojuego.js";

//obtener todos los videojuegos
export const getVideojuegos = async (req, res) => {
    try {
        const videojuegos = await Videojuego.find();
        res.json(videojuegos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//obtener videojuego por id
export const getVideojuegoById = async (req, res) => {
    try {
        const videojuego = await Videojuego.findById(req.params.id);
        if (!videojuego) {
            return res.status(404).json({ msg: "Videojuego no encontrado" });
        }
        res.json(videojuego);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//crear videojuego
export const createVideojuego = async (req, res) => {
    try {
        const videojuego = new Videojuego(req.body);
        await videojuego.save();
        res.status(201).json({mensaje: 'Videojuego creado', videojuego});
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el videojuego', error: error.message });
    }
};

//actualizar videojuego
export const updateVideojuego = async (req, res) => {
    try {
        const videojuego = await Videojuego.findById(req.params.id);

        if (!videojuego) {
            return res.status(404).json({ msg: "Videojuego no encontrado" });
        }
        if (videojuego.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        const updatedVideojuego = await Videojuego.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ mensaje: 'Videojuego actualizado', videojuego: updatedVideojuego });
    } catch (error) {
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
        if (videojuego.autor.toString() !== req.usuario._id.toString()) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        await videojuego.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Videojuego eliminado' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
