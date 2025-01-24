import { Banner } from "@prisma/client";

export declare interface IBannerResponse {
    message : string;
    banner? :Banner;
    banners? :Banner[];
}