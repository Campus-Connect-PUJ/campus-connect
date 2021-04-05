import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OpcionesComponent } from '../opciones/opciones.component';
import { ForoService } from '../Model/Foro/foro.service';
import { Foro } from '../Model/Foro/foro';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  
  foros: Foro[] = [];
  textoBuscar='';

  constructor(
    private popoverController: PopoverController,
    private forosService: ForoService
    ) { }

  ngOnInit() {
    this.cargarForos();
  }

  cargarForos(){
    this.forosService.getPosts().subscribe(
      results => {
        this.foros = results;
        console.log("Los foros", this.foros)
      },
      error => console.error(error)
    )
  }

  buscarForos(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }

  /*
  async mostrarPop(evento){
    const popover = await this.popoverController.create({
      component: OpcionesComponent,
      cssClass: 'prueba',
      event: evento
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log("En principal",data)
  }
  */

}
