import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateImageDto {
  
  @IsNotEmpty({message:'Поле text обязателен'})
  @IsString()
  image!:string
  

  
    @IsNotEmpty({message:'Поле userId обязателен'})
    @IsNumber()
    userId!:number;
  
    @IsNotEmpty({message:'Поле placeId обязателен'})
    @IsNumber()
    placeId:number;
}