import { TestBed } from '@angular/core/testing';

import { FoncierService } from './foncier.service';

describe('FoncierService', () => {
  let service: FoncierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoncierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
