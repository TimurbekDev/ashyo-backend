import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductFilter } from './interfaces/product-filter.interface';
import { ApiConsumes, ApiOperation, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { ProductFilterDto } from './dto/filter.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({summary: "Create product"})
  @ApiConsumes("multipart/form-data")
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body(new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      exceptionFactory: (error)=>{
        console.log(error)
      }
    })) createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image)
    createProductDto.image = image
    return this.productService.create(createProductDto);
  }

  @ApiQuery({
    type : Number,
    description : 'page',
    name : 'page',
    default: 1,
    required : true
  })
  @ApiQuery({
    type : Number,
    description : 'limit',
    name : 'limit',
    default: 100,
    required : true
  })
  @ApiQuery({
    type: String,
    description: 'search',
    name: "search",
    required: false
  })

  @ApiQuery({
    type: Number,
    description: "categoryId",
    name: "categoryId",
    required: false,
  })

  @ApiQuery({
    type: Number,
    description: "maxPrice",
    name: "maxPrice",
    required: false,
  })
  @ApiQuery({
    type: Number,
    description: "minPrice",
    name: "minPrice",
    required: false,
  })


  @Get()
  findAll(
    @Query(new ValidationPipe({whitelist: true})) params: ProductFilterDto,
  ) {
    console.log(params)
    return this.productService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update({
      id,
      ...updateProductDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(+id);
  }
}
