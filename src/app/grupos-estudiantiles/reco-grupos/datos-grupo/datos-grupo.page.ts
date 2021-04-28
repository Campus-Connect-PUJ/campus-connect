import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tematica } from 'src/app/Model/Tematica/tematica';
import { TematicaService } from 'src/app/Model/Tematica/tematica.service';

import { GrupoEstudiantil } from '../../../Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from '../../../Model/GrupoEstudiantil/grupo-estudiantil.service';
import { LoginService } from "src/app/services/login.service";
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { ReseniaGrupo } from 'src/app/Model/ReseniaGrupo/reseniaGrupo';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-datos-grupo',
  templateUrl: './datos-grupo.page.html',
  styleUrls: ['./datos-grupo.page.scss'],
})
export class DatosGrupoPage implements OnInit {

  grupoSelect : GrupoEstudiantil =  new GrupoEstudiantil("", "", "");
  tematicas: Tematica[] = [];
  puntajeAsig: number =0;
  usuario: UsuarioGeneral;
  resenia: ReseniaGrupo = new ReseniaGrupo();

  constructor( 
    private activatedRoute :ActivatedRoute, 
    private grupoEstudiantilService : GrupoEstudiantilService, 
    private tematicasService : TematicaService, 
    private loginService: LoginService,
    private usuarioSer: UsuarioGeneralService,
    public toastCtrl: ToastController ) { }

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

  guardarPuntajeGrupo(event){
    const puntaje = event.target.value;
    this.puntajeAsig = puntaje;

  }

  guardarResenia(){
    this.usuario = this.loginService.getUser(); 
    let resenia: ReseniaGrupo =new ReseniaGrupo();
    resenia.estrellas=this.puntajeAsig;
    resenia.grupoEstudiantil=this.grupoSelect;
    resenia.usuario=this.usuario;
    console.log(resenia);
    this.usuarioSer.createReseniaGrupo(
      resenia
    ).subscribe(
      results => console.log(results),
      error => console.error(error)
    );
    
    this.presentToast("Se ha guardado la reseña");

  }

  async presentToast(mensaje){
    const toast = await this.toastCtrl.create(
      {
        message: mensaje,
        duration: 4000
      }
    );
    toast.present();
  }
}
