export declare interface IGetAllQuery {
    page: number,
    limit: number,
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    varationOptionIds?: number[];
}