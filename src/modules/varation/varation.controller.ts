import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VarationService } from './varation.service';
import { CreateVarationDto } from './dto/create-varation.dto';
import { UpdateVarationDto } from './dto/update-varation.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '@decorators';
import { Roles as UserRoles } from '@prisma/client';

@ApiTags('Varation')
@Controller('varation')
export class VarationController {

  constructor(private readonly varationService: VarationService) { }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Create varation'
  })
  @ApiBearerAuth('auth')
  @Post()
  create(@Body() createVarationDto: CreateVarationDto) {
    return this.varationService.create(createVarationDto);
  }

  @Public()
  @ApiOperation({ summary : 'Get all varations'})
  @Get()
  findAll() {
    return this.varationService.findAll();
  }

  @Public()
  @ApiOperation({ summary : 'Get varation by id'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.varationService.findOne(id);
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Update varation by id'
  })
  @ApiBearerAuth('auth')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVarationDto: UpdateVarationDto) {
    return this.varationService.update({
      id,
      name: updateVarationDto.name,
      categoryId: updateVarationDto.categoryId
    });
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({
    summary: 'Delete varation by id '
  })
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.varationService.remove(id);
  }
}
