import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateVoucherComponent } from './add-update-voucher.component';

describe('AddUpdateVoucherComponent', () => {
  let component: AddUpdateVoucherComponent;
  let fixture: ComponentFixture<AddUpdateVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
