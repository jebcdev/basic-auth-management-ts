// Importación de la entidad 'UserEntity' desde el módulo de usuarios. 
// Esta entidad representa la estructura del usuario en la base de datos.
import { UserEntity } from "../../user/entities/user.entity";

// Definición de una interfaz llamada 'IAuthRepository'.
// Esta interfaz define el contrato que deben cumplir las clases que implementen la lógica del repositorio de autenticación.
export interface IAuthRepository {

    // Método para obtener un usuario a partir de su correo electrónico.
    // Retorna una promesa que puede resolverse con un 'UserEntity' si el usuario existe, o 'null' si no se encuentra.
    getByEmail(email: string): Promise<UserEntity | null>; 

    // Método para obtener un usuario a partir de su ID.
    // Similar al anterior, devuelve una promesa con la entidad del usuario o 'null' si no se encuentra.
    getById(id: number): Promise<UserEntity | null>; 

    // Método para realizar el proceso de inicio de sesión (login).
    // Recibe el ID del rol y el ID del usuario, y devuelve una promesa que resuelve un 'string', probablemente un token JWT.
    login(role_id: number, user_id: number): Promise<string>; 

    // Método para obtener el perfil de un usuario a partir de su ID.
    // Devuelve una promesa que puede resolverse con la entidad del usuario o 'null' si no existe.
    profile(id: number): Promise<UserEntity | null>; 

    // Método para registrar un nuevo usuario en la base de datos.
    // Recibe un objeto de tipo 'UserEntity' y devuelve una promesa que puede resolverse con la entidad del usuario registrado o 'null' si ocurre un error.
    register(user: UserEntity): Promise<UserEntity | null>; 
}
