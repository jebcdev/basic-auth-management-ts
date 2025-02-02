// Importa los tipos necesarios de TypeORM para manipular entidades y resultados de operaciones.
import { DeleteResult, Repository, UpdateResult } from "typeorm";

// Importa la entidad UserEntity y la interfaz IUserRepository desde el módulo principal.
import { IUserRepository } from "../repositories/iuser.repository"; 


// Importa la clase DatabaseConnection para obtener la conexión a la base de datos.
import { DatabaseConnection } from "../../database/DatabaseConnection";
import { UserEntity } from "../entities/user.entity";

// Define la clase UserService que implementa la interfaz IUserRepository.
export class UserService implements IUserRepository {
    
    // Declara una propiedad privada para almacenar el repositorio de la entidad UserEntity.
    private repository: Repository<UserEntity>;

    // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
    constructor() {
        this.repository = DatabaseConnection.appDataSource.getRepository(UserEntity);
    }
    
    // Obtiene todos los usuarios de la base de datos, ordenados por ID en orden descendente.
    public async getAll(): Promise<UserEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            relations: ["role"], // Incluye la relación con la entidad RoleEntity.
        });
    }

    // Busca un usuario por su ID y lo devuelve si existe, de lo contrario, retorna null.
    public async getById(id: number): Promise<UserEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            relations: ["role"], // Incluye la relación con la entidad RoleEntity.
         });
    }

    // Busca un usuario por su nombre y lo devuelve si existe, de lo contrario, retorna null.
    public async getByEmail(email: string): Promise<UserEntity | null> {
        return await this.repository.findOne({
            where: {
                email: email, // Se puede simplificar a `name`
            },
        });
    }

    // Crea un nuevo usuario en la base de datos y lo devuelve si la operación tiene éxito.
    public async createNew(data: UserEntity): Promise<UserEntity | null> {
        return await this.repository.save(data);
    }

    // Actualiza un usuario por su ID y devuelve el resultado de la actualización.
    public async updateById(id: number, data: UserEntity): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    // Realiza un "borrado lógico" (soft delete) de un usuario por su ID y devuelve el resultado de la operación.
    public async deleteById(id: number): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}
