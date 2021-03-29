import { TestBed } from '@angular/core/testing';

import { TipoComidaService } from './tipo-comida.service';

describe('TipoComidaService', () => {
  let service: TipoComidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoComidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
