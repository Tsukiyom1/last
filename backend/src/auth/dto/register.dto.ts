import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username:string
    @IsNotEmpty()
    @IsString()
    password:string
    @IsOptional()
    @IsString()
    displayName?:string
}