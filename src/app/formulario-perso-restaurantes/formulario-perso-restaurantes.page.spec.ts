import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioPersoRestaurantesPage } from './formulario-perso-restaurantes.page';

describe('FormularioPersoRestaurantesPage', () => {
  let component: FormularioPersoRestaurantesPage;
  let fixture: ComponentFixture<FormularioPersoRestaurantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPersoRestaurantesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPersoRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
