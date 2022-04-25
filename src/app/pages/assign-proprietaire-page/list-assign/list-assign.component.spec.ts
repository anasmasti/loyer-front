import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssignComponent } from './list-assign.component';

describe('ListAssignComponent', () => {
  let component: ListAssignComponent;
  let fixture: ComponentFixture<ListAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
