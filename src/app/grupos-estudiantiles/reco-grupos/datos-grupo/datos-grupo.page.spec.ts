import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { DatosGrupoPage } from './datos-grupo.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DatosGrupoPage', () => {
  let component: DatosGrupoPage;
  let fixture: ComponentFixture<DatosGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosGrupoPage ],
      imports: [IonicModule.forRoot(), , HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
