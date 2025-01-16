import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) {}

  @ApiConsumes("multipart/form-data")
  @ApiOperation({summary: "Create product item"})
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createProductItemDto: CreateProductItemDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.productItemService.create({...createProductItemDto,image: image});
  }

  @Get()
  findAll() {
    return this.productItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update(+id, updateProductItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productItemService.remove(+id);
  }
}
