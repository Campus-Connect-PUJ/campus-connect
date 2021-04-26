import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  usuario: UsuarioGeneral;
  estilosAprendizaje: Array<TipoAprendizaje>;

  constructor(
    private loginService: LoginService,
    private userService: UsuarioGeneralService
  ) { }

  ngOnInit() {
    this.userService.getUsuario(this.loginService.getUser().id).subscribe(
      result => {
        this.usuario = result
        console.log(this.usuario)
        this.estilosAprendizaje = this.usuario.estilosAprendizaje;
        console.log(this.estilosAprendizaje)
        
      },
      error => console.log(error)
    )
    
  }

}