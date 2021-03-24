import { Component, OnInit } from '@angular/core';
import { Post } from './shared/post';
import { PopoverController } from '@ionic/angular';
import { OpcionesComponent } from '../opciones/opciones.component';


@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  
  foros: Post[] = Array<Post>();


  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
    this.cargarForos();
  }

  cargarForos(){
    //this.foros[0].descripcion = "Primer foro";
    //this.foros[0].titulo = "Tiulo1";
    //this.foros[1].descripcion = "Segundo foro";
    //this.foros[1].titulo = "Tiulo2";
    //this.foros[2].descripcion = "Tercer foro";
    //this.foros[2].titulo = "Tiulo3";
  }


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

}
