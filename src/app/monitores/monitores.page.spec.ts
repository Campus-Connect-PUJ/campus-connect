import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { MonitoresPage } from './monitores.page';

describe('MonitoresPage', () => {
  let component: MonitoresPage;
  let fixture: ComponentFixture<MonitoresPage>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoresPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
