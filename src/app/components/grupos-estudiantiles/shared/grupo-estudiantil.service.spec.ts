import { TestBed } from '@angular/core/testing';

import { GrupoEstudiantilService } from './grupo-estudiantil.service';

describe('GrupoEstudiantilService', () => {
  let service: GrupoEstudiantilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoEstudiantilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
