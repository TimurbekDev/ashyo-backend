import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IBrandResponse } from './interfaces';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}


  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Create new brand' })
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() image: Express.Multer.File
  ):Promise<IBrandResponse> {
    return this.brandService.create({...createBrandDto,image: image});
  }

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  findAll():Promise<IBrandResponse> {
    return this.brandService.findAll();
  }


  @ApiOperation({ summary: 'Get brand by id' })
  @Get(':id')

  findOne(@Param('id',ParseIntPipe) id: number):Promise<IBrandResponse> {
    return this.brandService.findOne(+id);
  }


  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Update brand by id' })
  @Patch(':id')
  @UseInterceptors(FileInterceptor("image"))
  update(
    @Param('id') id: string, 
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.brandService.update(+id, {...updateBrandDto,image: image});
  }


  @ApiOperation({ summary: 'Delete brand by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
