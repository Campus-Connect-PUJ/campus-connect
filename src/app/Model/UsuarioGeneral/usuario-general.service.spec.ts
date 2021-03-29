import { TestBed } from '@angular/core/testing';

import { UsuarioGeneralService } from './usuario-general.service';

describe('UsuarioGeneralService', () => {
  let service: UsuarioGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
