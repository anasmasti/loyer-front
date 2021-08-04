import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss'],
})
export class LieuxComponent implements OnInit {
  lieux = [
    {
      id: 'DR',
      name: 'Direction régionale',
    },
    {
      id: 'LF',
      name: 'Logement de fonction',
    },
    {
      id: 'PV',
      name: 'Point de vente',
    },
    {
      id: 'Siege',
      name: 'Siège',
    },
    {
      id: 'SV',
      name: 'Supervision',
    },
  ];
  activeLieux = '';
  Lieu:any = "";
  LieuName!:string;

  constructor() {}

  ngOnInit(): void {}

  showForm(lieu_name: string) {
    this.activeLieux = lieu_name;
  }



  getLieuName(name : string){
    this.LieuName = name;
  }
}
