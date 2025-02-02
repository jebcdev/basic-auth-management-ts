// Importa la entidad "RoleEntity" que representa la tabla "roles" en la base de datos.
import { RoleEntity } from "./entities/role.entity";

// Importa la interfaz "IRoleRepository", que define los métodos para interactuar con los roles en la base de datos.
import { IRoleRepository } from "./repositories/irole.repository";

// Importa el servicio "RoleService" que implementa la lógica de negocio para manejar los roles.
import { RoleService } from "./services/role.service";

// Importa el controlador "RoleController" que maneja las solicitudes HTTP relacionadas con los roles.
import { RoleController } from "./controllers/role.controller";

// Importa las rutas "RoleRoutes" que definen los endpoints de la API para los roles.
import { RoleRoutes } from "./routes/role.routes";

// Reexporta todas las entidades, interfaces, servicios, controladores y rutas, facilitando su importación desde un único archivo.
export { /* RoleEntity, */ IRoleRepository, RoleService, RoleController, RoleRoutes };
