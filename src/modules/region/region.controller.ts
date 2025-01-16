import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { UpdateRegionDto } from './dto/update-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';

@ApiTags('Region')
@Controller('region')
export class RegionController {

  constructor(private readonly regionService: RegionService) { }
  @ApiOperation({ summary: 'Create new region' })
  @Post()
  create(@Body() createregionDto: CreateRegionDto) {
    return this.regionService.create(createregionDto);
  }


  @ApiOperation({ summary: 'Get all region' })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }


  @ApiOperation({ summary: 'Get region by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }


  @ApiOperation({ summary: 'Update region by id' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update({
      id,
      name: updateRegionDto.name,
      parentId: updateRegionDto.parentId
    });
  }

  @ApiOperation({ summary: 'Delete region by id' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.remove(id);
  }
}
