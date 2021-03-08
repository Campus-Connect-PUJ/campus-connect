import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GruposEstudiantilesComponent } from './grupos-estudiantiles.component';

describe('GruposEstudiantilesComponent', () => {
  let component: GruposEstudiantilesComponent;
  let fixture: ComponentFixture<GruposEstudiantilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposEstudiantilesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GruposEstudiantilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
