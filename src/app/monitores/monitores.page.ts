import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioGeneralService } from './../Model/UsuarioGeneral/usuario-general.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MonitorDetallesComponent } from './monitor-detalles/monitor-detalles.component';
import { MonitoriaService } from '../Model/Monitoria/monitoria.service';
import { evento } from '../calendario/evento';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {
  monitores: Array<UsuarioGeneral> = [];
  monitoresRecomendados:  Array<UsuarioGeneral> = [];
  usuarioActual: UsuarioGeneral;

  public eventos: evento[] = [];

  constructor(private popoverCtrl:PopoverController, 
    private monService: MonitoriaService,
    public navCtrl: NavController,
    private logService: LoginService,
    private userService: UsuarioGeneralService
  ) { }

  ngOnInit() {
    this.monService.obtenerMonitores().subscribe(
      result => {
        this.monitores = result;
        console.log("Monitores ",this.monitores)
        this.monitores = this.ordenarMonitores(this.obtenerPuntajes(this.monitores))
        this.sugerenciasMonitores(this.monitores)
      },
      error => console.log(error)
    )

  }


  async mostrarInfo(indice){
    console.log("Indie", indice)
    const popover = await this.popoverCtrl.create({
      component: MonitorDetallesComponent,
      componentProps: {
        idUsuario: indice
      },
      cssClass: 'popover',
      translucent: true
    }); 

    await popover.present();

    const {data} = await popover.onDidDismiss();
    console.log(data);
    if(data.presionado > 0){
      //this.navCtrl.setDirection("/servicios-academicos")
    }

    this.monService.votarMonitor(268,5).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  sugerenciasMonitores(monitores: Array<UsuarioGeneral>){
    this.usuarioActual = this.logService.getUser();

    for(let i=0; i<monitores.length; i++){
      for(let j=0; j< this.usuarioActual.estilosAprendizaje.length; j++){
        for(let k=0; k<this.monitores[i].estilosAprendizaje.length; k++){
            if(monitores[i].estilosAprendizaje[k].id == this.usuarioActual.estilosAprendizaje[j].id && !this.monitoresRecomendados.includes(monitores[i])){
              this.mirarProblemasHorarios(monitores[i])
              this.monitoresRecomendados.push(monitores[i]);
            }
        }
      }
    }

    console.log(this.monitoresRecomendados)

  }

  mirarProblemasHorarios(monitor: UsuarioGeneral){
    this.eventos = JSON.parse(localStorage.getItem("eventos"))
    
    let eventosMonitor = monitor.monitorDe;
    console.log("Monitor", eventosMonitor)
    console.log("Usuario", this.eventos)





    
  }










  ordenarMonitores(monitores: Array<UsuarioGeneral>){
    let monitoresOrdenados = monitores;
    monitoresOrdenados.sort(function (a, b) {
      if (a.puntajeTotal > b.puntajeTotal) {
        return -1;
      }
      if (a.puntajeTotal < b.puntajeTotal) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    return monitoresOrdenados;
  }

  obtenerPuntajes(monitores: Array<UsuarioGeneral>){
    let sumaTotal = 0;
    let cantidadVotos = 0;
    for(let i=0; i<monitores.length; i++){
      for(let j=0; j<monitores[i].monitorDe.length; j++){
        cantidadVotos += monitores[i].monitorDe[j].cantidadVotos;
        sumaTotal += monitores[i].monitorDe[j].calificacion;
      }
      monitores[i].puntajeTotal = +(sumaTotal/cantidadVotos).toFixed(2); ;
    }

    return monitores;
  }



}
