import { Color } from "@prisma/client";

export declare interface IColorResponse {
    message: string;
    color?: Color;
    colors?: Color[]
}