import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Roles, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { IUpdateUserRequest, IUserResponse } from './interfaces';
import { HASH_SALT } from '@config';
import { readdirSync, unlinkSync } from 'fs';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UploadService } from '../upload';

@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(UploadService) private uploadService: UploadService,
  ) {}

  async create(payload: CreateUserDto): Promise<IUserResponse> {
    const existUser = await this.findByEmail(payload.email);

    if (existUser) throw new BadRequestException('Email already in use');

    const userImage = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'users',
    });
    payload.password = await hash(payload.password, HASH_SALT);

    const user = await this.prismaService.user.create({
      data: {
        ...payload,
        image: userImage.imageUrl,
      },
    });

    return {
      message: 'User Created',
      user,
    };
  }

  async findAll(): Promise<IUserResponse> {
    const users = await this.prismaService.user.findMany({
      where: { role: Roles.User },
    });
    return {
      message: 'All Users Retrieved',
      users,
    };
  }

  async findOne(id: number): Promise<IUserResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { id: +id },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      message: 'User Found',
      user,
    };
  }

  async update(id: number, payload: UpdateUserDto): Promise<IUserResponse> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if(!user){
      throw new NotFoundException("User not found")
    }
    let userImage = user.image

    if(payload.image){

      await this.uploadService.deleteFile({
        fileName: user.image
      })

      const userImageOptions = await this.uploadService.uploadFile({
        file: payload.image,
        destination: "user"
      })
      userImage = userImageOptions.imageUrl
    }
    await this.prismaService.user.update({
        where:  {id},
        data: {
          ...payload,
          image: userImage
        }
    })

    return {
      message: "Updates user",
      user
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async remove(id: number): Promise<IUserResponse> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    await this.prismaService.user.delete({
      where: {id}
    })
    await this.uploadService.deleteFile({
      fileName: user.image
    })
    return {
      message: 'Deleted user',
      user,
    };
  }
}
