import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config';
import { Roles, User } from '@prisma/client';
import { UserService } from './users.service';
import { Protected, Role } from '@decorators';
import { ICreateUserResponse } from './interfaces';


@ApiTags("Users")
@ApiBearerAuth('auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @Protected(true)
  @Role([Roles.Admin])
  @ApiOperation({ summary: "Yangi user yaratish" })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image")
  )
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.create({ ...createUserDto, image: image});
  }


  @Protected(false)
  @Role([Roles.UnAuth])
  @ApiOperation({ summary: "Barcha userlarni olish" })
  @Get()
  findAll(): Promise<ICreateUserResponse> {
    return this.usersService.findAll();
  }


  @ApiOperation({ summary: "Bitta userni id bo'yicha olish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image", multerConfig)
  )
  @ApiOperation({ summary: "Bitta userni id orqali topib malumotlarini tahrirlash" })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.update({
      ...updateUserDto,
      id,
      image: image && image.filename || undefined
    });
  }


  @ApiOperation({ summary: "Bitta userni id orqali o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
