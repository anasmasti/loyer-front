import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentProprietaireComponent } from './edit-assignment-proprietaire.component';

describe('EditAssignmentProprietaireComponent', () => {
  let component: EditAssignmentProprietaireComponent;
  let fixture: ComponentFixture<EditAssignmentProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssignmentProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignmentProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
