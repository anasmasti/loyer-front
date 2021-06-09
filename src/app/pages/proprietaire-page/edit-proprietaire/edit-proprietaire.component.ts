import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'

@Component({
  selector: 'app-edit-proprietaire',
  templateUrl: './edit-proprietaire.component.html',
  styleUrls: ['./edit-proprietaire.component.scss']
})
export class EditProprietaireComponent implements OnInit {
  isMand: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  proprietaireForm: any = new FormGroup({
    // Champs du propriètaire
    cin: new FormControl(''),
    passport: new FormControl(''),
    carte_sejour: new FormControl(''),
    nom_prenom: new FormControl(''),
    raison_social: new FormControl(''),
    n_registre_commerce: new FormControl(''),
    telephone: new FormControl(''),
    fax: new FormControl(''),
    adresse: new FormControl(''),
    n_compte_bancaire: new FormControl(''),
    banque: new FormControl(''),
    nom_agence_bancaire: new FormControl(''),
    has_mandataire: new FormControl(''),
    // Champs du mandataire
    mandataire: new FormGroup({
      cin_mandataire: new FormControl(''),
      nom_prenom_mandataire: new FormControl(''),
      raison_social_mandataire: new FormControl(''),
      telephone_mandataire: new FormControl(''),
      fax_mandataire: new FormControl(''),
      adresse_mandataire: new FormControl(''),
      n_compte_bancaire_mandataire: new FormControl(''),
    }),
  });


}
