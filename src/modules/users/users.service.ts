import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from "fs"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existsUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existsUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const existsUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existsUser) {
      throw new BadRequestException('User not found');
    }
    return existsUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    try {
      const existsUser = await this.prisma.user.findUnique({ where: { id } });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return { message: 'User updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const existsUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      fs.unlink(`${process.cwd()}/uploads/${existsUser.image}`,(error)=>{
        return {message: "User old image delete error"}       
      })
  

      await this.prisma.user.delete({ where: { id } });

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  
}
