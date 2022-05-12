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