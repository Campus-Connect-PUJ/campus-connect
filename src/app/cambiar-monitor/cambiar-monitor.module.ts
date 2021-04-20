import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarMonitorPageRoutingModule } from './cambiar-monitor-routing.module';

import { CambiarMonitorPage } from './cambiar-monitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarMonitorPageRoutingModule
  ],
  declarations: [CambiarMonitorPage]
})
export class CambiarMonitorPageModule {}
