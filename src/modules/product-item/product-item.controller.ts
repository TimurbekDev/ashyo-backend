import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) { }

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createProductItemDto: CreateProductItemDto,
    @UploadedFile() file: Express.Multer.File
  ) {        
    createProductItemDto.image = file    
    return this.productItemService.create(createProductItemDto);
  }

  @Get()
  @ApiQuery({
    type : Number,
    description : 'page',
    name : 'page',
    required : true
  })
  @ApiQuery({
    type : Number,
    description : 'limit',
    name : 'limit',
    required : true
  })
  findAll(
    @Query('page',ParseIntPipe) page:number,
    @Query('limit',ParseIntPipe) limit:number,
  ) {    
    return this.productItemService.findAll({ page , limit });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductItemDto: UpdateProductItemDto) {
    return this.productItemService.update({
      id,
      ...updateProductItemDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productItemService.remove(+id);
  }
}
