import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProprietaireComponent } from './details-proprietaire.component';

describe('DetailsProprietaireComponent', () => {
  let component: DetailsProprietaireComponent;
  let fixture: ComponentFixture<DetailsProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
