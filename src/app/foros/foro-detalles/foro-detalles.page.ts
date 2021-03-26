import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UsuarioGeneral } from '../../Model/UsuarioGeneral.model';
import { Foro } from '../../Model/Foro.model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-foro-detalles',
  templateUrl: './foro-detalles.page.html',
  styleUrls: ['./foro-detalles.page.scss'],
})
export class ForoDetallesPage implements OnInit {
  indice: number = 0;
  foro: Foro = new Foro("", "", new UsuarioGeneral("", "", 0));

  constructor(private activatedRoute: ActivatedRoute,
              private forosService: PostService         
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


}
