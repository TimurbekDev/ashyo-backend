import { ApiProperty } from "@nestjs/swagger";
import { ICreateProductItem } from "../interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateVariationDemoDto } from "./create-varion-option.dto";

export class CreateProductItemDto implements ICreateProductItem{
@ApiProperty({
    type: String,
    format: "binary",
    required: true,
    description: "This is important image"
})
@IsNotEmpty()
@IsString()
image: any;


@ApiProperty({
    type: String,
    required: true,
    description: "Input Product name"
})
@IsNotEmpty()
@IsString()
name: string;

@ApiProperty({
    type: Number,
    required: true,
    description: "Product price"
})
@IsNotEmpty()
@IsNumber()
price: number;

@ApiProperty({
    type: Number,
    required: true,
    description: "Product id"
})
@IsNotEmpty()
@IsNumber()
productId: number;


@ApiProperty({
    type: Number,
    required: true,
    description: "Product count"
})
@IsNotEmpty()
@IsNumber()
quantity: number;


@ApiProperty({
    type: [CreateVariationDemoDto],
    required: true,
    description: "Varation imput"
})

productOptions: string

}
