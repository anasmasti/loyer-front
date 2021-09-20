import { TestBed } from '@angular/core/testing';

import { DCGuard } from './dc.guard';

describe('DCGuard', () => {
  let guard: DCGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DCGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
