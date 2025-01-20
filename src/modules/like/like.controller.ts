import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, UpdateLikeDto } from './dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update({
      id,
      ...updateLikeDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.remove(+id);
  }
}
