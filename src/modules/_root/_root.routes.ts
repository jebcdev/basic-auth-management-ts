import { Router } from "express";
import { RootController } from "./_root.controller";
import { RoleRoutes } from "../role";

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
    this.router.use("/roles", new RoleRoutes().router);
  }
}
