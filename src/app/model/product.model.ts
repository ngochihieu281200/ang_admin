import { ClassifyProduct } from './classifyProduct.model';
export interface ProductInfo {
  Id: string;
  CategoryID: string;
  CategoryName: string;
  BrandID: string;
  BrandName: string;
  Name: string;
  FromPrice: number;
  ToPrice: number;
  Feature: [];
  Descriotione: string;
  Machine: string;
  IsShow: boolean;
  CreatedByName: string;
  CreatedByTime: Date;
  CreatedByID: string;
  UpdatedByName: string;
  UpdatedByTime: Date;
  UpdatedByID: string;
}

export interface ProductDetail {
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
}
