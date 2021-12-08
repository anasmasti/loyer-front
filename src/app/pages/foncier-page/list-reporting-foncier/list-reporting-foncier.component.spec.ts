import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportingFoncierComponent } from './list-reporting-foncier.component';

describe('ListReportingFoncierComponent', () => {
  let component: ListReportingFoncierComponent;
  let fixture: ComponentFixture<ListReportingFoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReportingFoncierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReportingFoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
