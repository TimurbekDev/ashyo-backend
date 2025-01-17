import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update({id,...updateReviewDto});
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.reviewService.remove(+id);
  }
}
