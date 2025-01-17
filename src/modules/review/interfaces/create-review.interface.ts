import { Review } from "@prisma/client";

export declare interface ICreateReviewRequest extends Omit<Review, 'id'> { }