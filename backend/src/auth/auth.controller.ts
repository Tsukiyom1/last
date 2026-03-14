import { Body, Controller, Delete, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/sign-in.dto";
import { RegisterDto } from "./dto/register.dto";
import {Request} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly service:AuthService){}

  @Post('sign-in')
  async signIn(@Body() dto:SigninDto) {
    return this.service.login(dto)
  }


  @Post('register')
  async register(@Body() dto:RegisterDto) {
    return this.service.register(dto)
  }

  @Delete()
  async logout(@Req() req:Request) {
    const token = req.header('Authorization') || ''
    await this.service.logout(token)
    return {message:"success"}
  }
}