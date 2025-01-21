import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IBrandResponse } from './interfaces';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';

@ApiTags('Brend')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }


  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Create new brand' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() image: Express.Multer.File
  ): Promise<IBrandResponse> {
    return this.brandService.create({ ...createBrandDto, image: image });
  }

  @Public()
  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  findAll(): Promise<IBrandResponse> {
    return this.brandService.findAll();
  }


  @Public()
  @ApiOperation({ summary: 'Get brand by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IBrandResponse> {
    return this.brandService.findOne(+id);
  }


  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Update brand by id' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Patch(':id')
  @UseInterceptors(FileInterceptor("image"))
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.brandService.update(+id, { ...updateBrandDto, image: image });
  }


  @ApiOperation({ summary: 'Delete brand by id' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
