import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugeGruposPageRoutingModule } from './suge-grupos-routing.module';

import { SugeGruposPage } from './suge-grupos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugeGruposPageRoutingModule
  ],
  declarations: [SugeGruposPage]
})
export class SugeGruposPageModule {}
