import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService:AuthService){}

  async canActivate(context: ExecutionContext):  Promise<boolean> {
    const request =  context.switchToHttp().getRequest()

    const token = request.header("Authorization")

    console.log(token,'token');
    
    if (!token) {
      throw new UnauthorizedException('no token present')
    }


    const user =  await this.authService.getUserByToken(token)

    console.log(user,'user');
    

    if(!user) {
      throw new UnauthorizedException('wrong token')
    }

    request.user = user
    return true
  }
}