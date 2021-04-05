import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendacionTipPageRoutingModule } from './recomendacion-tip-routing.module';

import { RecomendacionTipPage } from './recomendacion-tip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendacionTipPageRoutingModule
  ],
  declarations: [RecomendacionTipPage]
})
export class RecomendacionTipPageModule {}
