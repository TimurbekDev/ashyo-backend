import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductFilter } from './interfaces/product-filter.interface';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductFilterDto } from './dto/filter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: "Create product" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image"))
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Post()
  create(
    @Body(new ValidationPipe({
      whitelist: true,
    })) createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createProductDto.image = image
    return this.productService.create(createProductDto);
  }

  @ApiQuery({
    description: 'Varaion-Options id',
    name : 'varationOptionIds',
    required : false,
    type: [Number],
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
  @ApiQuery({
    type: Number,
    description: 'limit',
    name: 'limit',
    default: 100,
    required: true
  })
  @ApiQuery({
    type: Number,
    description: 'page',  
    name: 'page',
    default: 1,
    required: true
  })
  @ApiOperation({
    summary: 'Get all products '
  })
  @Public()
  @Get()
  findAll(
    @Query(new ValidationPipe({ whitelist: true })) params: ProductFilterDto,
  ) {
    return this.productService.findAll(params);
  }

  // @Public()
  // @Get('/most-populars')
  // findPopularProducts() {
  //   return this.productService.findPopulatProducts();
  // }

  @Public()
  @ApiOperation({
    summary: 'Get product by id '
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Update product by id '
  })
  @ApiBearerAuth('auth')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update({
      id,
      ...updateProductDto
    });
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Delete product by id '
  })
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(+id);
  }
}
