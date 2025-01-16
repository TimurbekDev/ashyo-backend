import { ApiProperty } from "@nestjs/swagger";
import { ICreateRegionRequest } from "../interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRegionDto implements ICreateRegionRequest {

    @ApiProperty({
        description : 'Enter Region name ',
        default : 'Toshkent',
        required : true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required : true,
        description : 'Enter Region Id ',
        default : 1
    })
    @IsNotEmpty()
    @IsNumber()
    parentId: number;

}
