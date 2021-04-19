import { TestBed } from '@angular/core/testing';

import { MonitoriaService } from './monitoria.service';

describe('MonitoriaService', () => {
  let service: MonitoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
