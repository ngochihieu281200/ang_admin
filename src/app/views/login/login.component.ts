import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms"
import { AccountService } from '../../services/acount.service'
import { first } from 'rxjs/operators'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(
    private fb: FormBuilder, private dataService: AccountService, private router: Router
  ) {
    this.loginForm =this.fb.group({
      Username : ['',[Validators.required,Validators.minLength(1)]],
      Password : ['',Validators.required]
    })
   }

  ngOnInit(): void {

  }
  login(loginForm:any){
    // console.log(loginForm)
    this.dataService.userLogin(loginForm.value.Username,loginForm.value.Password)
    .pipe(first())
    .subscribe(
      data=>{
        // const redirect = this.dataService.redirectUrl ?this.dataService.redirectUrl : '/dashboard'
        // this.router.navigate([redirect])
        // this.router.navigate(['/dashboard']);
        console.log('data', data)
        localStorage.setItem("token",JSON.stringify(data.Data))
        this.router.navigate(['/dashboard']);
        // localStorage.setItem('currentUser',JSON.stringify(data.Data))
      },
      err =>{
        alert('Username or password is incorrect')
      }
    )
  }
}
