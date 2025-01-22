import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles as UserRoles } from '@prisma/client';
import { Roles } from '@decorators';

@ApiTags('Reviews')
@Roles(UserRoles.Admin,UserRoles.User)  
@ApiBearerAuth('auth')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({summary: "Create new rewiew"})
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiOperation({summary: "Get all rewiew"})
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOperation({summary: "Get one rewiew"})
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.reviewService.findOne(+id);
  }

  @ApiOperation({summary: "Update rewiew"})
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update({id,...updateReviewDto});
  }

  @ApiOperation({summary: "Delete rewiew"})
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.reviewService.remove(+id);
  }
}
