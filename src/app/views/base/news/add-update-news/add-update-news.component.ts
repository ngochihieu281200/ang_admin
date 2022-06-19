import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from './../../../../services/news.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-update-news',
  templateUrl: './add-update-news.component.html',
  styleUrls: ['./add-update-news.component.scss']
})
export class AddUpdateNewsComponent implements OnInit {

  constructor(private newsService: NewsService,
    private refreshTokenService: RefreshTokenService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  id;
  editMode;
  formNews;
  ckeConfig;
  Thumbnail;
  newsCreate;
  newsUpdate;

  ngOnInit(): void {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.id = this.route.snapshot.params.id;

    if (this.id == "id") {
      this.editMode = false;
    } else this.editMode = true;

    if (this.editMode) {
      this.spinner.show();
      this.newsService.GetDetailNews(this.id).subscribe(
        {
          next: (res: any) => {
            this.formNews.patchValue(res.Data);
            this.Thumbnail = res.Data.Thumbnail;
            this.spinner.hide();
          },
          error: async (err) => {
            if (err.status === 401) {
              this.refreshTokenService.refreshToken()
                .subscribe((res) => {
                  tokenStorage.AccessToken = res['Data'].AccessToken;
                  localStorage.setItem('token', JSON.stringify(tokenStorage));
                  this.newsService.GetDetailNews(this.id).subscribe(
                    (res: any) => {
                      this.formNews.patchValue(res.Data);
                      this.Thumbnail = res.Data.Thumbnail;
                      this.spinner.hide();
                    }
                  )
                });
            }
          }
        }
      )
    }


    this.formNews = new FormGroup({
      Id: new FormControl(),
      Title: new FormControl('', Validators.required),
      Content: new FormControl('', Validators.required),
      Author: new FormControl('', Validators.required),
      IsShow: new FormControl('', Validators.required),
    })


    this.ckeConfig = {
      extraPlugins: 'uploadimage,justify,colorbutton',
      uploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
      image2_alignClasses: ['align-left', 'align-center', 'align-right'],
    };

  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Thumbnail = reader.result;
    };
  }

  onSubmit() {
    if (this.formNews.invalid) {
      this.validateAllFormFields(this.formNews);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }

    if (this.editMode) {
      this.updateNews();
    }
    else {
      this.addNews();
    }
  }


  addNews() {
    delete this.formNews.value.Id;
    this.newsCreate = this.formNews.value;
    this.newsCreate.Thumbnail = this.Thumbnail;
    if (this.formNews.value.IsShow) {
      this.newsCreate.IsShow = 1;
    }
    else {
      this.newsCreate.IsShow = 0;
    }
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.newsService.AddNews(this.newsCreate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, 'Thông báo');
        this.formNews.reset();
        this.spinner.hide();
      },
      error: async (error) => {
        if (error.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.newsService.AddNews(this.newsCreate).subscribe({
                next: (res: any) => {
                  this.toastr.success(res.Message, 'Thông báo');
                  this.spinner.hide();
                  this.formNews.reset();
                },
                error: (error) => {
                  this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  this.spinner.hide();
                }
              })
            });
        }
        else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); this.spinner.hide(); }
      },
    })
  }

  updateNews() {

    this.newsUpdate = this.formNews.value;
    this.newsUpdate.Thumbnail = this.Thumbnail;
    if (this.formNews.value.IsShow) {
      this.newsUpdate.IsShow = 1;
    }
    else {
      this.newsUpdate.IsShow = 0;
    }
    console.log(this.newsUpdate);
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.newsService.UpdateNews(this.newsUpdate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, 'Thông báo');
        this.spinner.hide();
      },
      error: async (error) => {
        if (error.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.newsService.UpdateNews(this.newsUpdate).subscribe({
                next: (res: any) => {
                  this.toastr.success(res.Message, 'Thông báo');
                  this.spinner.hide();
                },
                error: (error) => {
                  this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  this.spinner.hide();
                }
              })
            });
        }
        else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); this.spinner.hide(); }
      },
    })
  }

}
