import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto';

@ApiTags('Rate')
@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) { }

  @ApiOperation({
    summary: 'Create rate'
  })
  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiBearerAuth('auth')
  @Post()
  create(@Body() createLikeDto: CreateRateDto) {
    return this.rateService.create(createLikeDto);
  }

  @ApiOperation({
    summary: 'Get all rates'
  })
  @Public()
  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @ApiOperation({
    summary: 'Get rate by id'
  })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rateService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update rate by id'
  })
  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiBearerAuth('auth')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRateDto: UpdateRateDto) {
    return this.rateService.update({
      id,
      ...updateRateDto
    });
  }

  @ApiOperation({
    summary: 'Delete rate by id'
  })
  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiBearerAuth('auth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rateService.remove(id);
  }
}
