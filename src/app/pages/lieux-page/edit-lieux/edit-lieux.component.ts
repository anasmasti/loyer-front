import { Lieu } from 'src/app/models/Lieu';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-lieux',
  templateUrl: './edit-lieux.component.html',
  styleUrls: ['./edit-lieux.component.scss']
})
export class EditLieuxComponent implements OnInit {

  @Input() Lieu!: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
