import "reflect-metadata"
import { DataSource } from "typeorm"
import { RoleEntity } from "../role";

export class DatabaseConnectcion{

    public static  appDataSource : DataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "basic-auth-management-ts",
        entities: [RoleEntity],
        synchronize: true,
        logging: true,
    });


}