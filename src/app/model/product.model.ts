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
  // CreatedByName: string;
  // CreatedByTime: Date;
  // CreatedByID: string;
  // UpdatedByName: string;
  // UpdatedByTime: Date;
  // UpdatedByID: string;
  Guarantee: Date;
  WaterProofId: string;
  WaterProofName: string;
}
