import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private tips = [
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
