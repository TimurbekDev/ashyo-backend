import { Category } from "@prisma/client";

export declare interface ICategoryResponse {
    message : string;
    category? : Category;
    categories? : Category[];
    totalCount? : number;
}