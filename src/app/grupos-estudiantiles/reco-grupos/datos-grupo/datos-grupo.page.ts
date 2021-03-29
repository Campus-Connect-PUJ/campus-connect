import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GrupoEstudiantil } from '../../../Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from '../../../Model/GrupoEstudiantil/grupo-estudiantil.service';

@Component({
  selector: 'app-datos-grupo',
  templateUrl: './datos-grupo.page.html',
  styleUrls: ['./datos-grupo.page.scss'],
})
export class DatosGrupoPage implements OnInit {

  grupoSelect : GrupoEstudiantil =  new GrupoEstudiantil("", "", "");

  constructor( private activatedRoute :ActivatedRoute, private grupoEstudiantilService : GrupoEstudiantilService) { }

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

}
