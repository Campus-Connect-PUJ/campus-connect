import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Foro } from 'src/app/Model/Foro/foro';
import { ForoService } from 'src/app/Model/Foro/foro.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-foro-detalles',
  templateUrl: './foro-detalles.page.html',
  styleUrls: ['./foro-detalles.page.scss'],
})
export class ForoDetallesPage implements OnInit {
  indice: number = 0;
  color: boolean = false;
  foro: Foro = new Foro("", "", new UsuarioGeneral("", "", "", 0));

  constructor(private activatedRoute: ActivatedRoute,
              private forosService: ForoService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('foroId')
      this.indice = Number(recipeId);
      console.log("indice", this.indice)
      this.findForo(this.indice);
    })
  }

  findForo(indice: number){
    this.forosService.getPostById(indice).subscribe(
      result => {
        this.foro = result;
      },
      error => console.error(error)
    )
  }

  calificacion(operacion: number){
    console.log(operacion, this.color)
    this.color = !this.color;
    
  }


}
