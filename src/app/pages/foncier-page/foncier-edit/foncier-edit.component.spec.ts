import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoncierEditComponent } from './foncier-edit.component';

describe('FoncierEditComponent', () => {
  let component: FoncierEditComponent;
  let fixture: ComponentFixture<FoncierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoncierEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoncierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
