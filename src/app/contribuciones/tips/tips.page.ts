import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipsService } from 'src/app/Model/Tip/tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {
  tips: Tip[] = [];
  textoBuscar='';

  constructor(
    private tipsService: TipsService,
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      if(recipeId != null){
        console.log(recipeId)
        this.cargarTipsUsuarios(Number(recipeId));
      }
    })
  }

  cargarTipsUsuarios(idUsuario: number){
    let tipsUsuario = new Array<Tip>();
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
        for(let i=0; i<this.tips.length; i++){
          console.log(".>", this.tips[i])
          if(this.tips[i].idUsuarioCreador === idUsuario){
            tipsUsuario.push(this.tips[i]);
          }
        }
        this.tips = tipsUsuario;
        console.log("Los tips", this.tips)
      },
      error => console.error(error)
    )
  }

}
