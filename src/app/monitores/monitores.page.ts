import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MonitorDetallesComponent } from './monitor-detalles/monitor-detalles.component';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {

  constructor(private popoverCtrl:PopoverController) { }

  ngOnInit() {
  }


  async mostrarInfo(){
    const popover = await this.popoverCtrl.create({
      component: MonitorDetallesComponent,
      cssClass: 'popover',
      translucent: true
    }); 
    return await popover.present();
  }
}
