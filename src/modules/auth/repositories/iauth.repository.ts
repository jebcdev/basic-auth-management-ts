import { UserEntity } from "../../user/entities/user.entity";

export interface IAuthRepository {

    getByEmail(email: string): Promise<UserEntity | null>;
    login(role_id:number,user_id:number): Promise<string>;
/* 
    register(): Promise<void>;

    profile(): Promise<void>; */
    
}