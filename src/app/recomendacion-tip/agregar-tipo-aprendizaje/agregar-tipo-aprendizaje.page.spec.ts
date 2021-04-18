import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarTipoAprendizajePage } from './agregar-tipo-aprendizaje.page';

describe('AgregarTipoAprendizajePage', () => {
  let component: AgregarTipoAprendizajePage;
  let fixture: ComponentFixture<AgregarTipoAprendizajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoAprendizajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarTipoAprendizajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
