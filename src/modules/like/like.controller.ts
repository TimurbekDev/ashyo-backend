import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, UpdateLikeDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles as UserRoles } from '@prisma/client';
import { Roles } from '@decorators';

@Roles(UserRoles.Admin,UserRoles.User)  
@ApiBearerAuth('auth')
@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }

  @ApiOperation({
    summary : 'Create Like'
  })
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @ApiOperation({
    summary : 'Get all likes'
  })
  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @ApiOperation({
    summary : 'Get like by id'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.findOne(+id);
  }

  @ApiOperation({
    summary : 'Update like by id'
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update({
      id,
      ...updateLikeDto
    });
  }

  @ApiOperation({
    summary : 'Delete by id'
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.remove(+id);
  }
}
