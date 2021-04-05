import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForosPage } from './foros.page';

describe('ForosPage', () => {
  let component: ForosPage;
  let fixture: ComponentFixture<ForosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
