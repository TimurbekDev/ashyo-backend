import { Category } from "@prisma/client";

export declare interface IUpdateCategoryRequest extends Pick<Category, "name" | "parentId"> { }