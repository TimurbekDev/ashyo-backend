import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressService } from './adress.service';
import { CreateAddressDto, UpdateAddressDto } from './dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {

  constructor(private readonly addressService: AddressService) { }

  @ApiOperation({summary: "Create new address"})
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({summary: "Get all address"})
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @ApiOperation({summary: "Get address by id"})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findOne(id);
  }

  @ApiOperation({summary: "Update address by id"})
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update({
      id,
      cityId: updateAddressDto.cityId,
      villageId: updateAddressDto.villageId,
      userId: updateAddressDto.userId
    });
  }


  @ApiOperation({summary: "Delete address by id"})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id);
  }
}
