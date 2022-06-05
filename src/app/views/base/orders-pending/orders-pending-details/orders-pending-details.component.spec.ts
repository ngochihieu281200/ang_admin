import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPendingDetailsComponent } from './orders-pending-details.component';

describe('OrdersPendingDetailsComponent', () => {
  let component: OrdersPendingDetailsComponent;
  let fixture: ComponentFixture<OrdersPendingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPendingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPendingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
