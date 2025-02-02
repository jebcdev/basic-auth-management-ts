// Importa los decoradores de validación de la librería "class-validator".
import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Min,
} from "class-validator";
export class UpdateUserDto {
    // Indica que el campo "name" es opcional en la solicitud.
    @IsOptional()
    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    @Length(4, 200)
    name: string;

    // Indica que el campo "name" es opcional en la solicitud.
    @IsOptional()
    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "name" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    @Length(4, 200)
    surname: string;

    // Indica que el campo "name" es opcional en la solicitud.
    @IsOptional()
    // Valida que el campo "email" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "email" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del correo electrónico entre 4 y 100 caracteres.
    @Length(4, 100)
    // Valida que el campo "email" tenga formato de correo electrónico.
    @IsEmail()
    email: string;

    // Indica que el campo "name" es opcional en la solicitud.
    @IsOptional()
    // Valida que el campo "email" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "email" sea una cadena de texto.
    @IsString()
    // Restringe la longitud del correo electrónico entre 4 y 100 caracteres.
    @Length(4, 100)
    password: string;

    // Indica que el campo "name" es opcional en la solicitud.
    @IsOptional()
    @IsNotEmpty()
    @IsInt() // Asegura que sea un número entero
    @Min(1) // Evita valores menores que 1
    roleId: number;
}
