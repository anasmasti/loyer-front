import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportings',
  templateUrl: './reportings.component.html',
  styleUrls: ['./reportings.component.scss']
})
export class ReportingsComponent implements OnInit {

  routes = [
    {
      id: 'contrat',
      path: '/contrat/list-global/list/list-reporting',
      descriptif: 'Reportings des contrats'
    },
    {
      id: 'foncier',
      path: '/foncier/list/list-reporting',
      descriptif: 'Reportings des locaux'
    },
    {
      id: 'lieu',
      path: '/lieux/list/list-reporting',
      descriptif: 'Reportings des entités organisationelles'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
