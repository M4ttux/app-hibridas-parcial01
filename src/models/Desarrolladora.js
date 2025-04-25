import mongoose from "mongoose";

const desarrolladoraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Permite letras, números, espacios y algunos caracteres como & o -
                return v.trim().length > 0 && /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s&\-]+$/.test(v);
            },
            message: props => `"${props.value}" no es un nombre válido`
        }
    },
    pais: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Verifica que solo contenga letras, espacios o guiones
                return v.trim().length > 0 && /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s-]+$/.test(v);
            },
            message: props => `${props.value} no es un nombre de país válido`
        }
    },
    fundacion: {
        type: Number,
        required: true,
        min: [1800, 'El año debe ser posterior a 1800'],
        max: [new Date().getFullYear(), 'El año no puede ser en el futuro'],
        validate: {
            validator: Number.isInteger,
            message: 'El año debe ser un número entero'
    }
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Desarrolladora = mongoose.model('Desarrolladora', desarrolladoraSchema);

export default Desarrolladora;