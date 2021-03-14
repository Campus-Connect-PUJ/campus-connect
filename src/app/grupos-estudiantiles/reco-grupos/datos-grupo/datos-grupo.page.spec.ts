import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosGrupoPage } from './datos-grupo.page';

describe('DatosGrupoPage', () => {
  let component: DatosGrupoPage;
  let fixture: ComponentFixture<DatosGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
