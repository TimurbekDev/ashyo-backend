import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Roles, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { ICreateUserRequest, ICreateUserResponse, IUpdateUserRequest } from './interfaces';
import { HASH_SALT } from '@config';
import { readdirSync, unlinkSync } from 'fs';
import { CreateUserDto } from './dtos';
import { UploadService } from '../upload';

@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(UploadService) private uploadService: UploadService
  ) { }

  async create(payload: CreateUserDto): Promise<ICreateUserResponse> {

    const existUser = await this.findByEmail(payload.email);

    if (existUser)
      throw new BadRequestException('Email already in use')

    
    const userImage = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'users',
    })
    payload.password = await hash(payload.password, HASH_SALT);

    const user = await this.prismaService.user.create({
      data: {
        ...payload,
        image: userImage.imageUrl,
      }
    });

    return {
      message: 'User Created',
      user
    };
  }

  async findAll(): Promise<ICreateUserResponse> {

    const users = await this.prismaService.user.findMany({
      where: { role: Roles.User }
    });
    return {
      message: "All Users Retrieved",
      users
    }
  }

  async findOne(id: number): Promise<User> {

    const user = await this.prismaService.user.findFirst({
      where: { id: +id },
    });

    if (!user)
      throw new NotFoundException('User not found')

    return user
  }

  async update(payload: IUpdateUserRequest): Promise<ICreateUserResponse> {

    const existUser = await this.findOne(payload.id);
    console.log(payload);


    if (existUser.image && payload.image)
      unlinkSync(`${process.cwd()}/uploads/${existUser.image}`);

    if (!payload.email) delete payload.email
    if (!payload.image) delete payload.image

    delete payload.id
    const user = await this.prismaService.user.update({
      where: { id: existUser.id },
      data: payload
    });

    return {
      message: 'User Updated Successfully',
      user
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async remove(id: number): Promise<ICreateUserResponse> {

    await this.findOne(id)

    const deletedUser = await this.prismaService.user.delete({
      where: { id: +id },
    });

    if (deletedUser.image)
      unlinkSync(`${process.cwd()}/uploads/${deletedUser.image}`);

    return {
      message: 'User Deleted Successfully',
      user: deletedUser
    }
  }
}