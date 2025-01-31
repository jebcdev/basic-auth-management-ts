import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { RoleEntity, IRoleRepository } from "../";
import { DatabaseConnectcion } from "../../database/DatabaseConnection";

export class RoleService implements IRoleRepository {
    private roleRepository: Repository<RoleEntity>;

    constructor() {
        this.roleRepository =
            DatabaseConnectcion.appDataSource.getRepository(
                RoleEntity
            );
    }

    public async getAll(): Promise<RoleEntity[] | null> {
        return await this.roleRepository.find({
            order: {
                id: "DESC",
            },
        });
    }

    public async getById(id: number): Promise<RoleEntity | null> {
        return await this.roleRepository.findOneBy({ id });
    }

    public async getByName(name:string): Promise<RoleEntity | null> {
        return await this.roleRepository.findOne({
            where: {
                name:name
            }
         });
    }

    public async createNew(role: RoleEntity):Promise<RoleEntity | null>  {
        return await this.roleRepository.save(role);
    }

    public async updateById(id: number, role: RoleEntity) :Promise<UpdateResult | null>{
        return await this.roleRepository.update(id, role);
    }

    public async deleteById(id: number): Promise<DeleteResult | null> {
        return await this.roleRepository.softDelete(id);
    }
}
