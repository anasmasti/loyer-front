import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProprietairePageComponent } from './assign-proprietaire-page.component';

describe('AssignProprietairePageComponent', () => {
  let component: AssignProprietairePageComponent;
  let fixture: ComponentFixture<AssignProprietairePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProprietairePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProprietairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
