import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWaitingDetailsComponent } from './orders-waiting-details.component';

describe('OrdersWaitingDetailsComponent', () => {
  let component: OrdersWaitingDetailsComponent;
  let fixture: ComponentFixture<OrdersWaitingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWaitingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWaitingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
