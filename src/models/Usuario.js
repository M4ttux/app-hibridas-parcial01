import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                // Permite letras, espacios y algunos caracteres como guiones
                return v.trim().length > 0 && /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s-]+$/.test(v);
            },
            message: props => `"${props.value}" no es un nombre válido`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                // Validación básica de email
                return v.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `"${props.value}" no es un correo válido`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

// Metodo para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Metodo para comparar contraseñas
usuarioSchema.methods.compararPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;