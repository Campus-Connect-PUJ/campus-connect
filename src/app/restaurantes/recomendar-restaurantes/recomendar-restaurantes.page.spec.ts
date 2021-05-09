import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { RecomendarRestaurantesPage } from './recomendar-restaurantes.page';

describe('RecomendarRestaurantesPage', () => {
  let component: RecomendarRestaurantesPage;
  let fixture: ComponentFixture<RecomendarRestaurantesPage>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendarRestaurantesPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendarRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
