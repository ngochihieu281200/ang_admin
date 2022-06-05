import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWaitingCancleComponent } from './orders-waiting-cancle.component';

describe('OrdersWaitingCancleComponent', () => {
  let component: OrdersWaitingCancleComponent;
  let fixture: ComponentFixture<OrdersWaitingCancleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWaitingCancleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWaitingCancleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
