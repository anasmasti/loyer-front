import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foncier',
  templateUrl: './foncier.component.html',
  styleUrls: ['./foncier.component.scss']
})
export class FoncierComponent implements OnInit {

  foncier: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
