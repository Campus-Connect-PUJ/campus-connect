import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiciosAcademicosPage } from './servicios-academicos.page';

describe('ServiciosAcademicosPage', () => {
  let component: ServiciosAcademicosPage;
  let fixture: ComponentFixture<ServiciosAcademicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosAcademicosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosAcademicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
