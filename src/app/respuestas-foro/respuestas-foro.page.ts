import { RespuestasForoService } from './../Model/RespuestasForo/respuestas-foro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaForo } from '../Model/RespuestasForo/respuestas-foro';

@Component({
  selector: 'app-respuestas-foro',
  templateUrl: './respuestas-foro.page.html',
  styleUrls: ['./respuestas-foro.page.scss'],
})
export class RespuestasForoPage implements OnInit {
  respuestasUsuario: Array<RespuestaForo>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private respService: RespuestasForoService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      if(recipeId != null){
        console.log(recipeId)
        this.respService.getRespuestasForoById(+recipeId).subscribe(
          result => {this.respuestasUsuario = result
            console.log("respuestas", this.respuestasUsuario)
            console.log("->", this.respuestasUsuario[0].idForoRespondido)
          },
          error => console.log(error)
        );
        //this.cargarTipsUsuarios(Number(recipeId));
      }
      else{
        //this.cargarTips();
      }
    })
  }

  /*
  cargarTipsUsuarios(idUsuario: number){
    let tipsUsuario = new Array<Tip>();
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
        for(let i=0; i<this.tips.length; i++){
          console.log(".>", this.tips[i])
          if(this.tips[i].idUsuarioCreador === idUsuario){
            tipsUsuario.push(this.tips[i]);
          }
        }
        this.tips = tipsUsuario;
        console.log("Los tips", this.tips)
      },
      error => console.error(error)
    )
  }
*/

}
