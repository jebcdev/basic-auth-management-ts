// Importa los decoradores de validación de la librería "class-validator".
import { IsNotEmpty, IsString, Length } from "class-validator";

// Define una clase DTO (Data Transfer Object) para la creación de roles.
export class CreateRoleDto {

    // Valida que el campo "name" no esté vacío.
    @IsNotEmpty() 
    // Valida que el campo "name" sea una cadena de texto.
    @IsString() 
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    @Length(4, 100) 
    name: string;

    // Valida que el campo "description" no esté vacío.
    @IsNotEmpty()
    // Valida que el campo "description" sea una cadena de texto.
    @IsString()
    // Restringe la longitud de la descripción entre 4 y 255 caracteres.
    @Length(4, 255)
    description: string;
}
