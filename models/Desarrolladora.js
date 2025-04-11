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
    fechaFundacion: {
        type: Date,
        default: Date.now
    },
    logo: {
        type: String,
        default: 'https://via.placeholder.com/150x150?text=Desarrolladora'
    }
});

const Desarrolladora = mongoose.model('Desarrolladora', desarrolladoraSchema);

export default Desarrolladora;