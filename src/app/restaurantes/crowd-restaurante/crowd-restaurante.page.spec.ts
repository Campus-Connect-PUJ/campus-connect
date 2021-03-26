import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrowdRestaurantePage } from './crowd-restaurante.page';

describe('CrowdRestaurantePage', () => {
  let component: CrowdRestaurantePage;
  let fixture: ComponentFixture<CrowdRestaurantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdRestaurantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrowdRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
