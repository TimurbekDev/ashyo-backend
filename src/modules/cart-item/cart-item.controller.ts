import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Roles as UserRoles } from '@prisma/client';
import { Roles } from '@decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCartItemByUserId } from './dto/create-carti-byuserid.dto';


@Roles(UserRoles.Admin, UserRoles.User)
@ApiBearerAuth('auth')
@ApiTags('Cart-Item')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) { }

  @ApiOperation({
    summary: 'Create cart-item'
  })
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }


  @ApiOperation({
    summary: 'Create cart-item'
  })
  @Post("/byUser")
  createCartItemByUserId(
    @Body() createCartItemDto: CreateCartItemByUserId,
    @Request() request: any
  ) {
    return this.cartItemService.createCartItemByUserId({...createCartItemDto,userId: request.user.userId});
  }


  @ApiOperation({
    summary: 'Get all cart-items'
  })
  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @ApiOperation({
    summary: 'Get cart-item by id'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartItemService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update cart-item by id'
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update({
      id,
      ...updateCartItemDto
    });
  }

  @ApiOperation({
    summary: 'Delete cart-item by id'
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartItemService.remove(id);
  }
}
