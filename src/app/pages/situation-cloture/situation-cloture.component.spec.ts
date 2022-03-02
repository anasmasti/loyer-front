import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationClotureComponent } from './situation-cloture.component';

describe('SituationClotureComponent', () => {
  let component: SituationClotureComponent;
  let fixture: ComponentFixture<SituationClotureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituationClotureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationClotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
