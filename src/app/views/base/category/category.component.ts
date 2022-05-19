import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  template: `<ng2-smart-table
    [settings]="settings"
    [source]="source"
    (create)="addStaff()"
    (custom)="onCuston($event)"
  ></ng2-smart-table>`,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {}
  settings = {
    mode: 'external',
    actions: {
      custom: [
        {
          name: 'editProduct',
          title: '<i class="fa fa-edit icon-edit" title="Edit"></i>',
        },
        {
          name: 'deleteProduct',
          title: '<i class="fa fa-trash icon-delete" title="Delete"></i>',
        },
        {
          name: 'detailProduct',
          title: '<i class="fa fa-eye icon-detail" title="Detail"></i>',
        },
      ],
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Id: {
        title: 'Loại Đồng Hồ',
        type: 'string',
      },
      Name: {
        title: 'Dây Đeo',
        type: 'string',
      },
      CategoryName: {
        title: 'Mặt Đồng Hồ',
        type: 'string',
      },
      BrandName: {
        title: 'Dịch Vụ',
        type: 'string',
      },
      // BrandName1: {
      //   title: 'Email',
      //   type: 'string',
      // },

      // Thumbnail: {
      //   title: 'Hình Ảnh',
      //   type: 'html',
      //   valuePrepareFunction: (value) => {
      //     return `<img src =  "${value}" width="100px">`;
      //   },
      // },
      // hethong: {
      //   title: 'Hệ Thống',
      //   type: 'html',
      // },
    },
  };
  constructor(private router: Router) {}
  onCuston(event) {
    switch (event.action) {
      case 'editProduct':
        this.editProduct(event.data);
        break;
      case 'deleteProduct':
        this.deleteProduct(event.data);
        break;
      // case 'detailProduct':
      //   this.selectProduct(event.data);
      //   break;
    }
  }
  source: LocalDataSource = new LocalDataSource();
  addStaff() {
    (<any>this.router).navigate([`/base/category/id`]);
    console.log(this.addStaff);
  }
  editProduct(data) {
    // (<any>this.router).navigate([`/base/product/${data.Id}`]);
  }
  deleteProduct(data) {
    // this.idProduct = data.Id;
    // this.modalReference = this.modalService.open(this.content);
    // this.modalReference.result.then(
    //   (result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   },
    //   (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   }
    // );
  }
  selectProduct(data) {
    // (<any>this.router).navigate([`/base/product-detail/${data.Id}`]);
  }
}
