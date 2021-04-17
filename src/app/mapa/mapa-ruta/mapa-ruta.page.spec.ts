import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapaRutaPage } from './mapa-ruta.page';

describe('MapaRutaPage', () => {
  let component: MapaRutaPage;
  let fixture: ComponentFixture<MapaRutaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaRutaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
