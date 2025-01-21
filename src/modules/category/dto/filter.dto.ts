import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IFilter } from "../interface";
import { Transform } from "class-transformer";

export class Params implements IFilter {

    @IsNotEmpty()
    @Transform(({ value }) => Math.abs(parseInt(value)))
    page: number;

    @IsNotEmpty()
    @Transform(({ value }) => Math.abs(parseInt(value)))
    limit: number;

    @IsOptional()
    @IsString()
    name?: string;
}   