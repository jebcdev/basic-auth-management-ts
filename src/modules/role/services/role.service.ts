// Importa los tipos necesarios de TypeORM para manipular entidades y resultados de operaciones.
import { DeleteResult, Repository, UpdateResult } from "typeorm";

// Importa la entidad RoleEntity y la interfaz IRoleRepository desde el módulo principal.
import { IRoleRepository } from "../repositories/irole.repository"; 

// Importa la clase DatabaseConnection para obtener la conexión a la base de datos.
import { DatabaseConnection } from "../../database/DatabaseConnection";
import { RoleEntity } from "../entities/role.entity";

// Define la clase RoleService que implementa la interfaz IRoleRepository.
export class RoleService implements IRoleRepository {
    
    // Declara una propiedad privada para almacenar el repositorio de la entidad RoleEntity.
    private repository: Repository<RoleEntity>;

    // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
    constructor() {
        this.repository = DatabaseConnection.appDataSource.getRepository(RoleEntity);
    }
    
    // Obtiene todos los roles de la base de datos, ordenados por ID en orden descendente.
    public async getAll(): Promise<RoleEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            relations: ["users"],
        });
    }

    // Busca un rol por su ID y lo devuelve si existe, de lo contrario, retorna null.
    public async getById(id: number): Promise<RoleEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            relations: ["users"],
         });
    }

    // Busca un rol por su nombre y lo devuelve si existe, de lo contrario, retorna null.
    public async getByName(name: string): Promise<RoleEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name, // Se puede simplificar a `name`
            },
        });
    }

    // Crea un nuevo rol en la base de datos y lo devuelve si la operación tiene éxito.
    public async createNew(data: RoleEntity): Promise<RoleEntity | null> {
        return await this.repository.save(data);
    }

    // Actualiza un rol por su ID y devuelve el resultado de la actualización.
    public async updateById(id: number, data: RoleEntity): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    // Realiza un "borrado lógico" (soft delete) de un rol por su ID y devuelve el resultado de la operación.
    public async deleteById(id: number): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}
