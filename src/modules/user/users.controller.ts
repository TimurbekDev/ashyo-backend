import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config';
import { Roles, User } from '@prisma/client';
import { UserService } from './users.service';
import { Protected, Role } from '@decorators';
import { IUserResponse } from './interfaces';



@ApiTags("Users")
@ApiBearerAuth('auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @Protected(true)
  @Role([Roles.Admin])
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
    return this.usersService.create({ ...createUserDto, image: image});
  }


  @ApiOperation({ summary: 'Get all users' })
  @Protected(false)
  @Role([Roles.UnAuth])
  @Get()
  findAll(): Promise<IUserResponse> {
    return this.usersService.findAll();
  }


  @ApiOperation({summary: "Get user by id"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @ApiOperation({summary: "Update user by id"})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor("image")
  )
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.usersService.update(id, { ...updateUserDto, image: image });
  }



  @ApiOperation({summary: "Delete user by id"})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
