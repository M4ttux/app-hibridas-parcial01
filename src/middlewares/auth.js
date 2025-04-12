import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ msg: 'No hay token, permiso denegado' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        req.usuario = usuario;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};

export default auth;