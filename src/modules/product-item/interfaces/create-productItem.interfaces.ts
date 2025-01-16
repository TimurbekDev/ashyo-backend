import { ProductItem, VarationOption } from '@prisma/client';

export declare interface ICreateProductItem extends Omit<ProductItem, 'id'> {
  productOptions: string;
}
