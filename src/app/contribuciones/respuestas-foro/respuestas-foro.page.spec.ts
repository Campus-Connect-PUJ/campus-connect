import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespuestasForoPage } from './respuestas-foro.page';

describe('RespuestasForoPage', () => {
  let component: RespuestasForoPage;
  let fixture: ComponentFixture<RespuestasForoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasForoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespuestasForoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
