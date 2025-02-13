import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressService } from './adress.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';
import { Roles as UserRoles } from '@prisma/client';
import { Roles } from '@decorators';

@ApiTags('Address')
@ApiBearerAuth('auth')
@Controller('address')
export class AddressController {

  constructor(private readonly addressService: AddressService) { }

  @Roles(UserRoles.Admin)
  @ApiOperation({ summary: "Create new address" })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiOperation({ summary: "Create new address by user" })
  @Post()
  createByUser(
    @Body() createAddressDto: CreateAddressDto,
    @Request() request: any
  ) {
    return this.addressService.create({
      ...createAddressDto,
      userId: request.user.userId
    });
  }

  @Roles(UserRoles.Admin)
  @ApiOperation({ summary: "Get all address" })
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiOperation({ summary: "Get all user address" })
  @Get()
  findAllByUser(@Request() request: any) {
    return this.addressService.findAllByUser(request.user.userId);
  }

  @ApiOperation({ summary: "Get address by id" })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findOne(id);
  }

  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiOperation({ summary: "Update address by id" })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update({
      id,
      cityId: updateAddressDto.cityId,
      villageId: updateAddressDto.villageId,
      userId: updateAddressDto.userId
    });
  }

  @Roles(UserRoles.Admin, UserRoles.User)
  @ApiOperation({ summary: "Delete address by id" })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id);
  }
}
