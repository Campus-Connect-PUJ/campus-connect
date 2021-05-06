/* tslint:disable:no-unused-variable */

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { EventualidadService } from './eventualidad.service';

describe('Service: Eventualidad', () => {
  let service: EventualidadService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ EventualidadService ]
    });
    service = TestBed.inject(EventualidadService); 
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  });



  it('should ...', inject([EventualidadService], (service: EventualidadService) => {
    expect(service).toBeTruthy();
  }));
});
