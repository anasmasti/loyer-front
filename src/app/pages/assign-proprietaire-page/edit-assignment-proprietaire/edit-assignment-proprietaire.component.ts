import { Component, Input, OnInit } from '@angular/core';
import { AssignmentProprietaire } from 'src/app/models/AssignmentProprietaire';

@Component({
  selector: 'app-edit-assignment-proprietaire',
  templateUrl: './edit-assignment-proprietaire.component.html',
  styleUrls: ['./edit-assignment-proprietaire.component.scss'],
})
export class EditAssignmentProprietaireComponent implements OnInit {
  @Input() assignmentProprietaire!: AssignmentProprietaire;
  @Input() proprietaireInfo!: string;
  constructor() {}

  ngOnInit(): void {
  }
}