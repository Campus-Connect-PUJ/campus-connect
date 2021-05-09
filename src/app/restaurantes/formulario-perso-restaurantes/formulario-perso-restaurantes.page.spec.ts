import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormularioPersoRestaurantesPage } from './formulario-perso-restaurantes.page';

describe('FormularioPersoRestaurantesPage', () => {
  let component: FormularioPersoRestaurantesPage;
  let fixture: ComponentFixture<FormularioPersoRestaurantesPage>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPersoRestaurantesPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPersoRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
