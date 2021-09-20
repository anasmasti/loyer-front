import { TestBed } from '@angular/core/testing';

import { CDGSPGuard } from './cdgsp.guard';

describe('CDGSPGuard', () => {
  let guard: CDGSPGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CDGSPGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
