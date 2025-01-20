import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @Get()
  @CacheByUrl(10)
  findAll():Promise<ICategoryResponse> {
    return this.categoryService.findAll();
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
