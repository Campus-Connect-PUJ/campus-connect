import { TestBed } from '@angular/core/testing';

import { RespuestasForoService } from './respuestas-foro.service';

describe('RespuestasForoService', () => {
  let service: RespuestasForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestasForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
