import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainModalService } from 'src/app/services/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire.service';

@Component({
  selector: 'app-edit-proprietaire',
  templateUrl: './edit-proprietaire.component.html',
  styleUrls: ['./edit-proprietaire.component.scss'],
})
export class EditProprietaireComponent implements OnInit {
  
  @Input() proprietaire!: any;

  constructor() { }

  ngOnInit(): void { }

}
