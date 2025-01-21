import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Roles as UserRoles } from '@prisma/client';
import { Roles } from '@decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Roles(UserRoles.Admin,UserRoles.User)  
@ApiBearerAuth('auth')
@ApiTags('Order-Items')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) { }

  @ApiOperation({
    summary: 'Create order-item'
  })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @ApiOperation({
    summary: 'Get all order-items'
  })
  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @ApiOperation({
    summary: 'Get order-item by id'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update order-item by id'
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update({
      id,
      ...updateOrderItemDto
    });
  }

  @ApiOperation({
    summary: 'Delete order-item by id'
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.remove(id);
  }
}
