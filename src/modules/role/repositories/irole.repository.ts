// Importa los tipos de retorno de TypeORM para las operaciones de actualización y eliminación.
import { DeleteResult, UpdateResult } from "typeorm";

// Importa la entidad "RoleEntity", que representa la tabla "roles" en la base de datos.
import { RoleEntity } from "../entities/role.entity";

// Define una interfaz para el repositorio de roles, estableciendo los métodos obligatorios.
export interface IRoleRepository {
    
    // Obtiene todos los roles de la base de datos.
    // Devuelve un array de RoleEntity o null si no hay registros.
    getAll(): Promise<RoleEntity[] | null>;

    // Obtiene un rol específico por su ID.
    // Devuelve un RoleEntity si se encuentra, o null si no existe.
    getById(id: number): Promise<RoleEntity | null>;

    // Obtiene un rol específico por su nombre.
    // Devuelve un RoleEntity si se encuentra, o null si no existe.
    getByName(name: string): Promise<RoleEntity | null>;

    // Crea un nuevo rol en la base de datos.
    // Devuelve el RoleEntity creado o null si falla la operación.
    createNew(role: RoleEntity): Promise<RoleEntity | null>;

    // Actualiza un rol existente por su ID.
    // Devuelve un UpdateResult si la actualización es exitosa, o null si falla.
    updateById(id: number, role: RoleEntity): Promise<UpdateResult | null>;

    // Elimina un rol por su ID.
    // Devuelve un DeleteResult si la eliminación es exitosa, o null si falla.
    deleteById(id: number): Promise<DeleteResult | null>;
}
