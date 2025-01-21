import { Category } from "@prisma/client";

export declare interface ICreateCategoryRequest extends Pick<Category, "name" | "parentId"> { }