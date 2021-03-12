import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoGruposPageRoutingModule } from './reco-grupos-routing.module';

import { RecoGruposPage } from './reco-grupos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RecoGruposPageRoutingModule
  ],
  exports: [RecoGruposPage],
  declarations: [RecoGruposPage]
})
export class RecoGruposPageModule {}
