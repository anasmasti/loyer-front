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
  success: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;

  constructor(private proprietaire: ProprietaireService) {}

  ngOnInit(): void {
    console.log(this.proprietaire.getProprietaire());
  }

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
      Validators.pattern('[a-zA-Z0-9]*'),
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
    mandataire: new FormGroup({
      cin_mandataire: new FormControl('', Validators.minLength(4)),
      nom_prenom_mandataire: new FormControl(
        '',
        Validators.pattern('[a-zA-Z]*')
      ),
      raison_social_mandataire: new FormControl(''),
      telephone_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
      fax_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
      adresse_mandataire: new FormControl(''),
      n_compte_bancaire_mandataire: new FormControl(
        '',
        Validators.pattern('[0-9]*')
      ),
    }),
  });

  onSubmit() {

      
    let data: any = 
      {
        // _id: this.proprietaireForm.get('_id').value ,
        cin: this.proprietaireForm.get('cin').value,
        passport: this.proprietaireForm.get('passport').value,
        carte_sejour: this.proprietaireForm.get('carte_sejour').value,
        nom_prenom: this.proprietaireForm.get('nom_prenom').value,
        raison_social: this.proprietaireForm.get('raison_social').value,
        n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
          .value,
        telephone: this.proprietaireForm.get('telephone').value,
        fax: this.proprietaireForm.get('fax').value,
        adresse: this.proprietaireForm.get('adresse').value,
        n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire').value,
        banque: this.proprietaireForm.get('banque').value,
        nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
          .value,
        has_mandataire: this.proprietaireForm.get('has_mandataire').value,
        mandataire: [{ 
        cin_mandataire: this.proprietaireForm.get('mandataire.cin_mandataire').value,
        nom_prenom_mandataire: this.proprietaireForm.get('mandataire.nom_prenom_mandataire').value,
        raison_social_mandataire: this.proprietaireForm.get('mandataire.raison_social_mandataire').value,
        telephone_mandataire: this.proprietaireForm.get('mandataire.telephone_mandataire').value,
        fax_mandataire: this.proprietaireForm.get('mandataire.fax_mandataire').value,
        adresse_mandataire: this.proprietaireForm.get('mandataire.adresse_mandataire').value,
        n_compte_bancaire_mandataire: this.proprietaireForm.get('mandataire.n_compte_bancaire_mandataire').value,}],
        // deleted:false,
      }  ;

      let dataWithoutMandataire: any = 
      {
        // _id: this.proprietaireForm.get('_id').value ,
        cin: this.proprietaireForm.get('cin').value,
        passport: this.proprietaireForm.get('passport').value,
        carte_sejour: this.proprietaireForm.get('carte_sejour').value,
        nom_prenom: this.proprietaireForm.get('nom_prenom').value,
        raison_social: this.proprietaireForm.get('raison_social').value,
        n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
          .value,
        telephone: this.proprietaireForm.get('telephone').value,
        fax: this.proprietaireForm.get('fax').value,
        adresse: this.proprietaireForm.get('adresse').value,
        n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire').value,
        banque: this.proprietaireForm.get('banque').value,
        nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
          .value,
        has_mandataire: this.proprietaireForm.get('has_mandataire').value,
        // mandataire: []
        // deleted:false,
      
      };

      console.log(this.has_mandataire.value)

if(this.has_mandataire.value == true){

    this.proprietaire.postProprietaire(data).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.proprietaireForm.reset();
          this.postDone = false;
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    );
}

if(this.has_mandataire.value == false){
  
  this.proprietaire.postProprietaire(dataWithoutMandataire).subscribe(
    (_) => {
      this.postDone = true;
      setTimeout(() => {
        this.proprietaireForm.reset();
        this.postDone = false;
      }, 2000);
    },
    (error) => {
      this.errors = error.error.message;
      setTimeout(() => {
        this.showErrorMessage();
      }, 3000);
      this.hideErrorMessage();
    }
  );
}
    
    
  


  }

  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

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
