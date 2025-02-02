import { Repository } from "typeorm";
import { IAuthRepository } from "../repositories/iauth.repository";
import { UserEntity } from "../../user/entities/user.entity";
import { DatabaseConnection } from "../../database/DatabaseConnection";
import { JwtUtil } from "../../../utils/jwt.util";

export class AuthService implements IAuthRepository {
// Declara una propiedad privada para almacenar el repositorio de la entidad UserEntity.
    private repository: Repository<UserEntity>;

    // Constructor de la clase, inicializa el repositorio obteniéndolo desde DatabaseConnection.
    constructor() {
        this.repository = DatabaseConnection.appDataSource.getRepository(UserEntity);
    }

     // Busca un usuario por su nombre y lo devuelve si existe, de lo contrario, retorna null.
     public async getByEmail(email: string): Promise<UserEntity | null> {
        return await this.repository.findOne({
            where: {
                email: email, // Se puede simplificar a `name`
            },
            relations: ["role"],
        });
    }

    public async login(role_id:number,user_id:number):Promise<string>{
        const data={role_id,user_id}
        return await JwtUtil.generateToken(data);
    }

}