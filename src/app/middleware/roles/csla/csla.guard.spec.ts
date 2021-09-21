import { TestBed } from '@angular/core/testing';

import { CSLAGuard } from './csla.guard';

describe('CSLAGuard', () => {
  let guard: CSLAGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CSLAGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
