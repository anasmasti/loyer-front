import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pv-form',
  templateUrl: './pv-form.component.html',
  styleUrls: ['./pv-form.component.scss']
})
export class PvFormComponent implements OnInit {

  isAmenag : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
