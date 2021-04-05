import { TestBed } from '@angular/core/testing';

import { TipoRestauranteService } from './tipo-restaurante.service';

describe('TipoRestauranteService', () => {
  let service: TipoRestauranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoRestauranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
