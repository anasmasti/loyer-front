import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVersementComponent } from './form-versement.component';

describe('FormVersementComponent', () => {
  let component: FormVersementComponent;
  let fixture: ComponentFixture<FormVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
