import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
})
export class OpcionesComponent implements OnInit {
  items = Array(3);

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onClick(valor: number){
    console.log("item",valor)
    this.popoverController.dismiss({item: valor});;
  }

}
