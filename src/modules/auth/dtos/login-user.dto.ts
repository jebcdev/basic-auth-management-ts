// Importación de decoradores de validación de la librería 'class-validator'
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

// Definición de la clase Data Transfer Object (DTO) para el inicio de sesión de un usuario
export class LoginUserDto {
    // Valida que el campo 'email' no esté vacío
    @IsNotEmpty() 
    
    // Valida que el campo 'email' sea de tipo string
    @IsString() 
    
    // Valida que el campo 'email' tenga un formato de correo electrónico válido
    @IsEmail() 
    email: string; // Declaración de la propiedad 'email' de tipo string

    // Valida que el campo 'password' no esté vacío
    @IsNotEmpty() 
    
    // Valida que el campo 'password' sea de tipo string
    @IsString() 
    
    // Valida que el campo 'password' tenga al menos 8 caracteres
    @MinLength(8)
    password: string; // Declaración de la propiedad 'password' de tipo string
}
