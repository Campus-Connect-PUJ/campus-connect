import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { MapaPrincipalPage } from './mapa-principal.page';

describe('MapaPrincipalPage', () => {
  let component: MapaPrincipalPage;
  let fixture: ComponentFixture<MapaPrincipalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaPrincipalPage ],
      imports: [IonicModule.forRoot(), 
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
