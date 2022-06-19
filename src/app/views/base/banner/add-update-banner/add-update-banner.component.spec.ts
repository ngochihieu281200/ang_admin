import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBannerComponent } from './add-update-banner.component';

describe('AddUpdateBannerComponent', () => {
  let component: AddUpdateBannerComponent;
  let fixture: ComponentFixture<AddUpdateBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
