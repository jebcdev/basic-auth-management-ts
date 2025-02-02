// Importa los decoradores de validación de la librería "class-validator".
import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    Min,
} from "class-validator";

// Define una clase DTO (Data Transfer Object) para la creación de usuarios.
export class CreateUserDto {
    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    @Length(4, 200)
    name: string;

    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    @Length(4, 200)
    surname: string;

    // Valida que el campo "email" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "email" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del correo electrónico entre 4 y 100 caracteres.
    @Length(4, 100)
    // Valida que el campo "email" tenga formato de correo electrónico.
    @IsEmail()
    email: string;

    // Valida que el campo "email" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "email" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del correo electrónico entre 4 y 100 caracteres.
    @Length(4, 100)
    password: string;

    // Indica que el campo "role" es opcional en la solicitud.
    @IsNotEmpty()
    @IsInt() // Asegura que sea un número entero
    @Min(1) // Evita valores menores que 1
    role_id: number;
}
