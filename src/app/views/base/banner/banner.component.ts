import { Component, OnInit, ViewChild } from '@angular/core';
import { RefreshTokenService } from '../../../services/refresh-token.service';
import { BannerService } from '../../../services/banner.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(private refreshTokenService: RefreshTokenService,
    private router: Router,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService, private toastr: ToastrService, private modalService: NgbModal) { }
  @ViewChild('content') public content: ModalDirective;
  source: LocalDataSource = new LocalDataSource();
  [x: string]: any;
  idBanner;
  ngOnInit(): void {
    this.spinner.show();
    var tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.bannerService.GetAllBanner().subscribe(
      (res: any) => {
        this.source.load(res?.Data);
        this.spinner.hide();
      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res.Data.AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.bannerService.GetAllBanner().subscribe(
                (res: any) => {
                  this.source.load(res.Data),
                    this.spinner.hide();
                })
            });
        }
      }
    );
  }

  onCuston(event) {
    switch (event.action) {
      case 'editBanner':
        (<any>this.router).navigate([`banner/${event.data.Id}`]);
        break;
      case 'deleteBanner':
        this.deleteBanner(event.data);
        break;
    }

  }
  onConfirm() {
    this.modalReference.close();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.bannerService.DeleteBanner(this.idBanner).subscribe(
      (res: any) => {
        this.bannerService.GetAllBanner().subscribe((res: any) => {
          this.source.load(res.Data);
          this.spinner.hide();
        });
        this.toastr.success(res.Message, 'Thông báo');

      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.bannerService.GetAllBanner().subscribe((res: any) => {
                this.source.load(res.Data);
                this.spinner.hide();
              });
            });

        }
        else {
          this.toastr.error(err.error.Message, "Thông báo lỗi");
          this.spinner.hide();
        }
      }
    )
  }
  deleteBanner(data) {
    this.idBanner = data.Id;

    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  addBanner() {
    (<any>this.router).navigate([`banner/id`]);
  }

  settings = {
    mode: 'external',
    pager: {
      perPage: 4,
      display: true,
    },
    actions: {
      custom: [
        {
          name: 'editBanner',
          title: '<i class="fa fa-edit icon-edit" title="Edit"></i>',
        },
        {
          name: 'deleteBanner',
          title: '<i class="fa fa-trash icon-delete" title="Delete"></i>',
        },
      ],
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Id: {
        title: 'Mã Banner',
        type: 'string',
      },
      ImageBanner: {
        title: 'Hình Ảnh',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<div class =" text-center p-1">
          <img src="${value}" width="100px">
        </div>`
        }
      },
      IsShowOnMobile: {
        title: 'Trạng thái',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          if (cell.IsShowOnMobile == 0) {
            return `<div class="d-flex justify-content-center">
            <p class="w-25 rounded text-light bg-warning text-center">INACTIVE</p>
            </div>`;
          }
          else {
            return `<div class="d-flex justify-content-center">
            <p class="w-25 rounded text-light bg-success text-center">ACTIVE</p>
            </div>`;
          }

        },
      },
      Audit: {
        title: 'Thông Tin Hệ Thống',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<br><p>Tạo bởi : ${cell.CreatedByName
            }<br>Lúc: ${this.datepipe.transform(
              cell.CreatedByTime,
              'dd/MM/yyyy'
            )}`;
        },
      },
    },
  };
}
