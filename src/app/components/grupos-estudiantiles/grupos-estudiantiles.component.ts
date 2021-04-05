import { Component, OnInit } from '@angular/core';
import { GrupoEstudiantil } from '../../Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from '../../Model/GrupoEstudiantil/grupo-estudiantil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos-estudiantiles',
  templateUrl: './grupos-estudiantiles.component.html',
  styleUrls: ['./grupos-estudiantiles.component.scss'],
})
export class GruposEstudiantilesComponent implements OnInit {

  grupos: GrupoEstudiantil[] = [];

  constructor(
    private geService: GrupoEstudiantilService,
    public router: Router
  ) { }

  ngOnInit() {
    this.findGrupos();
  }

  findGrupos() {
    this.geService.getGrupos().subscribe(
      results => {
        console.log(results);
        this.grupos = results;
      },
      error => console.error(error)
    )
  }
}
