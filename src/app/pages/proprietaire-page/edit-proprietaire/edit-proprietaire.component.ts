import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit-proprietaire',
  templateUrl: './edit-proprietaire.component.html',
  styleUrls: ['./edit-proprietaire.component.scss'],
})
export class EditProprietaireComponent implements OnInit {
  @Input() proprietaire!: any;

  constructor() {}

  ngOnInit(): void {
    
  }
}
