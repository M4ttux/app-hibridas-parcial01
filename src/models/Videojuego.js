import mongoose from 'mongoose';

const videojuegoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String
    },
    genero: {
        type: [String],
        enum: ['Acción', 'Aventura', 'Carreras', 'Deportes', 'Estrategia', 'Juegos de rol', 'Simulación', 'Terror', 'Otros']
    },
    plataformas: {
        type: [String],
        enum: ['PC', 'PS5' , 'PS4', 'PS3', 'Xbox Series X', 'Xbox Series S', 'Xbox One', 'Xbox 360', 'Nintendo Switch', 'Mobile', 'Otros']
    },
    fechaLanzamiento: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
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