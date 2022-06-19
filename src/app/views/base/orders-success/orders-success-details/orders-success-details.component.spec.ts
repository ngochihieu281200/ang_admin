import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSuccessDetailsComponent } from './orders-success-details.component';

describe('OrdersSuccessDetailsComponent', () => {
  let component: OrdersSuccessDetailsComponent;
  let fixture: ComponentFixture<OrdersSuccessDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersSuccessDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersSuccessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
