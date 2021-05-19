import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitoresPageRoutingModule } from './monitores-routing.module';

import { MonitoresPage } from './monitores.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MonitoresPageRoutingModule
  ],
  declarations: [MonitoresPage]
})
export class MonitoresPageModule {}
