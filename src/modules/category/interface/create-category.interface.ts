import { Category } from "@prisma/client";

export declare interface ICreateCategoryRequest extends Omit<Category, 'id'> { }