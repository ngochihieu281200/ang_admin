import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductInfo } from 'src/app/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  datas;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.RetrieveAll().subscribe((res) => {
      this.datas = res['Data'].ListProduct;
    });
  }
}
