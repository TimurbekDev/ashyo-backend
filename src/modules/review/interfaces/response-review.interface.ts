import { Review } from "@prisma/client";

export declare interface IReviewResponse {
    message: string,
    review?: Review,
    reviews?: Review[]
}