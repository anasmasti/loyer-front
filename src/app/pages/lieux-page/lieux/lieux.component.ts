import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss']
})
export class LieuxComponent implements OnInit {
  lieux = [
    { 'name': 'DR' },
    { 'name': 'LF' },
    { 'name': 'PV' },
    { 'name': 'Siege' },
    { 'name': 'SV' },
  ]
  activeLieux = ''

  constructor() { }

  ngOnInit(): void {
  }

  showForm(lieu_name: string) {
    this.activeLieux = lieu_name
  }
}
