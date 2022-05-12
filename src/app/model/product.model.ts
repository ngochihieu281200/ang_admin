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
  Description: string;
  Machine: string;
  IsShow: Number;
  CreatedByName: string;
  CreatedByTime: Date;
  CreatedByID: string;
  UpdatedByName: string;
  UpdatedByTime: Date;
  UpdatedByID: string;
}

export interface ProductCreate {
  CategoryId: string;
  BrandId: string;
  Crytal: string;
  Name: string;
  Feature: string[];
  Ablert: string;
  ClassifyProducts: ClassifyProduct[];
  Description: string;
  Machine: string;
  MadeIn: string;
  Thumbnail: string;
  Guarantee: Number;
  WaterProof: string;
  IsShow: Number;
}

export interface ProductDetail {
  Id: string;
  CategoryID: string;
  CategoryName: string;
  BrandID: string;
  BrandName: string;
  Ablert: string;
  ClassifyProducts: ClassifyProduct[];
  Name: string;
  FromPrice: number;
  ToPrice: number;
  Feature: [];
  Descriotione: string;
  Machine: string;
  IsShow: boolean;
  MadeIn: string;
  PromotionPrice: number;
  OriginalPrice: number;
  Stock: number;
  Thumbnail: string;

  // CreatedByName: string;
  // CreatedByTime: Date;
  // CreatedByID: string;
  // UpdatedByName: string;
  // UpdatedByTime: Date;
  // UpdatedByID: string;
  Guarantee: Number;
  WaterProofId: string;
  WaterProofName: string;
}
