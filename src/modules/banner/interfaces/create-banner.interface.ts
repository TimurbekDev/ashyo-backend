import { Banner } from "@prisma/client";

export declare interface ICreateBannerRequest extends Omit<Banner,'id'|'image'> {
    image : Express.Multer.File | string;
}