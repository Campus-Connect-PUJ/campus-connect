import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { MapaRutaPage } from './mapa-ruta.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MapaRutaPage', () => {
  let component: MapaRutaPage;
  let fixture: ComponentFixture<MapaRutaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaRutaPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, 
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
