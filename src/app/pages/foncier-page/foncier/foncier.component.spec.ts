import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoncierComponent } from './foncier.component';

describe('FoncierComponent', () => {
  let component: FoncierComponent;
  let fixture: ComponentFixture<FoncierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoncierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoncierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
