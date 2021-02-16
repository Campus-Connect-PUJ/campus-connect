import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosRestaurantePage } from './datos-restaurante.page';

describe('DatosRestaurantePage', () => {
  let component: DatosRestaurantePage;
  let fixture: ComponentFixture<DatosRestaurantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosRestaurantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
