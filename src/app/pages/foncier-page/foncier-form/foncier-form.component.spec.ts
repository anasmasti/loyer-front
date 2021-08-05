import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoncierFormComponent } from './foncier-form.component';

describe('FoncierFormComponent', () => {
  let component: FoncierFormComponent;
  let fixture: ComponentFixture<FoncierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoncierFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoncierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
