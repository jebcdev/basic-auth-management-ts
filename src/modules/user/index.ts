// Importa las definiciones de los objetos de transferencia de datos (DTO) para crear y actualizar usuarios desde el archivo "dtos".
import { CreateUserDto, UpdateUserDto } from "./dtos";

// Importa la entidad de usuario desde el archivo "user.entity".
import { UserEntity } from "./entities/user.entity";

// Importa la interfaz del repositorio de usuarios desde el archivo "iuser.repository".
import { IUserRepository } from "./repositories/iuser.repository";

// Importa el servicio de usuario desde el archivo "user.service".
import { UserService } from "./services/user.service";

// Importa el controlador de usuario desde el archivo "user.controller".
import { UserController } from "./controllers/user.controller";

// Importa las rutas de usuario desde el archivo "user.routes".
import { UserRoutes } from "./routes/user.routes";

// Exporta los DTOs, la entidad de usuario, la interfaz del repositorio, el servicio, el controlador y las rutas para que puedan ser utilizados en otras partes de la aplicación.
export { CreateUserDto, UpdateUserDto, /* UserEntity, */ IUserRepository, UserService, UserController ,UserRoutes};