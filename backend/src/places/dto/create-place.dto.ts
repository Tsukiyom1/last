import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaceDto {
  @IsNotEmpty({message:"Name is required"})
  @IsString()
  name!:string;


  @IsNotEmpty({message:"Name is required"})
  @IsString()
  description!:string;

  @IsNotEmpty({message:"Name is required"})
  @IsString()
  main_image:string;
  
  
  @IsNotEmpty({message:"Name is required"})
  @IsNumber()
  userId!:number;
}