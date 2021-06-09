import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProprietaireComponent } from './edit-proprietaire.component';

describe('EditProprietaireComponent', () => {
  let component: EditProprietaireComponent;
  let fixture: ComponentFixture<EditProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
