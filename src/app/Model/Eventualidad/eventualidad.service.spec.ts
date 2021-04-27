/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventualidadService } from './eventualidad.service';

describe('Service: Eventualidad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventualidadService]
    });
  });

  it('should ...', inject([EventualidadService], (service: EventualidadService) => {
    expect(service).toBeTruthy();
  }));
});
