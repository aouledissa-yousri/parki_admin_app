import { TestBed } from '@angular/core/testing';

import { LoadongBoxServiceService } from './loadong-box-service.service';

describe('LoadongBoxServiceService', () => {
  let service: LoadongBoxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadongBoxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
