/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    debugger;
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log("requiredRoles", requiredRoles)
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log("user", user)
    return requiredRoles.includes(user.role);
  }
}
