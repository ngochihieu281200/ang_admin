export interface CategoryInfo {
  Id: string;
  ImageCategory: string;
  IsShow: Number;
  Name: string;
  CreatedByName: string;
  CreatedByTime: Date;
  CreatedByID: string;
  UpdatedByName: string;
  UpdatedByTime: Date;
  UpdatedByID: string;
}
export interface CategoryCreate {
  ImageCategory: string;
  IsShow: Number;
  Name: string;
}
export interface BrandCreate {
  ImageBrand: string;
  IsShow: Number;
  Name: string;
  CategoryId: string;
}

export interface CategoryUpdate {
  Id: string;
  ImageCategory: string;
  IsShow: Number;
  Name: string;
}
export interface BrandUpdate {
  Id: string;
  ImageBrand: string;
  IsShow: Number;
  Name: string;
}


export interface BrandInfo {
  Id: string;
  CategoryId: string;
  ImageBrand: string;
  IsShow: Number;
  Name: string;
  CreatedByName: string;
  CreatedByTime: Date;
  CreatedByID: string;
  UpdatedByName: string;
  UpdatedByTime: Date;
  UpdatedByID: string;
}
