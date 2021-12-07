import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportingLieuxComponent } from './list-reporting-lieux.component';

describe('ListReportingLieuxComponent', () => {
  let component: ListReportingLieuxComponent;
  let fixture: ComponentFixture<ListReportingLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReportingLieuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReportingLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
