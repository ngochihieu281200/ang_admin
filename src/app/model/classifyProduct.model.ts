export interface ClassifyProduct {
  ClassifyProductId: string;
  ProductId: string;
  Image: string;
  Name: string;
  OriginalPrice: number;
  PromotionPrice: number;
  Stock: number;
  IsShow: boolean;
  CreatedByName: string;
  CreatedByTime: Date;
  CreatedByID: string;
  UpdatedByName: string;
  UpdatedByTime: Date;
  UpdatedByID: string;
}
