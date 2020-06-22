import { TestBed } from '@angular/core/testing';

import { BackRoutingService } from './back-routing.service';

describe('BackRoutingService', () => {
  let service: BackRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
