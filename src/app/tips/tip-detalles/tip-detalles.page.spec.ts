import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipDetallesPage } from './tip-detalles.page';

describe('TipDetallesPage', () => {
  let component: TipDetallesPage;
  let fixture: ComponentFixture<TipDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
