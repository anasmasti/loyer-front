import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLieuxComponent } from './list-lieux.component';

describe('ListLieuxComponent', () => {
  let component: ListLieuxComponent;
  let fixture: ComponentFixture<ListLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLieuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
