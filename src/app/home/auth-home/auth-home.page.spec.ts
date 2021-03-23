import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthHomePage } from './auth-home.page';

describe('AuthHomePage', () => {
  let component: AuthHomePage;
  let fixture: ComponentFixture<AuthHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
