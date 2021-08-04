import { Foncier } from './../../../models/Foncier';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'edit-foncier',
  templateUrl: './foncier-edit.component.html',
  styleUrls: ['./foncier-edit.component.scss']
})
export class FoncierEditComponent implements OnInit {

  @Input() foncier!: Foncier;

  constructor() { }

  ngOnInit(): void {
  }

}
