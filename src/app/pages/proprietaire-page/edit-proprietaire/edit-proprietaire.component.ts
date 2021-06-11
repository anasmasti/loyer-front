import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Proprietaire } from './../../../models/proprietaire';
@Component({
  selector: 'app-edit-proprietaire',
  templateUrl: './edit-proprietaire.component.html',
  styleUrls: ['./edit-proprietaire.component.scss'],
})
export class EditProprietaireComponent implements OnInit, OnChanges {
  isMand: boolean = false;
  errors!: any;
  success: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;
  mandataireList: any = [];
  @Input() proprietaire!: any;

  proprietaireForm: any = new FormGroup({
    // Champs du propriètaire
    cin: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passport: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    carte_sejour: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    nom_prenom: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    raison_social: new FormControl('', [Validators.required]),
    n_registre_commerce: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    fax: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    adresse: new FormControl('', [Validators.required]),
    n_compte_bancaire: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
    ]),
    banque: new FormControl('', [Validators.required]),
    nom_agence_bancaire: new FormControl('', [Validators.required]),
    has_mandataire: new FormControl('', [Validators.required]),
    // Champs du mandataire

    cin_mandataire: new FormControl('', Validators.minLength(4)),
    nom_prenom_mandataire: new FormControl('', Validators.pattern('[a-zA-Z]*')),
    raison_social_mandataire: new FormControl(''),
    telephone_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
    fax_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
    adresse_mandataire: new FormControl(''),
    n_compte_bancaire_mandataire: new FormControl(
      '',
      Validators.pattern('[0-9]*')
    ),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnChanges() {
    this.fetchProprietaire();
  }

  ngOnInit(): void {}

  fetchProprietaire() {
    if (this.proprietaire.has_mandataire) {
      this.isMand = true;
      this.mandataireList = this.proprietaire.mandataire[0];
      this.proprietaireForm.patchValue({
        cin: this.proprietaire.cin,
        passport: this.proprietaire.passport,
        carte_sejour: this.proprietaire.carte_sejour,
        nom_prenom: this.proprietaire.nom_prenom,
        raison_social: this.proprietaire.raison_social,
        n_registre_commerce: this.proprietaire.n_registre_commerce,
        telephone: this.proprietaire.telephone,
        fax: this.proprietaire.fax,
        adresse: this.proprietaire.adresse,
        n_compte_bancaire: this.proprietaire.n_compte_bancaire,
        banque: this.proprietaire.banque,
        nom_agence_bancaire: this.proprietaire.nom_agence_bancaire,
        has_mandataire: this.proprietaire.has_mandataire,

        cin_mandataire: this.mandataireList.cin_mandataire,
        nom_prenom_mandataire: this.mandataireList.nom_prenom_mandataire,
        raison_social_mandataire: this.mandataireList.raison_social_mandataire,
        telephone_mandataire: this.mandataireList.telephone_mandataire,
        fax_mandataire: this.mandataireList.fax_mandataire,
        adresse_mandataire: this.mandataireList.adresse_mandataire,
        n_compte_bancaire_mandataire:
          this.mandataireList.n_compte_bancaire_mandataire,
      });
    } else if (!this.proprietaire.has_mandataire) {
      this.isMand = false;
      this.proprietaireForm.patchValue({
        cin: this.proprietaire.cin,
        passport: this.proprietaire.passport,
        carte_sejour: this.proprietaire.carte_sejour,
        nom_prenom: this.proprietaire.nom_prenom,
        raison_social: this.proprietaire.raison_social,
        n_registre_commerce: this.proprietaire.n_registre_commerce,
        telephone: this.proprietaire.telephone,
        fax: this.proprietaire.fax,
        adresse: this.proprietaire.adresse,
        n_compte_bancaire: this.proprietaire.n_compte_bancaire,
        banque: this.proprietaire.banque,
        nom_agence_bancaire: this.proprietaire.nom_agence_bancaire,
        has_mandataire: this.proprietaire.has_mandataire,

        cin_mandataire: '',
        nom_prenom_mandataire: '',
        raison_social_mandataire: '',
        telephone_mandataire: '',
        fax_mandataire: '',
        adresse_mandataire: '',
        n_compte_bancaire_mandataire: '',
      });
    }
  }

  updateProprietaire() {}

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  get cin() {
    return this.proprietaireForm.get('cin');
  }
  get passport() {
    return this.proprietaireForm.get('passport');
  }
  get carte_sejour() {
    return this.proprietaireForm.get('carte_sejour');
  }
  get nom_prenom() {
    return this.proprietaireForm.get('nom_prenom');
  }
  get raison_social() {
    return this.proprietaireForm.get('raison_social');
  }
  get n_registre_commerce() {
    return this.proprietaireForm.get('n_registre_commerce');
  }
  get telephone() {
    return this.proprietaireForm.get('telephone');
  }
  get fax() {
    return this.proprietaireForm.get('fax');
  }
  get adresse() {
    return this.proprietaireForm.get('adresse');
  }
  get n_compte_bancaire() {
    return this.proprietaireForm.get('n_compte_bancaire');
  }
  get banque() {
    return this.proprietaireForm.get('banque');
  }
  get nom_agence_bancaire() {
    return this.proprietaireForm.get('nom_agence_bancaire');
  }
  get has_mandataire() {
    return this.proprietaireForm.get('has_mandataire');
  }
  // Mandataire
  get cin_mandataire() {
    return this.proprietaireForm.get('cin_mandataire');
  }
  get nom_prenom_mandataire() {
    return this.proprietaireForm.get('nom_prenom_mandataire');
  }
  get raison_social_mandataire() {
    return this.proprietaireForm.get('raison_social_mandataire');
  }
  get telephone_mandataire() {
    return this.proprietaireForm.get('telephone_mandataire');
  }
  get fax_mandataire() {
    return this.proprietaireForm.get('fax_mandataire');
  }
  get adresse_mandataire() {
    return this.proprietaireForm.get('adresse_mandataire');
  }
  get n_compte_bancaire_mandataire() {
    return this.proprietaireForm.get('n_compte_bancaire_mandataire');
  }
}
