import { ICreateBannerRequest } from "./create-banner.interface";

export declare interface IUpdateBannerRequest extends Partial<ICreateBannerRequest> {
    id: number;
}