import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioPersoGruposPage } from './formulario-perso-grupos.page';

describe('FormularioPersoGruposPage', () => {
  let component: FormularioPersoGruposPage;
  let fixture: ComponentFixture<FormularioPersoGruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPersoGruposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPersoGruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
