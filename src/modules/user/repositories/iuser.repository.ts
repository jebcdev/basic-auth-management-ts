// Importa los tipos de retorno de TypeORM para las operaciones de actualización y eliminación.
import { DeleteResult, UpdateResult } from "typeorm";

// Importa la entidad "UserEntity", que representa la tabla "usuarios" en la base de datos.
import { UserEntity } from "../entities/user.entity";

// Define una interfaz para el repositorio de usuarios, estableciendo los métodos obligatorios.
export interface IUserRepository {
    
    // Obtiene todos los usuarios de la base de datos.
    // Devuelve un array de UserEntity o null si no hay registros.
    getAll(): Promise<UserEntity[] | null>;

    // Obtiene un usuario específico por su ID.
    // Devuelve un UserEntity si se encuentra, o null si no existe.
    getById(id: number): Promise<UserEntity | null>;

    // Obtiene un usuario específico por su nombre.
    // Devuelve un UserEntity si se encuentra, o null si no existe.
    getByEmail(email: string): Promise<UserEntity | null>;

    // Crea un nuevo usuario en la base de datos.
    // Devuelve el UserEntity creado o null si falla la operación.
    createNew(user: UserEntity): Promise<UserEntity | null>;

    // Actualiza un usuario existente por su ID.
    // Devuelve un UpdateResult si la actualización es exitosa, o null si falla.
    updateById(id: number, usuarioe: UserEntity): Promise<UpdateResult | null>;

    // Elimina un usuario por su ID.
    // Devuelve un DeleteResult si la eliminación es exitosa, o null si falla.
    deleteById(id: number): Promise<DeleteResult | null>;
}
