import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user';
import { PrismaService } from '@prisma';
import { ConfigService } from '@nestjs/config';
import { JwtCustomService } from '../jwt';
import { JwtService } from '@nestjs/jwt';
import { UploadService } from '../upload';

@Module({
  controllers: [AuthController],
  providers: [AuthService,UserService,PrismaService,JwtCustomService,JwtService,ConfigService,UploadService]
})
export class AuthModule {}
