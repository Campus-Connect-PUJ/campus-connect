import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecoGruposPage } from './reco-grupos.page';

describe('RecoGruposPage', () => {
  let component: RecoGruposPage;
  let fixture: ComponentFixture<RecoGruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoGruposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoGruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
