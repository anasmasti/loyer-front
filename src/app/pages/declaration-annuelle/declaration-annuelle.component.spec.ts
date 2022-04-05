import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationAnnuelleComponent } from './declaration-annuelle.component';

describe('DeclarationAnnuelleComponent', () => {
  let component: DeclarationAnnuelleComponent;
  let fixture: ComponentFixture<DeclarationAnnuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarationAnnuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationAnnuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
