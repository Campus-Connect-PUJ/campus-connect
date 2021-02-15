import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoGruposPageRoutingModule } from './reco-grupos-routing.module';

import { RecoGruposPage } from './reco-grupos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoGruposPageRoutingModule
  ],
  declarations: [RecoGruposPage]
})
export class RecoGruposPageModule {}
