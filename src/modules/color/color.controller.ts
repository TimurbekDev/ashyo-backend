import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto, UpdateColorDto } from './dto';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Create color'
  })
  @ApiBearerAuth('auth')
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @ApiOperation({ summary: 'Get all colors' })
  @Public()
  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @ApiOperation({ summary: 'Get color by id' })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.findOne(id);
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Update color by id'
  })
  @ApiBearerAuth('auth')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update({
      id,
      ...updateColorDto
    });
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Delete color by id'
  })
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.remove(id);
  }
}
