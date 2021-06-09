import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Proprietaire } from 'src/app/models/proprietaire';
import { ProprietaireService } from 'src/app/services/proprietaire.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss'],
})
export class ProprietaireComponent implements OnInit {
  // proprietaireForm !: FormGroup;
  isMand: boolean = false;
  mandataire!: {};
  errors!: any;
  constructor(private proprietaire: ProprietaireService) {}

  ngOnInit(): void {
    console.log(this.proprietaire.getProprietaire());
  }

  proprietaireForm: any = new FormGroup({
    // Champs du propriètaire
    cin: new FormControl('', Validators.required),
    passport: new FormControl('', Validators.required),
    carte_sejour: new FormControl('', Validators.required),
    nom_prenom: new FormControl('', Validators.required),
    raison_social: new FormControl('', Validators.required),
    n_registre_commerce: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    fax: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    n_compte_bancaire: new FormControl('', Validators.required),
    banque: new FormControl('', Validators.required),
    nom_agence_bancaire: new FormControl('', Validators.required),
    has_mandataire: new FormControl('', Validators.required),
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

  onSubmit() {
    this.proprietaire.PostProprietaire(this.proprietaireForm.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        this.errors = error.error.message;

        console.log(error.error.message);
      }
    );
  }
}
