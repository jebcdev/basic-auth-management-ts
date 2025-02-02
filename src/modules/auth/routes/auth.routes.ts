// Importa el enrutador de Express para definir las rutas.
import { Router } from "express";

// Importa el controlador de auth para asociarlo con las rutas.
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
    // Propiedad pública que representa el enrutador de Express.
    public readonly router: Router;

    // Propiedad privada que mantiene la instancia del controlador de roles.
    private readonly controller: AuthController;

    constructor() {
        // Inicializa el enrutador de Express.
        this.router = Router();
        
        // Inicializa el controlador de roles.
        this.controller = new AuthController();

        // Llama al método que configura las rutas.
        this.initializeRoutes();
    }

    // Método para definir todas las rutas del controlador de roles.
    public initializeRoutes(): void {
        // Desestructuración para obtener los métodos del controlador.
        const { login } = this.controller;

        // define la ruta para hacer el login
        this.router.post("/login", login.bind(this.controller));
    }
}
