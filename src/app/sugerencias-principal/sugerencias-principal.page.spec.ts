import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugerenciasPrincipalPage } from './sugerencias-principal.page';

describe('SugerenciasPrincipalPage', () => {
  let component: SugerenciasPrincipalPage;
  let fixture: ComponentFixture<SugerenciasPrincipalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugerenciasPrincipalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SugerenciasPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
