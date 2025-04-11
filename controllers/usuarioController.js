import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

//Generar token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

//Registrar usuario
export const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear usuario
        const usuario = new Usuario({ nombre, email, password });

        await usuario.save();

        // Generar token
        const token = generarToken(usuario._id);

        res.status(201).json({
            msg: 'Usuario creado', token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar usuario', error: error.message });
    }
};

//Iniciar sesion
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Verificar la contraseña
        const esPasswordValido = await usuario.compararPassword(password);
        if (!esPasswordValido) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = generarToken(usuario._id);
        res.json({
            msg: 'Login exitoso',
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
    }
};
    
//Obtener perfil de usuario
export const obtenerPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario._id).select('-password');
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el perfil', error: error.message });
    }
};