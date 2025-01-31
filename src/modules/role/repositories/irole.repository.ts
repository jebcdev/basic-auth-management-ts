import { DeleteResult, UpdateResult } from "typeorm";
import { RoleEntity } from "../entities/role.entity";

export interface IRoleRepository {
    getAll(): Promise<RoleEntity[]|null>;
    getById(id: number): Promise<RoleEntity|null>;
    getByName(name:string): Promise<RoleEntity|null>;
    createNew(role: RoleEntity): Promise<RoleEntity|null>;
    updateById(id: number, role: RoleEntity): Promise<UpdateResult|null>;
    deleteById(id: number): Promise<DeleteResult|null>;
}