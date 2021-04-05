import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';

import { GrupoEstudiantil } from '../../../Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from '../../../Model/GrupoEstudiantil/grupo-estudiantil.service';

@Component({
  selector: 'app-datos-grupo',
  templateUrl: './datos-grupo.page.html',
  styleUrls: ['./datos-grupo.page.scss'],
})
export class DatosGrupoPage implements OnInit {

  grupoSelect : GrupoEstudiantil =  new GrupoEstudiantil("", "", "");
  tematicas: Tematica[];

  constructor( private activatedRoute :ActivatedRoute, private grupoEstudiantilService : GrupoEstudiantilService, private tematicasService : TematicaService ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      const grupoID = paramMap.get('grupoID')
      this.findGrupo(+grupoID);
    }) 
  }

  findGrupo(grupoID: number) {
    this.grupoEstudiantilService.getGrupoById(grupoID).subscribe(
      results => {
        console.log(results);
        this.grupoSelect = results;
      },
      error => console.error(error)
    )
  }

  findTematica() {
    this.tematicasService.getTematicas().subscribe(
      results => {
        console.log(results);
        this.tematicas = results;
      },
      error => console.error(error)
    )
  }
}
