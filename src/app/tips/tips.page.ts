import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tip } from './shared/tips';
import { TipsService } from './shared/tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  tips: Tip[] = [];

  constructor(
    private tipsService: TipsService,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.findTips();
  }

  findTips(){
    this.tipsService.getTips().subscribe(
      results => {
        console.log(results);
        this.tips = results;
      },
      error => console.error(error)
    )
  }

  private tipsPrueba = [
    {
      id: '1',
      title: 'tip1',
      descripcion: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: '2',
      title: 'tip2',
      descripcion: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    },
    {
      id: '3',
      title: 'tip3',
      descripcion: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: '4',
      title: 'tip4',
      descripcion: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    },
    {
      id: '5',
      title: 'tip5',
      descripcion: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: '6',
      title: 'tip6',
      descripcion: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    },
    {
      id: '7',
      title: 'tip7',
      descripcion: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: '6',
      title: 'tip8',
      descripcion: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    }
  ]

}
