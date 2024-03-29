import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { ReporteEventualidadesPage } from './reporte-eventualidades.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReporteEventualidadesPage', () => {
  let component: ReporteEventualidadesPage;
  let fixture: ComponentFixture<ReporteEventualidadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEventualidadesPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteEventualidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
