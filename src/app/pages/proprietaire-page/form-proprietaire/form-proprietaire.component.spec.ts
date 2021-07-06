import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProprietaireComponent } from './form-proprietaire.component';

describe('FormProprietaireComponent', () => {
  let component: FormProprietaireComponent;
  let fixture: ComponentFixture<FormProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
