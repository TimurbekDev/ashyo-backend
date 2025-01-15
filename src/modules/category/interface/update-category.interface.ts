import { Category } from "@prisma/client";

export declare interface IUpdateCategoryRequest extends Omit<Category, 'icon' | 'image'> { }