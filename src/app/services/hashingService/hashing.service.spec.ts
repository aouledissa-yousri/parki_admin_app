import { TestBed } from '@angular/core/testing';

import { HashingService } from './hashing.service';

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
