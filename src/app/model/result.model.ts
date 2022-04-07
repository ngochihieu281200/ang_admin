import { ProductInfo } from './product.model';
import { ProductDetail } from 'src/app/model/product.model';
export interface ResultProduct {
  IsSuccess: boolean;
  Date: {
    PageIndex: number;
    PageSize: number;
    ListProduct: ProductInfo[];
  };
  Message: string;
}

export interface ResultProductDetail {
  IsSuccess: boolean;
  Date: {
    PageIndex: number;
    PageSize: number;
    Data: ProductDetail[];
  };
  Message: string;
}
