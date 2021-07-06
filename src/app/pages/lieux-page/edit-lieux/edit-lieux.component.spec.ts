import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLieuxComponent } from './edit-lieux.component';

describe('EditLieuxComponent', () => {
  let component: EditLieuxComponent;
  let fixture: ComponentFixture<EditLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLieuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
