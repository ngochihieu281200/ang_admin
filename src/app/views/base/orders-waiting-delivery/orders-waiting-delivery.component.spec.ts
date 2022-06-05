import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWaitingDeliveryComponent } from './orders-waiting-delivery.component';

describe('OrdersWaitingDeliveryComponent', () => {
  let component: OrdersWaitingDeliveryComponent;
  let fixture: ComponentFixture<OrdersWaitingDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWaitingDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWaitingDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
