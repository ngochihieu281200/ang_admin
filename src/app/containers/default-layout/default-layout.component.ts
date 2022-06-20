import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { MyINavData } from '../../shared/hiddenNav';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  items$: Observable<MyINavData[]>;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  constructor() {
    this.items$ = this.getSidebarItems();
  }
  private getSidebarItems(): Observable<MyINavData[]> {
    let navItems: MyINavData[] = new Array<MyINavData>();
    const role = JSON.parse(localStorage.getItem('role'));

    this.navItems.forEach((item) => {
      console.log(item);
      item.role.forEach((r) => {
        if (r == role) {
          navItems.push(item)
        }
      })
    });

    return of(navItems);
  }

  logout() {
    localStorage.removeItem('token');
    location.reload()
  }
}
