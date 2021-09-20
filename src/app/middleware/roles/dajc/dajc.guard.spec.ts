import { TestBed } from '@angular/core/testing';

import { DAJCGuard } from './dajc.guard';

describe('DAJCGuard', () => {
  let guard: DAJCGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DAJCGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
