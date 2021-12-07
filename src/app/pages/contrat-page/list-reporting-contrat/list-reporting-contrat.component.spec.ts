import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportingContratComponent } from './list-reporting-contrat.component';

describe('ListReportingContratComponent', () => {
  let component: ListReportingContratComponent;
  let fixture: ComponentFixture<ListReportingContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReportingContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReportingContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
