import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Roles as UserRoles } from '@prisma/client';
import { Public, Roles } from '@decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Roles(UserRoles.Admin, UserRoles.User)
@ApiBearerAuth('auth')
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiOperation({
    summary: 'Create order'
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get order by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update order by id'
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update({
      id,
      ...updateOrderDto
    });
  }

  @ApiOperation({
    summary: 'Delete order by id'
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
