import { TestBed } from '@angular/core/testing';

import { DoctorInterventionService } from './doctor-intervention.service';

describe('DoctorInterventionService', () => {
  let service: DoctorInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorInterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
