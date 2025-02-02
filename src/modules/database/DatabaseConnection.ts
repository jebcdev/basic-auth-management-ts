// Importa "reflect-metadata", necesario para que TypeORM maneje decoradores correctamente.
import "reflect-metadata";

// Importa la clase DataSource de TypeORM, que se usa para configurar la conexión a la base de datos.
import { DataSource } from "typeorm";

// Importa lsa entidades que serán utilizada en la configuración de TypeORM.
import { RoleEntity } from "../role/entities/role.entity"; 
import { UserEntity } from "../user/entities/user.entity"; 

// importa la configuracion de la base de datos
import { DatabaseConfig } from "../../core/config/database.config";


// Define una clase para manejar la conexión a la base de datos.
export class DatabaseConnection {

    // Declara una propiedad estática para almacenar la instancia de la conexión a la base de datos.
    public static appDataSource: DataSource = new DataSource({
        type:DatabaseConfig.type as "mysql",            // Define el tipo de base de datos a usar, en este caso MySQL.
        host: DatabaseConfig.host,       // Especifica el host donde se encuentra la base de datos.
        port: DatabaseConfig.port || 3306,               // Define el puerto en el que está escuchando MySQL.
        username: DatabaseConfig.username,         // Nombre de usuario para la autenticación en la base de datos.
        password: DatabaseConfig.password,             // Contraseña para la autenticación (⚠️ Evitar credenciales en código fuente).
        database: DatabaseConfig.database,  // Nombre de la base de datos a la que se conectará.
        entities: [RoleEntity,UserEntity],   // Lista de entidades que manejará TypeORM en la base de datos.
        synchronize: true,        // Permite que TypeORM sincronice la base de datos automáticamente con los modelos (⚠️ No recomendado en producción).
        logging: true,            // Habilita el registro de consultas SQL en la consola para depuración.
    });

}
