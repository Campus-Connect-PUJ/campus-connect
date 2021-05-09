import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { SugeRestaurantesPage } from './suge-restaurantes.page';

describe('SugeRestaurantesPage', () => {
  let component: SugeRestaurantesPage;
  let fixture: ComponentFixture<SugeRestaurantesPage>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SugeRestaurantesPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SugeRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
