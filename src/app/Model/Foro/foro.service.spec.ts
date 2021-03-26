import { TestBed } from '@angular/core/testing';

import { ForoService } from './post.service';

describe('PostService', () => {
  let service: ForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
