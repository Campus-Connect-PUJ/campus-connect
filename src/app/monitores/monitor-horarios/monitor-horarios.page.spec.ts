import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { MonitorHorariosPage } from './monitor-horarios.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MonitorHorariosPage', () => {
  let component: MonitorHorariosPage;
  let fixture: ComponentFixture<MonitorHorariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorHorariosPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
