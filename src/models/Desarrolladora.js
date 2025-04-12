import mongoose from "mongoose";

const desarrolladoraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    pais: {
        type: String,
        required: true
    },
    fundacion: {
        type: Number,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Desarrolladora = mongoose.model('Desarrolladora', desarrolladoraSchema);

export default Desarrolladora;