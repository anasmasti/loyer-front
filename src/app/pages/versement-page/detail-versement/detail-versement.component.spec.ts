import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVersementComponent } from './detail-versement.component';

describe('DetailVersementComponent', () => {
  let component: DetailVersementComponent;
  let fixture: ComponentFixture<DetailVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
