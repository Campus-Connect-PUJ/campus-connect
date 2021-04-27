import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestAprendizajePage } from './test-aprendizaje.page';

describe('TestAprendizajePage', () => {
  let component: TestAprendizajePage;
  let fixture: ComponentFixture<TestAprendizajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAprendizajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAprendizajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
