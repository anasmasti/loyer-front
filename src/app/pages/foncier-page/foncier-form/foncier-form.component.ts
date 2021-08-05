import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss']
})
export class FoncierFormComponent implements OnInit {

  @Input() formType!: string;
  msg!: string;
  success: boolean = false;
  foncierForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.foncierForm = new FormGroup({
      proprietaire: new FormControl(),
      type_foncier: new FormControl(),
      adresse: new FormControl(),
      description: new FormControl(),
      lieu: new FormControl(),
      assure: new FormControl(),
      etat_du_bien: new FormControl(),
      ville: new FormControl(),
      code_postal: new FormControl(),
      pays: new FormControl(),
      montant_loyer: new FormControl(),
      meuble_equipe: new FormControl(),
    });
  }

}
