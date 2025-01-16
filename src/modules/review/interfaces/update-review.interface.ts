import { Review } from "@prisma/client";

export declare interface IUpdateReviewRequest extends Pick<Review,'id'| 'content'> { }