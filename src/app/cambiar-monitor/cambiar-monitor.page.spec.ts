import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambiarMonitorPage } from './cambiar-monitor.page';

describe('CambiarMonitorPage', () => {
  let component: CambiarMonitorPage;
  let fixture: ComponentFixture<CambiarMonitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarMonitorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarMonitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
