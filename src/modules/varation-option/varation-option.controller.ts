import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VarationOptionService } from './varation-option.service';
import { CreateVarationOptionDto } from './dto/create-varation-option.dto';
import { UpdateVarationOptionDto } from './dto/update-varation-option.dto';

@Controller('varation-option')
export class VarationOptionController {
  constructor(private readonly varationOptionService: VarationOptionService) { }

  @Post()
  create(@Body() createVarationOptionDto: CreateVarationOptionDto) {
    return this.varationOptionService.create(createVarationOptionDto);
  }

  @Get()
  findAll() {
    return this.varationOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.varationOptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVarationOptionDto: UpdateVarationOptionDto) {
    return this.varationOptionService.update({
      id,
      ...updateVarationOptionDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.varationOptionService.remove(id);
  }
}
