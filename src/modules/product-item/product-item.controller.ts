import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, Query, ValidationPipe } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';
import { GetAllPrItemsQuery } from './dto';

@ApiTags('Product-Items')
@Controller('product-item')
export class ProductItemController {
  constructor(private readonly productItemService: ProductItemService) { }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Create product-item'
  })
  @ApiBearerAuth('auth')
  @Post()
  create(
    @Body(new ValidationPipe({whitelist : true})) createProductItemDto: CreateProductItemDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    createProductItemDto.image = file;
    console.log(createProductItemDto);
    return this.productItemService.create(createProductItemDto);
  }

  @ApiOperation({ summary : 'Get all product-items'})
  @Public()
  @Get()
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
  findAll(
    @Query(new ValidationPipe({ whitelist: true })) query:GetAllPrItemsQuery,
  ) {
    return this.productItemService.findAll(query);
  }

  @ApiOperation({ summary : 'Get product-item by id'})
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productItemService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Update product-item by id'
  })
  @ApiBearerAuth('auth')
  @Patch()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductItemDto: UpdateProductItemDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    updateProductItemDto.image = image;
    return this.productItemService.update({
      id,
      ...updateProductItemDto
    });
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Delete product-item'
  })
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productItemService.remove(+id);
  }
}
