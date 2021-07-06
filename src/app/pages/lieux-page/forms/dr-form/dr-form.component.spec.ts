import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrFormComponent } from './dr-form.component';

describe('DrFormComponent', () => {
  let component: DrFormComponent;
  let fixture: ComponentFixture<DrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
