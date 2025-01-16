import { VarationOption } from "@prisma/client";

export declare interface IVoResponse {
    message : string;
    varationOption? : VarationOption;
    varationOptions? : VarationOption[];
}