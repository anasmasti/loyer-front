import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVersementComponent } from './edit-versement.component';

describe('EditVersementComponent', () => {
  let component: EditVersementComponent;
  let fixture: ComponentFixture<EditVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
