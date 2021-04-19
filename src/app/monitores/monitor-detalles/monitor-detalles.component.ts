import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-detalles',
  templateUrl: './monitor-detalles.component.html',
  styleUrls: ['./monitor-detalles.component.scss'],
})
export class MonitorDetallesComponent implements OnInit {
  @Input() idUsuario

  constructor() { }

  ngOnInit() {
    console.log(this.idUsuario)

  }

}
