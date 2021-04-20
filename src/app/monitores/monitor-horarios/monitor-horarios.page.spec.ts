import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorHorariosPage } from './monitor-horarios.page';

describe('MonitorHorariosPage', () => {
  let component: MonitorHorariosPage;
  let fixture: ComponentFixture<MonitorHorariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorHorariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
