import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ServiciosAcademicosPageRoutingModule } from '../servicios-academicos/servicios-academicos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ServiciosAcademicosPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
