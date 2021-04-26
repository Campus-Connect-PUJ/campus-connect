import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foro } from 'src/app/Model/Foro/foro';
import { ForoService } from 'src/app/Model/Foro/foro.service';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  foros: Foro[] = [];
  textoBuscar='';

  constructor(
    private forosService: ForoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("aaa")
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      console.log("aaa", recipeId)
      if(recipeId != null){
        console.log(recipeId)
        this.cargarForosUsuarios(Number(recipeId));
      }
    })
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

}
