import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateFeedbackDto {
@IsNotEmpty({message:'Поле text обязателен'})
@IsString()
  text!:string;
  
  @IsNotEmpty({message:'Поле food обязателен'})
  @IsNumber()
  food!:number;

  @IsNotEmpty({message:'Поле service обязателен'})
  @IsNumber()
  service!:number;
  
  @IsNotEmpty({message:'Поле interior обязателен'})
  @IsNumber()
  interior!:number;



  @IsNotEmpty({message:'Поле userId обязателен'})
  @IsNumber()
  userId!:number;

  @IsNotEmpty({message:'Поле placeId обязателен'})
  @IsNumber()
  placeId:number;


}