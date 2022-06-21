import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth: any;
  currentUser: any;
  constructor(private router: Router, private toastr: ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth = JSON.parse(localStorage.getItem('token'));
    this.currentUser = JSON.parse(localStorage.getItem('role'));
    if (!this.auth) {
      return this.router.navigate(["/login"]);
    } else {
      if (route.data.roles && route.data.roles.indexOf(this.currentUser) === -1) {
        this.toastr.error("Bạn không có quyền truy cập vào trang này", 'Thông báo lỗi');
        return false;
      }
      else {
        return true;
      }
    }

  }

}
