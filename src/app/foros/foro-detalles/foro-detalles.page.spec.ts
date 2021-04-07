import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForoDetallesPage } from './foro-detalles.page';

describe('ForoDetallesPage', () => {
  let component: ForoDetallesPage;
  let fixture: ComponentFixture<ForoDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForoDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
