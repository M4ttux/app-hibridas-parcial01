import videojuegosRouter from "./videojuegos.js";
import desarrolladorasRouter from "./desarrolladoras.js";
import usuariosRouter from "./usuarios.js";

function routerAPI (app) {
    //Definimos las rutas
    app.use('/api/videojuegos', videojuegosRouter);
    app.use('/api/desarrolladoras', desarrolladorasRouter);
    app.use('/api/usuarios', usuariosRouter);
}

export default routerAPI;