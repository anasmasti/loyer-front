import { TestBed } from '@angular/core/testing';

import { CheckRolesGuard } from './check-roles.guard';

describe('CheckRolesGuard', () => {
  let guard: CheckRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
