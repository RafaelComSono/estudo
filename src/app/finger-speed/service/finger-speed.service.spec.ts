import { TestBed } from '@angular/core/testing';

import { FingerSpeedService } from './finger-speed.service';

describe('FingerSpeedService', () => {
  let service: FingerSpeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingerSpeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
