import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecomendarRestaurantesPage } from './recomendar-restaurantes.page';

describe('RecomendarRestaurantesPage', () => {
  let component: RecomendarRestaurantesPage;
  let fixture: ComponentFixture<RecomendarRestaurantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendarRestaurantesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendarRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
