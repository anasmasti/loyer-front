import { TestBed } from '@angular/core/testing';

import { AssignmentProprietaireService } from './assignment-proprietaire.service';

describe('AssignmentProprietaireService', () => {
  let service: AssignmentProprietaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentProprietaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
