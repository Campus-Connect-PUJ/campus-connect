import { Component, OnInit } from '@angular/core';
import { Foro } from '../Model/Foro.model';
import { PopoverController } from '@ionic/angular';
import { OpcionesComponent } from '../opciones/opciones.component';
import { PostService } from './shared/post.service';


@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  
  foros: Foro[] = Array<Foro>();
  textoBuscar='';

  constructor(
    private popoverController: PopoverController,
    private forosService: PostService
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
