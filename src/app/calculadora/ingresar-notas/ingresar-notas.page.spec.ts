import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresarNotasPage } from './ingresar-notas.page';

describe('IngresarNotasPage', () => {
  let component: IngresarNotasPage;
  let fixture: ComponentFixture<IngresarNotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarNotasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
