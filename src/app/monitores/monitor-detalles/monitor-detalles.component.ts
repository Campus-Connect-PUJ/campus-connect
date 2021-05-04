import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-monitor-detalles',
  templateUrl: './monitor-detalles.component.html',
  styleUrls: ['./monitor-detalles.component.scss'],
})
export class MonitorDetallesComponent implements OnInit {
  @Input() idUsuario

  monitor: UsuarioGeneral;
  id = 0;
  calificacion: string;

  constructor(
    private usuarioService: UsuarioGeneralService,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
    console.log(this.idUsuario)
    this.obtenerInformacionUsuario();
  }

  obtenerInformacionUsuario(){
    this.usuarioService.getOtroUsuario(this.idUsuario).subscribe(
      result => {
        this.monitor = result;
        this.id = this.monitor.id;
      },
      error => console.error(error)
    )
  }

  ides(){
    this.popCtrl.dismiss({
      presionado: this.id
    })
  }






}
