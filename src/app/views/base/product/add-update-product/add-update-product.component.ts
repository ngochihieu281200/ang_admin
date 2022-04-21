import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from './../../../../config/api';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ClassifyProduct } from './../../../../model/classifyProduct.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  typeForm: FormGroup;
  detail;
  id;
  closeResult = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {
    this.typeForm = this.fb.group({
      Name: ['', Validators.required],
      OriginalPrice: ['', Validators.required],
      PromotionPrice: ['', Validators.required],
      Stock: ['', Validators.required],
      IsShow: [],
    });
  }

  addTypeProduct(typeForm) {
    console.log(typeForm);
  }

  ngOnInit(): void {}
}
