// Importa las clases necesarias de Express para manejar solicitudes y respuestas HTTP.
import { Request, Response } from "express";

// Importa funciones de "class-transformer" para transformar datos planos a instancias de clases.
import { plainToInstance } from "class-transformer";

// Importa las funciones de "class-validator" para realizar validaciones de datos.
import { validate, ValidationError } from "class-validator";

// Importa tipos de TypeORM para manejar resultados de actualizaciones.
import { UpdateResult } from "typeorm"

// Importa las entidades y servicios que gestionan los roles.
import { RoleEntity, RoleService } from "../";

// Importa los DTOs (Data Transfer Objects) para la creación y actualización de roles.
import { CreateRoleDto, UpdateRoleDto } from "../dtos";

;

export class RoleController {

    // Define una instancia del servicio de roles para interactuar con la base de datos.
    private service: RoleService;

    constructor() {
        // Inicializa el servicio de roles.
        this.service = new RoleService();
    }

    // Método para obtener todos los roles.
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            // Llama al servicio para obtener todos los roles.
            const data: RoleEntity[] | null = await this.service.getAll();

            // Si no se encontraron roles, devuelve un error 404.
            if (!data) {
                return res.status(404).json({
                    message: "No Roles Found",
                    data: [],
                });
            }

            // Si los roles fueron encontrados, los devuelve con un mensaje de éxito.
            return res.status(200).json({
                message: "Roles Fetched Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para obtener un rol por su ID.
    public async getById(req: Request, res: Response): Promise<Response> {
        try {
            // Extrae el ID del rol de los parámetros de la solicitud.
            const id = parseInt(req.params.id);

            // Llama al servicio para obtener el rol por ID.
            const data = await this.service.getById(id);

            // Si no se encuentra el rol, devuelve un error 404.
            if (!data) {
                return res.status(404).json({
                    message: "Role Not Found",
                    data: null,
                });
            }

            // Si el rol fue encontrado, lo devuelve con un mensaje de éxito.
            return res.status(200).json({
                message: "Role Fetched Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Role | RoleController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para crear un nuevo rol.
    public async createNew(req: Request, res: Response): Promise<Response> {
        try {
            // Convierte el cuerpo de la solicitud (req.body) a una instancia del DTO de creación de rol.
            const dto: CreateRoleDto = plainToInstance(CreateRoleDto, req.body);

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, los devuelve con un mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | RoleController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            // Verifica si el rol ya existe en la base de datos por su nombre.
            const exists: RoleEntity | null = await this.service.getByName(dto.name);

            // Si el rol ya existe, devuelve un mensaje de error.
            if (exists) {
                return res.status(400).json({
                    message: "Role Already Exists",
                    data: exists.name,
                });
            }

            // Crea el nuevo rol usando el servicio y el DTO.
            const data: RoleEntity | null = await this.service.createNew(
                plainToInstance(RoleEntity, dto)
            );

            // Si hubo un error al crear el rol, devuelve un mensaje de error.
            if (!data) {
                return res.status(500).json({
                    message: "Error Creating Role",
                    data: null,
                });
            }

            // Si el rol fue creado correctamente, lo devuelve con un mensaje de éxito.
            return res.status(201).json({
                message: "Role Created Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para actualizar un rol por su ID.
    public async updateById(req: Request, res: Response): Promise<Response> {
        try {
            // Extrae el ID del rol de los parámetros de la solicitud.
            const id = parseInt(req.params.id);

            // Llama al servicio para obtener el rol por ID.
            const toUpdate: RoleEntity | null = await this.service.getById(id);

            // Si no se encuentra el rol, devuelve un error 404.
            if (!toUpdate) {
                return res.status(404).json({
                    message: "Role Not Found",
                    data: null,
                });
            }

            // Convierte el cuerpo de la solicitud a una instancia del DTO de actualización de rol.
            const dto: UpdateRoleDto = plainToInstance(UpdateRoleDto, req.body);

            // Valida los datos del DTO.
            const errors: ValidationError[] = await validate(dto);

            // Si hay errores de validación, los devuelve con un mensaje de error.
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | RoleController CreateNew",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            // Actualiza el rol por su ID usando el servicio.
            const updatedData: UpdateResult | null = await this.service.updateById(
                id,
                plainToInstance(RoleEntity, dto)
            );

            // Si hubo un error al actualizar, devuelve un mensaje de error.
            if (!updatedData) {
                return res.status(500).json({
                    message: "Error Updating Role",
                    data: null,
                });
            }

            // Si la actualización fue exitosa, devuelve el rol actualizado con un mensaje de éxito.
            return res.status(200).json({
                message: "Role Updated Successfully",
                data: await this.service.getById(id),
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }

    // Método para eliminar un rol por su ID.
    public async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            // Extrae el ID del rol de los parámetros de la solicitud.
            const id = parseInt(req.params.id);

            // Llama al servicio para obtener el rol por ID.
            const data: RoleEntity | null = await this.service.getById(id);

            // Si no se encuentra el rol, devuelve un error 404.
            if (!data) {
                return res.status(404).json({
                    message: "Role Not Found",
                    data: null,
                });
            }

            // Llama al servicio para eliminar el rol por su ID.
            const deleteResult = await this.service.deleteById(id);

            // Si hubo un error al eliminar el rol, devuelve un mensaje de error.
            if (!deleteResult) {
                return res.status(500).json({
                    message: "Error Deleting Role",
                    data: null,
                });
            }

            // Si el rol fue eliminado exitosamente, devuelve un mensaje de éxito.
            return res.status(200).json({
                message: "Role Deleted Successfully",
                data,
            });
        } catch (error) {
            // Maneja cualquier error inesperado y devuelve un mensaje de error.
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }
}
