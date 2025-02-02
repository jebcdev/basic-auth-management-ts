// Importa las clases necesarias de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express";

// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
import { plainToInstance } from "class-transformer";

// Importa las funciones de "class-validator" para realizar validaciones de datos.
import { validate, ValidationError } from "class-validator";

// Importa tipos de TypeORM para manejar resultados de actualizaciones.
import { UpdateResult } from "typeorm"

// Importa las entidades y servicios que gestionan los usuarios.
import {  UserService } from "../";

// Importa los DTOs (Data Transfer Objects) para la creación y actualización de usuarios.
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

;

export class UserController {

    // Define una instancia del servicio de usuarios para interactuar con la base de datos.
    private service: UserService;

    constructor() {
        // Inicializa el servicio de usuarios.
        this.service = new UserService();
    }

    // Método para obtener todos los usuarios.
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            // Llama al servicio para obtener todos los usuarios.
            const data: UserEntity[] | null = await this.service.getAll();

            // Si no se encontraron usuarios, devuelve un error 404.
            if (!data) {
                return res.status(404).json({
                    message: "No Users Found",
                    data: [],
                });
            }

            // Si los usuarios fueron encontrados, los devuelve con un mensaje de éxito.
            return res.status(200).json({
                message: "Users Fetched Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Users  | UserController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para obtener un usuario por su ID.
    public async getById(req: Request, res: Response): Promise<Response> {
        try {
            // Extrae el ID del usuario de los parámetros de la solicitud.
            const id = parseInt(req.params.id);

            // Llama al servicio para obtener el usuario por ID.
            const data = await this.service.getById(id);

            // Si no se encuentra el usuario, devuelve un error 404.
            if (!data) {
                return res.status(404).json({
                    message: "User Not Found",
                    data: null,
                });
            }

            // Si el usuario fue encontrado, lo devuelve con un mensaje de éxito.
            return res.status(200).json({
                message: "User Fetched Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching User | UserController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para crear un nuevo usuario.
    public async createNew(req: Request, res: Response): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de usuario.
            const dto: CreateUserDto = plainToInstance(CreateUserDto, req.body);

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, los devuelve con un mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | UserController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            // Verifica si el usuario ya existe en la base de datos por su nombre.
            const exists: UserEntity | null = await this.service.getByEmail(dto.email);

            // Si el usuario ya existe, devuelve un mensaje de error.
            if (exists) {
                return res.status(400).json({
                    message: "User Already Exists",
                    data: exists.name,
                });
            }

            // Crea el nuevo usuario usando el servicio y el DTO.
            const data: UserEntity | null = await this.service.createNew(
                plainToInstance(UserEntity, dto)
            );

            // Si hubo un error al crear el usuario, devuelve un mensaje de error.
            if (!data) {
                return res.status(500).json({
                    message: "Error Creating User",
                    data: null,
                });
            }

            // Si el usuario fue creado correctamente, lo devuelve con un mensaje de éxito.
            return res.status(201).json({
                message: "User Created Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Users  | UserController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para actualizar un usuario por su ID.
    public async updateById(req: Request, res: Response): Promise<Response> {
        try {
            // Extrae el ID del usuario de los parámetros de la solicitud.
            const id = parseInt(req.params.id);

            // Llama al servicio para obtener el usuario por ID.
            const toUpdate: UserEntity | null = await this.service.getById(id);

            // Si no se encuentra el usuario, devuelve un error 404.
            if (!toUpdate) {
                return res.status(404).json({
                    message: "User Not Found",
                    data: null,
                });
            }

            // Convierte el cuerpo de la solicitud a una instancia del DTO de actualización de usuario.
            const dto: UpdateUserDto = plainToInstance(UpdateUserDto, req.body);

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, los devuelve con un mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | UserController UpdateById",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            // Actualiza el usuario por su ID usando el servicio.
            const updatedData: UpdateResult | null = await this.service.updateById(
                id,
                plainToInstance(UserEntity, dto)
            );

            // Si hubo un error al actualizar, devuelve un mensaje de error.
            if (!updatedData) {
                return res.status(500).json({
                    message: "Error Updating User",
                    data: null,
                });
            }

            // Si la actualización fue exitosa, devuelve el usuario actualizado con un mensaje de éxito.
            return res.status(200).json({
                message: "User Updated Successfully",
                data: await this.service.getById(id),
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Users  | UserController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para eliminar un usuario por su ID.
    public async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            // Extrae el ID del usuario de los parámetros de la solicitud.
            const id = parseInt(req.params.id);

            // Llama al servicio para obtener el usuario por ID.
            const data: UserEntity | null = await this.service.getById(id);

            // Si no se encuentra el usuario, devuelve un error 404.
            if (!data) {
                return res.status(404).json({
                    message: "User Not Found",
                    data: null,
                });
            }

            // Llama al servicio para eliminar el usuario por su ID.
            const deleteResult = await this.service.deleteById(id);

            // Si hubo un error al eliminar el usuario, devuelve un mensaje de error.
            if (!deleteResult) {
                return res.status(500).json({
                    message: "Error Deleting User",
                    data: null,
                });
            }

            // Si el usuario fue eliminado exitosamente, devuelve un mensaje de éxito.
            return res.status(200).json({
                message: "User Deleted Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Users  | UserController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }
}
