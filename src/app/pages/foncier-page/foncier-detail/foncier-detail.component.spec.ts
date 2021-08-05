import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoncierDetailComponent } from './foncier-detail.component';

describe('FoncierDetailComponent', () => {
  let component: FoncierDetailComponent;
  let fixture: ComponentFixture<FoncierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoncierDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoncierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
