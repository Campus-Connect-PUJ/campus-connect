import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecomendacionTipPage } from './recomendacion-tip.page';

describe('RecomendacionTipPage', () => {
  let component: RecomendacionTipPage;
  let fixture: ComponentFixture<RecomendacionTipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacionTipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendacionTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
