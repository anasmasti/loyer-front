import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiegeFormComponent } from './siege-form.component';

describe('SiegeFormComponent', () => {
  let component: SiegeFormComponent;
  let fixture: ComponentFixture<SiegeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiegeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
