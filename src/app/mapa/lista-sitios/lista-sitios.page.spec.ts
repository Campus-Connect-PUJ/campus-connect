import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaSitiosPage } from './lista-sitios.page';

describe('ListaSitiosPage', () => {
  let component: ListaSitiosPage;
  let fixture: ComponentFixture<ListaSitiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSitiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaSitiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
