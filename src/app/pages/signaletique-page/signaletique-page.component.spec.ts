import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaletiquePageComponent } from './signaletique-page.component';

describe('SignaletiquePageComponent', () => {
  let component: SignaletiquePageComponent;
  let fixture: ComponentFixture<SignaletiquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignaletiquePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaletiquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
