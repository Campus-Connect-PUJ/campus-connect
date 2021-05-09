import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Formulario2Page } from './formulario2.page';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('Formulario2Page', () => {
  let component: Formulario2Page;
  let fixture: ComponentFixture<Formulario2Page>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Formulario2Page ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Formulario2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
