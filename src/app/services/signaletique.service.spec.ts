import { TestBed } from '@angular/core/testing';

import { SignaletiqueService } from './signaletique.service';

describe('SignaletiqueService', () => {
  let service: SignaletiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignaletiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
