import { Address } from "@prisma/client";

export declare interface ICreateAddressRequest extends Omit<Address,'id'>{}