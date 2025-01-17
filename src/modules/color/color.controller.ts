import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto, UpdateColorDto } from './dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update({
      id,
      ...updateColorDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.remove(+id);
  }
}
