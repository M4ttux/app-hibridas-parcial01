import mongoose from 'mongoose';

const videojuegoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                // Permite letras, números, espacios y símbolos comunes
                return v.trim().length > 0 && /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s\-:&()]+$/.test(v);
            },
            message: props => `"${props.value}" no es un título válido`
        }
    },
    descripcion: {
        type: String,
        trim: true
    },
    genero: {
        type: [String],
        enum: ['Acción', 'Aventura', 'Carreras', 'Deportes', 'Estrategia', 'Juegos de rol', 'Simulación', 'Terror', 'Otros'],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'Debe seleccionar al menos un género'
        }
    },
    plataformas: {
        type: [String],
        enum: ['PC', 'PS5' , 'PS4', 'PS3', 'Xbox Series X', 'Xbox Series S', 'Xbox One', 'Xbox 360', 'Nintendo Switch', 'Mobile', 'Otros'],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'Debe seleccionar al menos una plataforma'
        }
    },
    fechaLanzamiento: {
        type: Number,
        required: true,
        min: [1800, 'El año debe ser posterior a 1800'],
        max: [new Date().getFullYear(), 'El año no puede ser en el futuro'],
        validate: {
            validator: Number.isInteger,
            message: 'El año debe ser un número entero'
        }
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo'],
        validate: {
            validator: function (v) {
                return typeof v === 'number';
            },
            message: 'El precio debe ser un número'
        }
    },
    desarrolladora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Desarrolladora',
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Videojuego = mongoose.model('Videojuego', videojuegoSchema);

export default Videojuego;