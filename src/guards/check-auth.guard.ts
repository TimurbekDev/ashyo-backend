// import {
//     BadRequestException,
//     CanActivate,
//     ExecutionContext,
//     Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { JwtCustomService, TokenType, UserRoles } from '@modules';
// import { Protected } from '@decorators';

// export declare interface RequestInterface extends Request {
//     userId: string | undefined;
//     role: string | undefined
// }

// @Injectable()
// export class CheckAuthGuard implements CanActivate {
//     constructor(private reflector: Reflector, private jwtService: JwtCustomService) { }

//     async canActivate(
//         context: ExecutionContext,
//     ): Promise<boolean> {
//         const ctx = context.switchToHttp();
//         const request = ctx.getRequest<RequestInterface>();

//         const isProtected = this.reflector.get<boolean>(
//             Protected,
//             context.getHandler(),
//         );

//         if (!isProtected) {
//             request.role = UserRoles.BASIC
//             return true;
//         }

//         const bearerToken = request.headers['authorization'];

//         if (
//             !(
//                 bearerToken &&
//                 bearerToken.startsWith('Bearer') &&
//                 bearerToken.split('Bearer ')[1]?.length
//             )
//         ) {
//             throw new BadRequestException('Please provide valid bearer token');
//         }

//         const token = bearerToken.split('Bearer ')[1];

//         const payload = await this.jwtService.verifyToken(token, TokenType.Access)

//         request.userId = payload.userId
//         request.role = payload.role

//         return true; 
//     }
// }