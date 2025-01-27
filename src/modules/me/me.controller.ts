import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MeService } from './me.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators';
import { Roles as UserRoles } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Me")
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}


  @ApiOperation({summary: "Get me"})
  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiBearerAuth('auth')
  @Get()
  findOne(
    @Request() request: any,
  ) {
    return this.meService.getMe(request["user"].userId)
  }

  @ApiOperation({summary: "Update me"})
  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiBearerAuth('auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Patch()
  update(
    @Body() updateMeDto: UpdateMeDto,
    @Request() request: any,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.meService.meUpdate({...updateMeDto,image: image, id: request["user"].userId});
  }

  @ApiOperation({summary: "Delete me"})
  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiBearerAuth('auth')
  @Delete()
  remove(
    @Request() request: any,
  ) {
    return this.meService.remove(request["user"].userId);
  }
}
