import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoncierListComponent } from './foncier-list.component';

describe('FoncierListComponent', () => {
  let component: FoncierListComponent;
  let fixture: ComponentFixture<FoncierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoncierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoncierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
