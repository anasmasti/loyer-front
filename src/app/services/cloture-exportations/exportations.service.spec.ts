import { TestBed } from '@angular/core/testing';

import { ExportationsService } from './exportations.service';

describe('ExportationsService', () => {
  let service: ExportationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
