import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouterTestingModule } from "@angular/router/testing";
import { ListaSitiosDestinoPage } from './lista-sitios-destino.page';

describe('ListaSitiosDestinoPage', () => {
  let component: ListaSitiosDestinoPage;
  let fixture: ComponentFixture<ListaSitiosDestinoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSitiosDestinoPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaSitiosDestinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
