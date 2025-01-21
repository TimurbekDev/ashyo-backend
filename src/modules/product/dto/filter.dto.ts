import { ApiProperty } from "@nestjs/swagger";
import { IProductFilter } from "../interfaces/product-filter.interface";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class ProductFilterDto implements IProductFilter{

    @IsNotEmpty()
    @Transform(({value})=>Math.abs(parseInt(value)))
    page: number;

    @IsNotEmpty()
    @Transform(({value})=>Math.abs(parseInt(value)))
    limit: number;


    @IsOptional()
    search?: string;

    @IsOptional()
    @Transform(({value})=>Math.abs(parseInt(value)))
    categoryId?: number;

    @IsOptional()
    @Transform(({value})=>Math.abs(parseInt(value)))
    maxPrice?: number;


    @IsOptional()
    @Transform(({value})=>Math.abs(parseInt(value)))
    minPrice?: number;
}