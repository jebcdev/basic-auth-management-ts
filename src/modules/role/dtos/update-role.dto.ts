// Importa los decoradores de validación de la librería "class-validator".
import {
    IsNotEmpty,   // Valida que el campo no esté vacío.
    IsOptional,   // Permite que el campo sea opcional en la solicitud.
    IsString,     // Valida que el campo sea una cadena de texto.
    Length,       // Restringe la longitud mínima y máxima del campo.
} from "class-validator";

// Define una clase DTO (Data Transfer Object) para la actualización de roles.
export class UpdateRoleDto {

    // Indica que el campo "name" es opcional en la solicitud.
    @IsOptional()
    // Si el campo está presente, valida que no esté vacío.
    @IsNotEmpty()
    // Valida que el campo sea una cadena de texto.
    @IsString()
    // Restringe la longitud del nombre entre 4 y 100 caracteres.
    @Length(4, 100)
    name: string;

    // Indica que el campo "description" es opcional en la solicitud.
    @IsOptional()
    // Si el campo está presente, valida que no esté vacío.
    @IsNotEmpty()
    // Valida que el campo sea una cadena de texto.
    @IsString()
    // Restringe la longitud de la descripción entre 4 y 255 caracteres.
    @Length(4, 255)
    description: string;
}
