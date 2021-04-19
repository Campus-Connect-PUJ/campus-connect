import { UsuarioGeneralService } from './../Model/UsuarioGeneral/usuario-general.service';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MonitorDetallesComponent } from './monitor-detalles/monitor-detalles.component';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { MonitoriaService } from '../Model/Monitoria/monitoria.service';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {
  monitores: Array<UsuarioGeneral> = [];


  constructor(private popoverCtrl:PopoverController, 
    private monService: MonitoriaService
  ) { }

  ngOnInit() {
    this.monService.obtenerMonitores().subscribe(
      result => {
        this.monitores = result;
        console.log("Monitores ",this.monitores)
      },
      error => console.log(error)
    )
  }


  async mostrarInfo(indice){
    console.log("Indie", indice)
    const popover = await this.popoverCtrl.create({
      component: MonitorDetallesComponent,
      componentProps: {
        idUsuario: 1
      },
      cssClass: 'popover',
      translucent: true
    }); 
    return await popover.present();
  }



}
