import { Router } from "express";
import { RoleController } from "../";
import { VerifyIdMiddleware } from "../../../core/middlewares/verifyId.middleware";

export class RoleRoutes {
    // Propiedad pública para el enrutador
    public readonly router: Router;

    // Propiedades privadas
    private readonly roleController: RoleController;

    constructor() {
        this.router = Router();
        this.roleController = new RoleController();
        this.initializeRoutes();

    }

    public initializeRoutes(): void {
        this.router.get("/", this.roleController.getAll.bind(this.roleController));
        this.router.get("/:id",VerifyIdMiddleware.validate, this.roleController.getById.bind(this.roleController));
        this.router.post("/", this.roleController.createNew.bind(this.roleController));
        this.router.patch("/:id",VerifyIdMiddleware.validate, this.roleController.updateById.bind(this.roleController));
        this.router.delete("/:id",VerifyIdMiddleware.validate, this.roleController.deleteById.bind(this.roleController));
    }
}
