import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';
import { Router } from '@angular/router';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { PropValidator } from './proprietaire-valodators.service';

@Component({
  selector: 'app-form-proprietaire',
  templateUrl: './form-proprietaire.component.html',
  styleUrls: ['./form-proprietaire.component.scss'],
})
export class FormProprietaireComponent implements OnInit, OnChanges {
  @Input() proprietaire!: any;
  @Input() update!: boolean;


  errors!: any;
  Updatesuccess: string = 'Propriétaire modifié avec succés';
  PostSucces: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;
  updateDone: boolean = false;
  proprietaireForm!: FormGroup;

  userMatricule: any = localStorage.getItem('matricule');

  //les calcules
  contrat!: any[];

  default_proprietaire: any;
  proprietaires: any = [];

  // Proprietaire type
  personPhysique!: boolean;
  type_proprietaire!: string;
  proprTypeCheck: boolean = false;

  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService,
    public router: Router,
    private help: HelperService,
    private confirmationModalService: ConfirmationModalService
  ) {
    this.insertProprietaireForm();
  }

  ngOnChanges() {
    if (this.proprietaire) {
      this.fetchProprietaire();
    }
  }

  ngOnInit(): void {
    this.proprietaireForm.get('cin')?.valueChanges.subscribe((_) => {
      this.proprietaireForm.get('cin')?.clearValidators();
      this.proprietaireForm
        .get('cin')
        ?.setValidators(
          PropValidator.runInOrder([
            Validators.maxLength(8),
            PropValidator.checkProprietairePhysique(this.personPhysique),
          ])
        );
    });

    this.proprietaireForm.get('nom_prenom')?.valueChanges.subscribe((_) => {
      this.proprietaireForm.get('nom_prenom')?.clearValidators();
      this.proprietaireForm
        .get('nom_prenom')
        ?.setValidators(
          PropValidator.runInOrder([
            Validators.minLength(6),
            Validators.pattern('[a-zA-Z ]*'),
            PropValidator.checkProprietairePhysique(this.personPhysique),
          ])
        );
    });

    this.proprietaireForm.get('raison_social')?.valueChanges.subscribe((_) => {
      this.proprietaireForm.get('raison_social')?.clearValidators();
      this.proprietaireForm
        .get('raison_social')
        ?.setValidators(
          PropValidator.runInOrder([
            PropValidator.checkProprietaireMoral(this.personPhysique),
          ])
        );
    });

    this.proprietaireForm
      .get('n_registre_commerce')
      ?.valueChanges.subscribe((_) => {
        this.proprietaireForm.get('n_registre_commerce')?.clearValidators();
        this.proprietaireForm
          .get('n_registre_commerce')
          ?.setValidators(
            PropValidator.runInOrder([
              Validators.pattern('[0-9]*'),
              PropValidator.checkProprietaireMoral(this.personPhysique),
            ])
          );
      });
  } //End ngOnInit

  insertProprietaireForm() {
    this.proprietaireForm = new FormGroup({
      // Champs du propriètaire
      cin: new FormControl(''),
      passport: new FormControl('', [Validators.maxLength(8)]),
      carte_sejour: new FormControl('', [Validators.maxLength(8)]),
      nom_prenom: new FormControl(''),
      raison_social: new FormControl(''),
      n_registre_commerce: new FormControl(''),
      telephone: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      fax: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      adresse: new FormControl('', [Validators.required]),
      n_compte_bancaire: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{24}'),
        Validators.maxLength(24),
      ]),
      banque: new FormControl('', [Validators.required]),
      nom_agence_bancaire: new FormControl(''),
      is_person_physique: new FormControl(''),
    });
  }

  fetchProprietaire() { 
    this.proprietaireTypeToggel(this.proprietaire.type_proprietaire);

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
      banque_rib: this.proprietaire.banque_rib,
      ville_rib: this.proprietaire.ville_rib,
      cle_rib: this.proprietaire.cle_rib,
    });
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  scrollToTop() {
    this.help.scrollToTop();
  }


  // function to open model
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open confirmation modal
  }

  addProprietaire() {
    let proprietaire_data: any = {
      // _id: this.proprietaireForm.get('_id').value ,
      cin: this.proprietaireForm.get('cin')?.value || '',
      passport: this.proprietaireForm.get('passport')?.value || '',
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value || '',
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value,
      raison_social: this.proprietaireForm.get('raison_social')?.value,
      n_registre_commerce:
        this.proprietaireForm.get('n_registre_commerce')?.value || '',
      telephone: this.proprietaireForm.get('telephone')?.value || '',
      fax: this.proprietaireForm.get('fax')?.value,
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire:
        this.proprietaireForm.get('nom_agence_bancaire')?.value || '',
      banque_rib: this.proprietaireForm.get('banque_rib')?.value,
      ville_rib: this.proprietaireForm.get('ville_rib')?.value,
      cle_rib: this.proprietaireForm.get('cle_rib')?.value,
      type_proprietaire: this.type_proprietaire
    };

    this.proprietaireService
      .postProprietaire(proprietaire_data, this.userMatricule)
      .subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            //this.proprietaireForm.reset();
            this.postDone = false;
            this.help.toTheUp();
            this.router.navigate(['/foncier/list']).then(() => {
              this.help.refrechPage();
            });
          }, 3000);
        },
        (error) => {
          this.errors = error.error?.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 3000);
          this.hideErrorMessage();
        }
      );
  }

  updateProprietaire() {
    let id = this.proprietaire._id;
  
    let proprietaireData: any = {
      // _id: this.proprietaireForm.get('_id').value ,
      cin: this.proprietaireForm.get('cin')?.value || '',
      passport: this.proprietaireForm.get('passport')?.value || '',
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value || '',
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value || '',
      raison_social: this.proprietaireForm.get('raison_social')?.value || '',
      n_registre_commerce:
        this.proprietaireForm.get('n_registre_commerce')?.value || '',
      telephone: this.proprietaireForm.get('telephone')?.value || '',
      fax: this.proprietaireForm.get('fax')?.value || '',
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire:
        this.proprietaireForm.get('nom_agence_bancaire')?.value || '',
      banque_rib: this.proprietaireForm.get('banque_rib')?.value,
      ville_rib: this.proprietaireForm.get('ville_rib')?.value,
      cle_rib: this.proprietaireForm.get('cle_rib')?.value,
      type_proprietaire: this.type_proprietaire
    };

    this.proprietaireService
      .updateProprietaire(id, proprietaireData, this.userMatricule)
      .subscribe(
        (_) => {
          this.updateDone = true;
          setTimeout(() => {
            this.mainModalService.close();
            this.updateDone = false;
            location.reload();
          }, 3000);
        },

        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 4000);
          this.hideErrorMessage();
        }
      );
  }


  // function to close the model
  closeModel() {
    this.confirmationModalService.close();
  }

  proprietaireTypeToggel(value: string) {
    if (value === 'Personne physique') {
      this.personPhysique = true;
    }
    if (value === 'Personne morale') {
      this.personPhysique = false;
    }

    this.proprTypeCheck = true;
    this.type_proprietaire = value;
  }

  // Get proprietaire form controlers
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
  get montant_loyer() {
    return this.proprietaireForm.get('montant_loyer');
  }
  get banque_rib() {
    return this.proprietaireForm.get('banque_rib');
  }
  get ville_rib() {
    return this.proprietaireForm.get('ville_rib');
  }
  get cle_rib() {
    return this.proprietaireForm.get('cle_rib');
  }
}
