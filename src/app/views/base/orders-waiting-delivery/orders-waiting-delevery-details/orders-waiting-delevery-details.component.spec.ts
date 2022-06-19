import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWaitingDeleveryDetailsComponent } from './orders-waiting-delevery-details.component';

describe('OrdersWaitingDeleveryDetailsComponent', () => {
  let component: OrdersWaitingDeleveryDetailsComponent;
  let fixture: ComponentFixture<OrdersWaitingDeleveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWaitingDeleveryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWaitingDeleveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
