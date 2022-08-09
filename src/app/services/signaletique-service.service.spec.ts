import { TestBed } from '@angular/core/testing';

import { SignaletiqueServiceService } from './signaletique-service.service';

describe('SignaletiqueServiceService', () => {
  let service: SignaletiqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignaletiqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
