import { Rate } from "@prisma/client";

export declare interface ICreateRateRequest extends Omit<Rate, 'id'> { }