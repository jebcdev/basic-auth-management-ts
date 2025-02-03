// Importa los tipos Request y Response de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express"; 

// Importa la clase Repository de TypeORM para interactuar con la base de datos.
import { Repository } from "typeorm"; 

// Importa la entidad RoleEntity, que representa la tabla de roles en la base de datos.
import { RoleEntity } from "../../role/entities/role.entity"; 

// Importa la entidad UserEntity, que representa la tabla de usuarios en la base de datos.
import { UserEntity } from "../../user/entities/user.entity"; 

// Importa la clase DatabaseConnection para obtener la conexión con la base de datos.
import { DatabaseConnection } from "../../database/DatabaseConnection"; 

// Importa la utilidad BcryptUtil para hashear contraseñas de forma segura.
import { BcryptUtil } from "../../../utils/bcrypt.util"; 

// Importa la función plainToClass para convertir objetos planos en instancias de clases.
import { plainToClass } from "class-transformer"; 

// Define la clase SeederController que se encargará de crear roles y usuarios de prueba en la base de datos.
export class SeederController { 
    // Define dos repositorios privados para interactuar con las tablas de roles y usuarios.
    private roleRepository: Repository<RoleEntity>; 
    private userRepository: Repository<UserEntity>; 

    // Constructor de la clase que inicializa los repositorios utilizando la conexión a la base de datos.
    constructor() { 
        this.roleRepository = 
            DatabaseConnection.appDataSource.getRepository( 
                RoleEntity // Obtiene el repositorio para la entidad RoleEntity.
            ); 

        this.userRepository = 
            DatabaseConnection.appDataSource.getRepository( 
                UserEntity // Obtiene el repositorio para la entidad UserEntity.
            ); 
    } 

    // Método público asincrónico que siembra roles y usuarios en la base de datos.
    public async seedRolesUsers( 
        _: Request, // No se usa la solicitud (por eso el guion bajo).
        res: Response // Respuesta HTTP que se enviará al cliente.
    ): Promise<Response> { 
        try { 
            /* Admin Seed */
            // Crea y guarda un rol de administrador en la base de datos.
            const adminRole = await this.roleRepository.save( 
                plainToClass(RoleEntity, { // Convierte un objeto plano en una instancia de RoleEntity.
                    name: "admin", // Nombre del rol.
                    description: "Admin Role", // Descripción del rol.
                }) 
            ); 

            // Crea y guarda un usuario administrador asociado al rol creado anteriormente.
            const adminUser = await this.userRepository.save( 
                plainToClass(UserEntity, { // Convierte un objeto plano en una instancia de UserEntity.
                    name: "Administrator", // Nombre del usuario.
                    surname: "System", // Apellido del usuario.
                    email: "admin@admin.com", // Correo electrónico del usuario.
                    password: await BcryptUtil.hashPassword( 
                        "12345678" // Hashea la contraseña antes de guardarla en la base de datos.
                    ), 
                    role_id: adminRole.id, // Asocia el usuario con el rol de administrador.
                }) 
            ); 
            /* Admin Seed */


            /* User Seed */
            // Crea y guarda un rol de usuario estándar en la base de datos.
            const userRole = await this.roleRepository.save( 
                plainToClass(RoleEntity, { 
                    name: "user", // Nombre del rol.
                    description: "User Role", // Descripción del rol.
                }) 
            ); 

            // Crea y guarda un usuario estándar asociado al rol de usuario.
            const userUser = await this.userRepository.save( 
                plainToClass(UserEntity, { 
                    name: "User", // Nombre del usuario.
                    surname: "System", // Apellido del usuario.
                    email: "user@user.com", // Correo electrónico del usuario.
                    password: await BcryptUtil.hashPassword( 
                        "12345678" // Hashea la contraseña del usuario.
                    ), 
                    role_id: userRole.id, // Asocia el usuario con el rol de usuario.
                }) 
            ); 
            /* User Seed */

            
            /* Guest Seed */
            // Crea y guarda un rol de invitado en la base de datos.
            const guestRole = await this.roleRepository.save( 
                plainToClass(RoleEntity, { 
                    name: "guest", // Nombre del rol.
                    description: "Guest Role", // Descripción del rol.
                }) 
            ); 

            // Crea y guarda un usuario invitado asociado al rol de invitado.
            const guestUser = await this.userRepository.save( 
                plainToClass(UserEntity, { 
                    name: "Guest", // Nombre del usuario.
                    surname: "System", // Apellido del usuario.
                    email: "guest@guest.com", // Correo electrónico del usuario.
                    password: await BcryptUtil.hashPassword( 
                        "12345678" // Hashea la contraseña del usuario.
                    ), 
                    role_id: guestRole.id, // Asocia el usuario con el rol de invitado.
                }) 
            ); 
            /* Guest Seed */

            // Devuelve una respuesta HTTP 200 con un mensaje de éxito y los datos de los roles y usuarios creados.
            return res.status(200).json({ 
                message: "Roles and Users Seeded Successfully", // Mensaje de éxito.
                data: { // Datos de los roles y usuarios creados.
                    adminRole, 
                    adminUser, 
                    userRole, 
                    userUser, 
                    guestRole, 
                    guestUser, 
                }, 
            }); 
        } catch (error) { 
            // En caso de error, devuelve una respuesta HTTP 500 con un mensaje de error y la información del error.
            return res.status(500).json({ 
                message: "Error Seeding Roles and Users", // Mensaje de error.
                data: error, // Información detallada del error.
            }); 
        } 
    } 
}
