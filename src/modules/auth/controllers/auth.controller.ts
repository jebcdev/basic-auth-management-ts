// Importa las clases necesarias de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express";

// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
import { plainToInstance } from "class-transformer";

// Importa las funciones de "class-validator" para realizar validaciones de datos.
import { validate, ValidationError } from "class-validator";

// Importa tipos de TypeORM para manejar resultados de actualizaciones.
import { UpdateResult } from "typeorm";

// Importa el servicio de autenticación para manejar la lógica de negocio.
import { AuthService } from "../services/auth.service";

// Importar los DTOs para la validación de datos de entrada.
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";

// Importa utilidades para manejar el hashing de contraseñas y la generación de tokens JWT.
import { BcryptUtil } from "../../../utils/bcrypt.util";
import { JwtUtil } from "../../../utils/jwt.util";

// Importa la entidad de usuario para interactuar con la base de datos.
import { UserEntity } from "../../user/entities/user.entity";

// Define la clase AuthController para manejar la autenticación de usuarios.
export class AuthController {
    // Define una instancia del servicio de autenticación para interactuar con la base de datos.
    private service: AuthService;

    constructor() {
        // Inicializa el servicio de autenticación.
        this.service = new AuthService();
    }

    // Método para manejar el inicio de sesión de usuarios.
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de inicio de sesión.
            const dto: LoginUserDto = plainToInstance(LoginUserDto, req.body);

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, devuelve una respuesta con el mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | UserController CreateNew",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Obtiene el usuario por su correo electrónico.
            let data = await this.service.getByEmail(dto.email);

            // Si el usuario no existe, devuelve un mensaje de error.
            if (!data) {
                return res.status(401).json({
                    message: "Invalid Credentials",
                    data: null,
                });
            }

            // Comprueba si la contraseña ingresada coincide con la almacenada (hasheada).
            const isMatch = await BcryptUtil.comparePassword(dto.password, data.password);

            // Si las contraseñas no coinciden, devuelve un mensaje de error.
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Credentials",
                    data: null,
                });
            }

            // Genera un token JWT para el usuario autenticado.
            const token = await this.service.login(data.role.id, data.id);

            // Devuelve una respuesta exitosa con la información del usuario y el token.
            return res.status(200).json({
                message: "User Logged In",
                data: {
                    id: data.id,
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    role: {
                        id: data.role.id,
                        name: data.role.name,
                    },
                    createdAt: data.created_at,
                    token,
                },
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(401).json({
                message: "Unauthorized",
                data: null,
            });
        }
    }

    // Método para obtener el perfil del usuario autenticado.
    public async profile(req: Request, res: Response): Promise<Response> {
        try {
            // Obtiene el token de autorización de los encabezados de la solicitud.
            const token: string = req.headers.authorization?.split(" ")[1] as string;

            // Verifica la validez del token.
            const decoded = await JwtUtil.verifyToken(token);

            // Extrae el ID del usuario del token decodificado.
            const id: number = Number(decoded?.data?.user_id);

            // Si no se obtiene un ID válido, devuelve un error de autorización.
            if (!id) {
                return res.status(401).json({
                    message: "Unauthorized",
                    data: null,
                });
            }

            // Obtiene los datos del usuario por su ID.
            const data = await this.service.getById(id);

            // Si el usuario no existe, devuelve un error de autorización.
            if (!data) {
                return res.status(401).json({
                    message: "Unauthorized",
                    data: null,
                });
            }

            // Devuelve la información del perfil del usuario.
            return res.status(200).json({
                message: "User Profile",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(500).json({
                message: "Unauthorized",
                data: null,
            });
        }
    }

    // Método para registrar un nuevo usuario.
    public async register(req: Request, res: Response): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de registro de usuario.
            const dto: RegisterUserDto = plainToInstance(RegisterUserDto, req.body);

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, devuelve una respuesta con el mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | AuthController Register",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Verifica si el usuario ya existe en la base de datos por su correo electrónico.
            const exists: UserEntity | null = await this.service.getByEmail(dto.email);

            // Si el usuario ya existe, devuelve un mensaje de error.
            if (exists) {
                return res.status(400).json({
                    message: "User Already Exists",
                    data: exists.name,
                });
            }

            // Hashea la contraseña antes de guardarla en la base de datos.
            dto.password = await BcryptUtil.hashPassword(dto.password);

            // Crea el nuevo usuario usando el servicio y el DTO.
            let data: UserEntity | null = await this.service.register(plainToInstance(UserEntity, dto));

            // Si hubo un error al crear el usuario, devuelve un mensaje de error.
            if (!data) {
                return res.status(500).json({
                    message: "Error Registering User",
                    data: null,
                });
            }

            data=await this.service.getByEmail(data.email);


            // Si el usuario fue creado correctamente, devuelve los datos del usuario registrado.
            return res.status(201).json({
                message: "User Registered Successfully",
                data: {
                    id: data?.id,
                    name: data?.name,
                    surname: data?.surname,
                    email: data?.email,
                    role: {
                        id: data?.role.id,
                        name: data?.role.name,
                    },
                    createdAt: data?.created_at,
                },
            });
        } catch (error) {
            console.log(error);
            // Maneja cualquier error inesperado y devuelve un mensaje de error genérico.
            return res.status(401).json({
                message: "Error Registering User",
                data: null,
            });
        }
    }
}