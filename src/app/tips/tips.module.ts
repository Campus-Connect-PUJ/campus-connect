import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipsPageRoutingModule } from './tips-routing.module';

import { TipsPage } from './tips.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TipsPageRoutingModule
  ],
  declarations: [TipsPage]
})
export class TipsPageModule {}
