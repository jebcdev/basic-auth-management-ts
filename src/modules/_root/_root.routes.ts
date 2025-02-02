import { Router } from "express"; // Importa el enrutador de Express
import { RootController } from "./_root.controller"; // Importa el controlador de la raíz
import { RoleRoutes } from "../role"; // Importa las rutas de los roles
import { UserRoutes } from "../user"; // Importa las rutas de los usuarios

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
    this.router.get("/",RootController.root.bind(RootController));    
    this.router.use("/roles", new RoleRoutes().router); // Registrar las rutas de los roles
    this.router.use("/users", new UserRoutes().router); // Registrar las rutas de los usuarios
  }
}
