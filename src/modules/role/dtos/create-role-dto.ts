import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 100)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 255)
    description: string;
}
