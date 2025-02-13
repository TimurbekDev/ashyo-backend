import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { UpdateRegionDto } from './dto/update-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';

@ApiTags('Region')
@Controller('region')
export class RegionController {

  constructor(private readonly regionService: RegionService) { }
  @ApiOperation({ summary: 'Create new region' })
  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @Post()
  create(@Body() createregionDto: CreateRegionDto) {
    return this.regionService.create(createregionDto);
  }


  @Public()
  @ApiOperation({ summary: 'Get all region' })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Get region by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }

  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Update region by id' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update({
      id,
      name: updateRegionDto.name,
      parentId: updateRegionDto.parentId
    });
  }

  @Roles(UserRoles.Admin)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete region by id' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.remove(id);
  }
}
