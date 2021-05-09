import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { ReporteEventualidadesPrincipalPage } from './reporte-eventualidades-principal.page';

describe('ReporteEventualidadesPrincipalPage', () => {
  let component: ReporteEventualidadesPrincipalPage;
  let fixture: ComponentFixture<ReporteEventualidadesPrincipalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEventualidadesPrincipalPage ],
      imports: [IonicModule.forRoot(), 
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteEventualidadesPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
