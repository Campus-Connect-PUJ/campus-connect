import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipCrearPage } from './tip-crear.page';

describe('TipCrearPage', () => {
  let component: TipCrearPage;
  let fixture: ComponentFixture<TipCrearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipCrearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
