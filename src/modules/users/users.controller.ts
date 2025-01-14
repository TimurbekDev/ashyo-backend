import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config';
import { User } from '@prisma/client';


@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}




  @ApiOperation({summary: "Yangi user yaratish"})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image",multerConfig)
  )
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.create({...createUserDto,image: image ? image.filename : ""});
  }

  @ApiOperation({summary: "Barcha userlarni olish"})
  @Get()
  findAll():Promise<User[]> {
    return this.usersService.findAll();
  }


  @ApiOperation({summary: "Bitta userni id bo'yicha olish"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image",multerConfig)
  )
  @ApiOperation({summary: "Bitta userni id orqali topib malumotlarini tahrirlash"})
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.update(+id, {...updateUserDto,image: image ? image.filename : "" });
  }


  @ApiOperation({summary: "Bitta userni id orqali o'chirish"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }



  
}
