import { TestBed } from '@angular/core/testing';

import { RegimenAlimenticioService } from './regimen-alimenticio.service';

describe('RegimenAlimenticioService', () => {
  let service: RegimenAlimenticioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegimenAlimenticioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
