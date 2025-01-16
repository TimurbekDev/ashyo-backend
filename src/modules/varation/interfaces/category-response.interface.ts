import { Varation } from "@prisma/client";

export declare interface IVarationResponse {
    message: string;
    varation?: Varation;
    varations?: Varation[]
}