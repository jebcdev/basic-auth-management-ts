// Importa el enrutador de Express para definir las rutas.
import { Router } from "express";

// Importa el controlador de roles para asociarlo con las rutas.
import { RoleController } from "../controllers/role.controller"; 

// Importa el middleware que valida el ID de la ruta.
import { VerifyIdMiddleware } from "../../../core/middlewares/verifyId.middleware"; 

export class RoleRoutes {
    // Propiedad pública que representa el enrutador de Express.
    public readonly router: Router;

    // Propiedad privada que mantiene la instancia del controlador de roles.
    private readonly controller: RoleController;

    constructor() {
        // Inicializa el enrutador de Express.
        this.router = Router();
        
        // Inicializa el controlador de roles.
        this.controller = new RoleController();

        // Llama al método que configura las rutas.
        this.initializeRoutes();
    }

    // Método para definir todas las rutas del controlador de roles.
    public initializeRoutes(): void {
        // Desestructuración para obtener los métodos del controlador.
        const { getAll, getById, createNew, updateById, deleteById } = this.controller;

        // Define la ruta GET para obtener todos los roles.
        // Cuando se accede a `/roles`, llama a `getAll` del controlador.
        this.router.get("/", getAll.bind(this.controller));

        // Define la ruta GET para obtener un rol por su ID.
        // Esta ruta valida el ID con el middleware antes de llamar al `getById`.
        this.router.get("/:id", VerifyIdMiddleware.validate, getById.bind(this.controller));

        // Define la ruta POST para crear un nuevo rol.
        // Cuando se accede a `/roles`, llama a `createNew` del controlador.
        this.router.post("/", createNew.bind(this.controller));

        // Define la ruta PATCH para actualizar un rol por su ID.
        // Esta ruta valida el ID con el middleware antes de llamar a `updateById`.
        this.router.patch("/:id", VerifyIdMiddleware.validate, updateById.bind(this.controller));

        // Define la ruta DELETE para eliminar un rol por su ID.
        // Esta ruta valida el ID con el middleware antes de llamar a `deleteById`.
        this.router.delete("/:id", VerifyIdMiddleware.validate, deleteById.bind(this.controller));
    }
}
