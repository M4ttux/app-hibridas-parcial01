import mongoose from 'mongoose';

const videojuegoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        enum: ['Acción', 'Aventura', 'Carreras', 'Deportes', 'Estrategia', 'Juegos de rol', 'Simulación', 'Terror', 'Otros'],
        required: true
    },
    plataformas: {
        type: String,
        enum: ['PC', 'PS5' , 'PS4', 'Xbox Series X', 'Xbox Series S', 'Xbox One', 'Nintendo Switch', 'Mobile', 'Otros'],
        required: true
    },
    fechaLanzamiento: {
        type: Date,
        required: true
    },
    desarrolladora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Desarrolladora',
        required: true
    },
    imagen: {
        type: String,
        default: 'https://via.placeholder.com/300x400?text=Videojuego'
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Videojuego = mongoose.model('Videojuego', videojuegoSchema);

export default Videojuego;