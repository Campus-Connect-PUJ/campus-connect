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
        console.log("Los foros", this.foros)
      },
      error => console.error(error)
    )
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
        console.log("Los foros", this.foros)
      },
      error => console.error(error)
    )
  }

  buscarForos(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }


  

}
