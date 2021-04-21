import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugeGruposPage } from './suge-grupos.page';

describe('SugeGruposPage', () => {
  let component: SugeGruposPage;
  let fixture: ComponentFixture<SugeGruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugeGruposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SugeGruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
