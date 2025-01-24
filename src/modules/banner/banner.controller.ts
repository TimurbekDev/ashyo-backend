import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, ValidationPipe } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';

@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Create new banner' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) createBannerDto: CreateBannerDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    createBannerDto.image = image;
    return this.bannerService.create(createBannerDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get all banners' })
  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Get banner by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.findOne(id);
  }

  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Update banner by id' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Patch(':id')
  @UseInterceptors(FileInterceptor("image"))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true })) updateBannerDto: UpdateBannerDto,
    @UploadedFile() image: Express.Multer.File
  ) {

    updateBannerDto.image = image;

    return this.bannerService.update({
      id,
      ...updateBannerDto
    });
  }

  @ApiOperation({ summary: 'Delete banner by id' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.remove(id);
  }
}
