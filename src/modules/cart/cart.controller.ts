import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCartDto, UpdateCartDto } from './dto';
import { CartService } from './cart.service';
import { Roles as UserRoles } from '@prisma/client';
import { Roles } from '@decorators';

@Roles(UserRoles.Admin,UserRoles.User)  
@ApiBearerAuth('auth')
@ApiTags('Cart')
@Controller('cart')
export class CartController {

  constructor(private readonly cartService: CartService) { }


  @ApiOperation({ summary: 'Create new cart' })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }


  @ApiOperation({ summary: 'Get all cart' })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: 'Get cart by user id' })
  @Get("/user")
  findCartByUserId(
    @Request() request: any
  ) {
    return this.cartService.findCartByUserId(request.user.userId);
  }



  @ApiOperation({ summary: 'Get cart by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.findOne(id);
  }


  @ApiOperation({ summary: 'Update cart by id' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update({
      id,
      userId: updateCartDto.userId
    });
  }


  @ApiOperation({ summary: 'Delete cart by id' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.remove(id);
  }
}
