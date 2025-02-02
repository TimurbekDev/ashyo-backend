import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { IGetAllQuery } from "../interfaces";

export class GetAllPrItemsQuery implements IGetAllQuery {
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
