import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { cilUser } from '@coreui/icons';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { cilUser };
  }
  auth:any;


  ngOnInit():void {
  }
}
