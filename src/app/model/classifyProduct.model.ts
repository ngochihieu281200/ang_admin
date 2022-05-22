export interface ClassifyProductCreate {
  splice(index: any, arg1: number);
  Image: string;
  Name: string;
  OriginalPrice: number;
  PromotionPrice: number;
  Stock: number;
  IsShow: number;
}


export interface ClassifyProductUpdate {
  splice(index: any, arg1: number);
  Id: string;
  Image: string;
  Name: string;
  OriginalPrice: number;
  PromotionPrice: number;
  Stock: number;
  IsShow: number;
}
