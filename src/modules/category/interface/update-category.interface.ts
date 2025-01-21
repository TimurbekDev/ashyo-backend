import { Category } from "@prisma/client";

export declare interface IUpdateCategoryRequest extends Partial<Omit<Category, 'image' | 'icon'>> {
    image?: Express.Multer.File | string;
    icon?: Express.Multer.File | string;
}