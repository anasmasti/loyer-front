import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {

  Ajouter: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
