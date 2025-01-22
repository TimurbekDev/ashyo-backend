export declare interface IProductFilter {
    page: number;
    limit: number;
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    varationOptionIds?:number[];
}
