import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForoCrearPage } from './foro-crear.page';

describe('ForoCrearPage', () => {
  let component: ForoCrearPage;
  let fixture: ComponentFixture<ForoCrearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoCrearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
