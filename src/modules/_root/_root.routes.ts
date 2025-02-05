import { Router } from "express"; // Importa el enrutador de Express
import { RootController } from "./_root.controller"; // Importa el controlador de la raíz
import { RoleRoutes } from "../role/routes/role.routes"; // Importa las rutas de los roles
import { UserRoutes } from "../user/routes/user.routes"; // Importa las rutas de los usuarios
import { AuthRoutes } from "../auth/routes/auth.routes"; // Importa las rutas de autenticación
import { SeederRoutes } from "../seeder/routes/seeder.routes";
import { TokenExistsMiddleware } from "../../core/middlewares/tokenExists.middleware";
import { IsAdminMiddleware } from "../../core/middlewares/isAdmin.middleware";
export class RootRoutes {
    // Propiedad pública para el enrutador
    public readonly router: Router;

    // Propiedades privadas
    private readonly apiPrefix: string;

    // Constructor que inicializa las rutas y controladores
    constructor() {
        this.router = Router(); // Inicializa el enrutador
        this.apiPrefix = process.env.API_PREFIX || "/api/v1"; // Prefijo de la API
        this.initializeRoutes(); // Llama al método para inicializar las rutas
    }

    // Método privado para definir las rutas
    private initializeRoutes(): void {
        // Registrar la ruta raíz usando el prefijo de la API
        this.router.get(
            "/",
            RootController.root.bind(RootController)
        );
        this.router.use(
            "/roles",
            TokenExistsMiddleware.check,
            IsAdminMiddleware.check,
            new RoleRoutes().router
        ); // Registrar las rutas de los roles
        this.router.use(
            "/users",
            TokenExistsMiddleware.check,// Verifica si el token existe
            IsAdminMiddleware.check, // Verifica si el usuario es administrador
            new UserRoutes().router
        ); // Registrar las rutas de los usuarios
        this.router.use("/auth", new AuthRoutes().router); // Registrar las rutas de autenticación
        this.router.use("/seed", new SeederRoutes().router); // Registrar las rutas de seeder
    }
}
