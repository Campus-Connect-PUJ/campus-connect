import { Component, OnInit } from '@angular/core';
import { Post } from './shared/post';
import { PopoverController } from '@ionic/angular';
import { OpcionesComponent } from '../opciones/opciones.component';
import { PostService } from './shared/post.service';
import { UsuarioGeneral } from '../tips/shared/tips';


@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  
  foros: Post[] = Array<Post>();
  usuarios: UsuarioGeneral[] = Array<UsuarioGeneral>();
  

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
        results.forEach(element => {
          this.foros[element.id] = element;
          this.usuarios[element.id]=element.usuario;
          console.log("foros",this.foros[element.id].respuestaPost)
          console.log("usuarios",this.usuarios[element.id])
         });
        
      },
      error => console.error(error)
    )
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
