import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { RecomendacionTipPage } from './recomendacion-tip.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RecomendacionTipPage', () => {
  let component: RecomendacionTipPage;
  let fixture: ComponentFixture<RecomendacionTipPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacionTipPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendacionTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
