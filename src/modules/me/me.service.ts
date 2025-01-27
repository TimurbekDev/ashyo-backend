import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMeDto } from './dto/update-me.dto';
import { IGetMeResponse } from './interfaces';
import { HASH_SALT } from '@config';
import { hash } from 'bcrypt';
import { UploadService } from '../upload';
import { PrismaService } from '@prisma';


@Injectable()
export class MeService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(UploadService) private uploadService: UploadService
  ){}
  async getMe(id: number):Promise<IGetMeResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { id: id },
    })
    if(!user){
      throw new NotFoundException("User not found")
    }
    return {
      message: "User retrieved",
      user,
    }
  }

  async meUpdate(payload: UpdateMeDto): Promise<IGetMeResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { id: payload.id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    let hashedPassword = user.password;
    if (payload.password) {
      hashedPassword = await hash(payload.password, HASH_SALT);
    }
  
    let currentImage = user.image;
    if (payload.image) {
      const imageOptions = await this.uploadService.uploadFile({
        file: payload.image,
        destination: 'user',
      });
      currentImage = imageOptions.imageUrl;
      if (user.image) {
        await this.uploadService.deleteFile({ fileName: user.image });
      }
    }
  
    const updatedUser = await this.prismaService.user.update({
      where: { id: payload.id },
      data: {
        email: payload.email || user.email,
        fullName: payload.fullName || user.fullName,
        image: currentImage,
        password: hashedPassword,
      },
    });
  
    return {
      message: 'User updated',
      user: updatedUser,
    };
  }
  
  


  async remove(id: number):Promise<IGetMeResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prismaService.user.delete({
      where: { id: id },
    });

    await this.uploadService.deleteFile({ fileName: user.image });
    return {
      message: 'User removed',
      user,
    };
  }
}
