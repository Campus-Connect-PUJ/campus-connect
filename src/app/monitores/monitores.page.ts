import { UsuarioGeneralService } from './../Model/UsuarioGeneral/usuario-general.service';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MonitorDetallesComponent } from './monitor-detalles/monitor-detalles.component';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {



  monitores: Array<UsuarioGeneral> = [];


  constructor(private popoverCtrl:PopoverController, 
    private userService: UsuarioGeneralService
  ) { }

  ngOnInit() {
    this.userService.getUsuarios().subscribe(
      usuarios => {
        this.monitores = usuarios;
        this.monitores = this.guardarSoloMonitores(this.monitores);
        console.log("moni ", this.monitores);
      },
      error => console.error(error)
    );
  }


  async mostrarInfo(){
    const popover = await this.popoverCtrl.create({
      component: MonitorDetallesComponent,
      cssClass: 'popover',
      translucent: true
    }); 
    return await popover.present();
  }

  guardarSoloMonitores(monitores: Array<UsuarioGeneral>){
    let soloMonitores: Array<UsuarioGeneral> = [];

    for(let i=0; i< this.monitores.length; i++){
      if(monitores[i].rol === "MONITOR"){
        soloMonitores.push(monitores[i]);
      }
    }

    return soloMonitores;
  }

}
