// Importa las clases necesarias de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express";

// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
import { plainToInstance } from "class-transformer";

// Importa las funciones de "class-validator" para realizar validaciones de datos.
import { validate, ValidationError } from "class-validator";

// Importa tipos de TypeORM para manejar resultados de actualizaciones.
import { UpdateResult } from "typeorm";
import { AuthService } from "../services/auth.service";

// importar los dtos
import { LoginUserDto } from "../dtos/login-user.dto";
import { BcryptUtil } from "../../../utils/bcrypt.util";

export class AuthController {
    // Define una instancia del servicio de autenticacion para interactuar con la base de datos.
    private service: AuthService;

    constructor() {
        // Inicializa el servicio de autenticacion.
        this.service = new AuthService();
    }

    public async login(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de usuario.
            const dto: LoginUserDto = plainToInstance(
                LoginUserDto,
                req.body
            );

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, los devuelve con un mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | UserController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            let data = await this.service.getByEmail(dto.email);

            // Si el usuario no existe, devuelve un mensaje de error.
            if (!data) {
                return res.status(404).json({
                    message: "User not found",
                    data: null,
                });
            }

            // comprobar si las constraseña coinciden
            const isMatch = BcryptUtil.comparePassword(
                dto.password,
                data.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid credentials",
                    data: null,
                });
            }

            
            //generar el token
            const token = await this.service.login(
                data.role.id,
                data.id
            );

            return res.status(200).json({
                message: "User Logged In",
                data: {
                    id: data?.id,
                    name: data?.name,
                    surname: data?.surname,
                    email: data?.email,
                    role: {
                        id: data?.role?.id,
                        name: data?.role?.name,
                    },
                    createdAt: data.created_at,
                    token,
                },
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Login | AuthController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}
