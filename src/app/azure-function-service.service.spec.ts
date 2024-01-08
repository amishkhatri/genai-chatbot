import { TestBed } from '@angular/core/testing';

import { AzureFunctionServiceService } from './azure-function-service.service';

describe('AzureFunctionServiceService', () => {
  let service: AzureFunctionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureFunctionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
