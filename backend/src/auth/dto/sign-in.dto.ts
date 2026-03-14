import { IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  username:string
  @IsNotEmpty()
  @IsString()
  password:string
}