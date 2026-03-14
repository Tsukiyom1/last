import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";



@Injectable()
export class RolesGuard implements CanActivate{

  constructor(private readonly roles:string[]){}
  canActivate(context: ExecutionContext): boolean  {
    const request = context.switchToHttp().getRequest()

    const user =  request.user as {role?:string} | undefined

    if (!user || !user.role || !this.roles.includes(user.role)) {
      throw new ForbiddenException({error:'permission denied'})
    }

    return true 
  }
}