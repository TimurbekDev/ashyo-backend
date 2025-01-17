import { Address } from "@prisma/client";

export declare interface IAddressResponse {
    message: string;
    address?: Address
    addresses?: Address[]
}