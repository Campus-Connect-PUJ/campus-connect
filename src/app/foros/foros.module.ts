import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForosPageRoutingModule } from './foros-routing.module';

import { ForosPage } from './foros.page';
import { OpcionesComponent } from '../opciones/opciones.component';
import { PipesModule } from '../pipes/pipes.module';
import { FiltroForosPipe } from '../pipes/filtro-foros.pipe';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ForosPageRoutingModule,
    FiltroForosPipe
  ],
  declarations: [ForosPage, OpcionesComponent, FiltroForosPipe]
})
export class ForosPageModule {}
