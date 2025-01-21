import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFiles, Query, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, Params, UpdateCategoryDto } from './dto';
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ICategoryResponse } from './interface';
import { CacheByUrl } from '@decorators';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new category' })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() files: {image: Express.Multer.File, icon: Express.Multer.File}
  ):Promise<ICategoryResponse> {
    return this.categoryService.create({...createCategoryDto,image: files.image, icon: files.icon});
  }


  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({
    name : 'name',
    required : false,
    default : 'salom'
  })
  @ApiQuery({
    name : 'limit',
    required : true,
    default : 10
  })
  @ApiQuery({
    name : 'page',
    required : true,
    default : 1
  })
  @Get()
  findAll(
    @Query(new ValidationPipe({ whitelist : true })) query:Params
  ):Promise<ICategoryResponse> {
    return this.categoryService.findAll(query);
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number):Promise<ICategoryResponse> {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update category by id' })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]))
  update(
    @Param('id',ParseIntPipe) id: number, 
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles() files: {image: Express.Multer.File, icon: Express.Multer.File,
    }
  ):Promise<ICategoryResponse> {
    return this.categoryService.update(
      id,
    {...updateCategoryDto,
      image: files.image,
      icon: files.icon
    },
    );
  }

  @ApiOperation({ summary: 'Delete category by id' })
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number):Promise<ICategoryResponse> {
    return this.categoryService.remove(id);
  }
}
