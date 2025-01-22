import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './users.service';
import { IUserResponse } from './interfaces';
import { Public, Roles } from '@decorators';
import { Roles as UserRoles } from '@prisma/client';



@ApiTags("Users")
@ApiBearerAuth('auth')
@Roles(UserRoles.Admin)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image")
  )
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.create({ ...createUserDto, image: image });
  }


  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll(): Promise<IUserResponse> {
    return this.usersService.findAll();
  }


  @ApiOperation({ summary: "Get user by id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @ApiOperation({ summary: "Update user by id" })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image")
  )
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.usersService.update(id, { ...updateUserDto, image: image });
  }



  @ApiOperation({ summary: "Delete user by id" })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
