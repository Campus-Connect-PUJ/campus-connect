import { TestBed } from '@angular/core/testing';

import { TipoAprendizajeService } from './tipo-aprendizaje.service';

describe('TipoAprendizajeService', () => {
  let service: TipoAprendizajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAprendizajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
