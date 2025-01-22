import { ApiProperty } from "@nestjs/swagger";
import { IProductFilter } from "../interfaces/product-filter.interface";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class ProductFilterDto implements IProductFilter {
  @IsNotEmpty()
  @Transform(({ value }) => Math.abs(parseInt(value)))
  page: number;

  @IsNotEmpty()
  @Transform(({ value }) => Math.abs(parseInt(value)))
  limit: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => Math.abs(parseInt(value)))
  categoryId?: number;

  @IsOptional()
  @Transform(({ value }) => Math.abs(parseInt(value)))
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Math.abs(parseInt(value)))
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map(Number);
    }
    return [Number(value)];
  }, { toClassOnly: true })
  varationOptionIds?: number[];
}
