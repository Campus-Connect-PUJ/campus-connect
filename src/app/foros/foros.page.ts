import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ForoService } from '../Model/Foro/foro.service';
import { Foro } from '../Model/Foro/foro';
import { ActivatedRoute } from '@angular/router';

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
    private forosService: ForoService, 
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      if(recipeId != null){
        console.log(recipeId)
        this.cargarForosUsuarios(Number(recipeId));
      }
      else{
        this.cargarForos();
      }
    })
  }

  cargarForos(){
    this.forosService.getPosts().subscribe(
      results => {
        this.foros = results;
        this.foros = this.organizarForos(this.foros);
      },
      error => console.error(error)
    )
  }

  organizarForos(foros){
    let forosOrdenados = foros;
    forosOrdenados.sort(function (a, b) {
      if (a.usuariosgus > b.puntaje) {
        return -1;
      }
      if (a.puntaje < b.puntaje) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    return forosOrdenados;
  }

  cargarForosUsuarios(id: number){
    let forosUsuario = new Array<Foro>();
    this.forosService.getPosts().subscribe(
      results => {
        this.foros = results;
        for(let i=0; i<this.foros.length; i++){
          if(this.foros[i].usuario.id === id){
            forosUsuario.push(this.foros[i]);
          }
        }
        this.foros = forosUsuario;
      },
      error => console.error(error)
    )
  }

  buscarForos(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }


  

}
