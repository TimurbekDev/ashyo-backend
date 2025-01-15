import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VarationService } from './varation.service';
import { CreateVarationDto } from './dto/create-varation.dto';
import { UpdateVarationDto } from './dto/update-varation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Varation')
@Controller('varation')
export class VarationController {

  constructor(private readonly varationService: VarationService) { }

  @Post()
  create(@Body() createVarationDto: CreateVarationDto) {
    return this.varationService.create(createVarationDto);
  }

  @Get()
  findAll() {
    return this.varationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.varationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVarationDto: UpdateVarationDto) {
    return this.varationService.update({
      id,
      name: updateVarationDto.name,
      categoryId: updateVarationDto.categoryId
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.varationService.remove(id);
  }
}
