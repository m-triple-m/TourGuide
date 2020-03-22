import { TestBed } from '@angular/core/testing';

import { TourguideService } from './tourguide.service';

describe('TourguideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TourguideService = TestBed.get(TourguideService);
    expect(service).toBeTruthy();
  });
});
