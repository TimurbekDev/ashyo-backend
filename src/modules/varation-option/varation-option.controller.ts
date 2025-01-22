import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VarationOptionService } from './varation-option.service';
import { CreateVarationOptionDto } from './dto/create-varation-option.dto';
import { UpdateVarationOptionDto } from './dto/update-varation-option.dto';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Varation-Options')
@Controller('varation-option')
export class VarationOptionController {
  constructor(private readonly varationOptionService: VarationOptionService) { }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Create varation-option'
  })
  @ApiBearerAuth('auth')
  @Post()
  create(@Body() createVarationOptionDto: CreateVarationOptionDto) {
    return this.varationOptionService.create(createVarationOptionDto);
  }

  @Public()
  @ApiOperation({
    summary: 'Get all varation-options'
  })
  @Get()
  findAll() {
    return this.varationOptionService.findAll();
  }

  @Public()
  @ApiOperation({
    summary: 'Get varation-option by id'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.varationOptionService.findOne(id);
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Update varation-option by id'
  })
  @ApiBearerAuth('auth')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVarationOptionDto: UpdateVarationOptionDto) {
    return this.varationOptionService.update({
      id,
      ...updateVarationOptionDto
    });
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Delete varation-option by id'
  })
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.varationOptionService.remove(id);
  }
}
