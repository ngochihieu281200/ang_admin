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
  Data: {
    Ablert: String,
    BrandID: String,
    BrandName: String
    CategoryID: String,
    CategoryName: String,
    ClassifyProducts: [],
    CreatedByID: String,
    CreatedByName: String,
    CreatedByTime: String,
    Crytal: String,
    Description: String,
    Feature: [],
    FromPrice: Number,
    Guarantee: Date,
    Id: String,
    IsShow: Boolean,
    Machine: String,
    Name: String,
    Thumbnail: String,
    ToPrice: Number,
    UpdatedByID: String,
    UpdatedByName: String,
    UpdatedByTime: String,
    WaterProofId: String,
    WaterProofName: String,
  };
  Message: string;
}

export const result = {};
