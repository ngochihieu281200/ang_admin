import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDetailComponent } from './pop-up-detail.component';

describe('PopUpDetailComponent', () => {
  let component: PopUpDetailComponent;
  let fixture: ComponentFixture<PopUpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
