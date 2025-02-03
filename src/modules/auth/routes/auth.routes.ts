// Importa el enrutador de Express para definir las rutas.
import { Router } from "express";

// Importa el controlador de auth para asociarlo con las rutas.
import { AuthController } from "../controllers/auth.controller";

// Importa un middleware que verifica si existe un token en la solicitud.
import { TokenExistsMiddleware } from "../../../core/middlewares/tokenExists.middleware";

export class AuthRoutes {
    // Propiedad pública que representa el enrutador de Express, encargado de gestionar las rutas.
    public readonly router: Router;

    // Propiedad privada que mantiene la instancia del controlador de autenticación.
    private readonly controller: AuthController;

    constructor() {
        // Inicializa el enrutador de Express para definir las rutas del módulo de autenticación.
        this.router = Router();
        
        // Inicializa el controlador de autenticación, que contiene la lógica para manejar las solicitudes.
        this.controller = new AuthController();

        // Llama al método que configura y asocia las rutas con sus controladores correspondientes.
        this.initializeRoutes();
    }

    // Método para definir todas las rutas del módulo de autenticación.
    public initializeRoutes(): void {
        // Desestructuración para obtener los métodos del controlador de autenticación.
        const { register, login, profile } = this.controller;

        // Define la ruta para registrar un nuevo usuario.
        // Se utiliza el método POST porque se está enviando información para crear un recurso (usuario).
        this.router.post("/register", register.bind(this.controller));

        // Define la ruta para iniciar sesión (login).
        // Se utiliza el método POST porque se envían credenciales para autenticar al usuario.
        this.router.post("/login", login.bind(this.controller));

        // Define la ruta para obtener el perfil del usuario autenticado.
        // Se aplica el middleware `TokenExistsMiddleware.check` para verificar que el token de autenticación esté presente.
        // Luego, si el token es válido, se ejecuta el método `profile` del controlador.
        this.router.post("/profile", TokenExistsMiddleware.check, profile.bind(this.controller));
    }
}
