import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

import { RoleEntity, RoleService } from "../";
import { CreateRoleDto, UpdateRoleDto } from "../dtos";
import { UpdateResult } from "typeorm";

export class RoleController {
    private roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    public async getAll(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const roles: RoleEntity[] | null =
                await this.roleService.getAll();

            if (!roles) {
                return res.status(404).json({
                    message: "No Roles Found",
                    data: [],
                });
            }

            return res.status(200).json({
                message: "Roles Fetched Successfully",
                data: roles,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id=parseInt(req.params.id);

            const role=await this.roleService.getById(id);

            if(!role){
                return res.status(404).json({
                    message:"Role Not Found",
                    data:null
                });
            }

            return res.status(200).json({
                message:"Role Fetched Successfully",
                data:role
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Role | RoleController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async createNew(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const roleDto: CreateRoleDto = plainToInstance(
                CreateRoleDto,
                req.body
            );

            const errors:ValidationError[] = await validate(roleDto);

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

            const roleExists:RoleEntity|null=await this.roleService.getByName(roleDto.name);

            if(roleExists){
                return res.status(400).json({
                    message:"Role Already Exists",
                    data:roleExists.name
                });
            }

            const newRole: RoleEntity | null = await this.roleService.createNew(
                plainToInstance(
                    RoleEntity,
                    roleDto
                )
            )

            if (!newRole) {
                return res.status(500).json({
                    message: "Error Creating Role",
                    data: null,
                });
            }

            return res.status(201).json({
                message: "Role Created Successfully",
                data: newRole,
            });
                
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async updateById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id=parseInt(req.params.id);

            const roleToUpdate:RoleEntity|null=await this.roleService.getById(id);

            if(!roleToUpdate){
                return res.status(404).json({
                    message:"Role Not Found",
                    data:null
                });
            }

            const roleDto: UpdateRoleDto = plainToInstance(
                UpdateRoleDto,
                req.body
            );

            const errors:ValidationError[] = await validate(roleDto);

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


            const updatedRole:UpdateResult|null=await this.roleService.updateById(
                id,
                plainToInstance(
                    RoleEntity,
                    roleDto
                ));

            if(!updatedRole){
                return res.status(500).json({
                    message:"Error Updating Role",
                    data:null
                });
            }

            return res.status(200).json({
                message:"Role Updated Successfully",
                data:await this.roleService.getById(id),
            });
                
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async deleteById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id=parseInt(req.params.id);

            const roleToDelete:RoleEntity|null=await this.roleService.getById(id);

            if(!roleToDelete){
                return res.status(404).json({
                    message:"Role Not Found",
                    data:null
                });}

                const deleteResult=await this.roleService.deleteById(id);

                if(!deleteResult){
                    return res.status(500).json({
                        message:"Error Deleting Role",
                        data:null
                    });
                }

                return res.status(200).json({
                    message:"Role Deleted Successfully",
                    data:roleToDelete
                });

              } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Roles | RoleController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}
