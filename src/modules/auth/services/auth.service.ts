// Importación de la clase Repository de TypeORM, que proporciona métodos para interactuar con la base de datos.
import { Repository } from "typeorm";

// Importación de la interfaz IAuthRepository, que define el contrato para la lógica del repositorio de autenticación.
import { IAuthRepository } from "../repositories/iauth.repository";

// Importación de la entidad UserEntity, que representa la estructura de un usuario en la base de datos.
import { UserEntity } from "../../user/entities/user.entity";

// Importación de la clase DatabaseConnection, utilizada para obtener la conexión a la base de datos.
import { DatabaseConnection } from "../../database/DatabaseConnection";

// Importación de JwtUtil, una utilidad para la generación de tokens JWT.
import { JwtUtil } from "../../../utils/jwt.util";

// Definición de la clase AuthService que implementa la interfaz IAuthRepository.
// Esta clase gestiona toda la lógica de autenticación y operaciones relacionadas con usuarios.
export class AuthService implements IAuthRepository {
    // Propiedad privada que almacena el repositorio de la entidad UserEntity para realizar operaciones CRUD.
    private repository: Repository<UserEntity>;

    // Constructor de la clase AuthService.
    // Inicializa el repositorio obteniéndolo a través de DatabaseConnection, usando la entidad UserEntity.
    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                UserEntity
            );
    }

    // Método para obtener un usuario por su correo electrónico.
    // Retorna el usuario si existe o null si no se encuentra.
    public async getByEmail(
        email: string
    ): Promise<UserEntity | null> {
        return await this.repository.findOne({
            where: {
                email: email, // Busca en la base de datos el usuario que tenga el correo proporcionado.
            },
            relations: ["role"], // Incluye la relación con la entidad 'role' para obtener la información del rol del usuario.
        });
    }

    // Método para obtener un usuario por su ID.
    // Retorna el usuario si existe o null si no se encuentra.
    public async getById(id: number): Promise<UserEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id, // Busca el usuario que tenga el ID especificado.
            },
            relations: ["role"], // Incluye la relación con la entidad 'role'.
        });
    }

    // Método para iniciar sesión (login).
    // Recibe el ID del rol y el ID del usuario, y genera un token JWT con estos datos.
    public async login(
        role_id: number,
        user_id: number
    ): Promise<string> {
        const data = { role_id, user_id }; // Estructura los datos que se incluirán en el token JWT.
        return await JwtUtil.generateToken(data); // Genera y devuelve el token JWT usando JwtUtil.
    }

    // Método para obtener el perfil de un usuario por su ID.
    // Retorna la información del usuario si existe o null si no se encuentra.
    public async profile(id: number): Promise<UserEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id, // Busca el usuario por su ID.
            },
            relations: ["role"], // Incluye la relación con el rol del usuario.
        });
    }

    // Método para registrar un nuevo usuario en la base de datos.
    // Recibe un objeto de tipo UserEntity y lo guarda usando el repositorio.
    public async register(
        user: UserEntity
    ): Promise<UserEntity | null> {
        return await this.repository.save(user); // Guarda el nuevo usuario y lo devuelve.
    }
}
