import { HelperService } from 'src/app/services/helpers/helper.service';
import { Proprietaire } from '../../../models/Proprietaire';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Observable, throwError } from 'rxjs';
import { ofType } from '@ngrx/effects';
@Component({
  selector: 'app-form-proprietaire',
  templateUrl: './form-proprietaire.component.html',
  styleUrls: ['./form-proprietaire.component.scss'],
})
export class FormProprietaireComponent implements OnInit, OnChanges {
  @Input() proprietaire!: any;
  isMand: boolean = false;
  errors!: any;
  Updatesuccess: string = 'Propriétaire modifié avec succés';
  PostSucces: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;
  mandataireList: any = [];
  updateDone: boolean = false;
  proprietaireForm!: FormGroup;

  userMatricule: any = localStorage.getItem('matricule');

  //les calcules
  montantLoyer!: any;
  tauxImpot!: any;
  contrat!: any[];
  retenueSource!: number;
  montantApresImpot!: number;

  lieu_id!: string;

  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService,
    private actRoute: ActivatedRoute,
    public router: Router,
    private help: HelperService,
    private lieuService: LieuxService
  ) {}

  ngOnChanges() {
    if (this.proprietaire != '') {
      this.fetchProprietaire();
    }
  }

  ngOnInit(): void {
    this.lieu_id = this.actRoute.snapshot.paramMap.get('id_lieu') || '';

    this.proprietaireForm = new FormGroup({
      // Champs du propriètaire
      cin: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      passport: new FormControl('', [Validators.maxLength(8)]),
      carte_sejour: new FormControl('', [Validators.maxLength(8)]),
      nom_prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      raison_social: new FormControl(''),
      n_registre_commerce: new FormControl('', [Validators.pattern('[0-9]*')]),
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
        Validators.pattern('[0-9]{16}'),
        Validators.maxLength(16),
      ]),
      banque_rib: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{3}'),
        Validators.maxLength(3),
      ]),
      ville_rib: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{3}'),
        Validators.maxLength(3),
      ]),
      cle_rib: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{2}'),
        Validators.maxLength(2),
      ]),
      banque: new FormControl('', [Validators.required]),
      nom_agence_bancaire: new FormControl('', []),
      montant_loyer: new FormControl('', [Validators.pattern('[0-9]*')]),
      mandataire: new FormControl('', []),
      taux_impot: new FormControl(),
      retenue_source: new FormControl(),
      montant_apres_impot: new FormControl(),

      // Champs du mandataire
      // mandataireForm: new FormArray([]),
    });

    if (this.proprietaire == '') {
      this.proprietaireForm.reset();
    }

    this.getTauxImpot();
  }

  // addFormMandateire() {
  //   const mandataireData = new FormGroup({
  //     cin_mandataire: new FormControl('', Validators.minLength(4)),
  //     nom_prenom_mandataire: new FormControl(
  //       '',
  //       Validators.pattern('[a-zA-Z]*')
  //     ),
  //     raison_social_mandataire: new FormControl(''),
  //     telephone_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
  //     fax_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
  //     adresse_mandataire: new FormControl(''),
  //     n_compte_bancaire_mandataire: new FormControl(
  //       '',
  //       Validators.pattern('[0-9]*')
  //     ),
  //   });

  //   (<FormArray>this.proprietaireForm.get('mandataireForm')).push(
  //     <FormGroup>mandataireData
  //   );

  //   return <FormGroup>mandataireData;
  // }

  // removeFormMandateire(index: number) {
  //   (<FormArray>this.proprietaireForm.get('mandataireForm')).removeAt(index);
  // }

  // removeAllMandateires() {
  //   (<FormArray>this.proprietaireForm.get('mandataireForm')).clear();
  // }

  fetchProprietaire() {
    // this.removeAllMandateires();

    // if (this.proprietaire.mandataire) {
    //   this.isMand = true;
    //   this.mandataireList = this.proprietaire.mandataire[0];
    //   this.proprietaireForm.patchValue({
    //     cin: this.proprietaire.cin,
    //     passport: this.proprietaire.passport,
    //     carte_sejour: this.proprietaire.carte_sejour,
    //     nom_prenom: this.proprietaire.nom_prenom,
    //     raison_social: this.proprietaire.raison_social,
    //     n_registre_commerce: this.proprietaire.n_registre_commerce,
    //     telephone: this.proprietaire.telephone,
    //     fax: this.proprietaire.fax,
    //     adresse: this.proprietaire.adresse,
    //     n_compte_bancaire: this.proprietaire.n_compte_bancaire,
    //     banque: this.proprietaire.banque,
    //     nom_agence_bancaire: this.proprietaire.nom_agence_bancaire,
    //     mandataire: this.proprietaire.mandataire,

    //   });

    //   // mandataire inputs
    //   for (let mandataireControl of this.proprietaire.mandataire) {
    //     let formGroup = this.addFormMandateire();

    //     formGroup.controls.cin_mandataire.setValue(
    //       mandataireControl.cin_mandataire
    //     );

    //     formGroup.controls.nom_prenom_mandataire.setValue(
    //       mandataireControl.nom_prenom_mandataire
    //     );

    //     formGroup.controls.raison_social_mandataire.setValue(
    //       mandataireControl.raison_social_mandataire
    //     );

    //     formGroup.controls.telephone_mandataire.setValue(
    //       mandataireControl.telephone_mandataire
    //     );

    //     formGroup.controls.fax_mandataire.setValue(
    //       mandataireControl.fax_mandataire
    //     );

    //     formGroup.controls.adresse_mandataire.setValue(
    //       mandataireControl.adresse_mandataire
    //     );

    //     formGroup.controls.n_compte_bancaire_mandataire.setValue(
    //       mandataireControl.n_compte_bancaire_mandataire
    //     );
    //   }
    // } else {
    // this.isMand = false;
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
      montant_loyer: this.proprietaire.montant_loyer,
      mandataire: this.proprietaire.mandataire,
      banque_rib: this.proprietaire.banque_rib,
      ville_rib: this.proprietaire.ville_rib,
      cle_rib: this.proprietaire.cle_rib,
      taux_impot: this.proprietaire.taux_impot,
      retenue_source: this.proprietaire.retenue_source,
      montant_apres_impot: this.proprietaire.montant_apres_impot,
      // mandataire inputs
      // cin_mandataire: '',
      // nom_prenom_mandataire: '',
      // raison_social_mandataire: '',
      // telephone_mandataire: '',
      // fax_mandataire: '',
      // adresse_mandataire: '',
      // n_compte_bancaire_mandataire: '',
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

  calculMontant() {
    if (!isNaN(this.montantLoyer)) {
      
      this.retenueSource = (this.montantLoyer * this.tauxImpot) / 100;
      this.montantApresImpot = this.montantLoyer - this.retenueSource;
      return this.retenueSource;
    }
    return
  }

  addProprietaire() {
    let proprietaire_data: any = {
      // _id: this.proprietaireForm.get('_id').value ,
      cin: this.proprietaireForm.get('cin')?.value || '',
      passport: this.proprietaireForm.get('passport')?.value || '',
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value || '',
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value,
      raison_social: this.proprietaireForm.get('raison_social')?.value,
      n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
        ?.value,
      telephone: this.proprietaireForm.get('telephone')?.value,
      fax: this.proprietaireForm.get('fax')?.value,
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
        ?.value,
      montant_loyer: this.proprietaireForm.get('montant_loyer')?.value,
      mandataire: this.proprietaireForm.get('mandataire')?.value,
      banque_rib: this.proprietaireForm.get('banque_rib')?.value,
      ville_rib: this.proprietaireForm.get('ville_rib')?.value,
      cle_rib: this.proprietaireForm.get('cle_rib')?.value,
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,

      // mandataire: this.proprietaireForm.get('mandataireForm')?.value,
      // deleted:false,
    };

    this.proprietaireService
      .postProprietaire(proprietaire_data, this.lieu_id, this.userMatricule)
      .subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            this.proprietaireForm.reset();
            this.postDone = false;
            this.help.toTheUp();
            this.router
              .navigate(['/proprietaire/list-global/list'])
              .then(() => {
                this.help.refrechPage();
              });
          }, 2000);
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
      cin: this.proprietaireForm.get('cin')?.value,
      passport: this.proprietaireForm.get('passport')?.value,
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value,
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value,
      raison_social: this.proprietaireForm.get('raison_social')?.value,
      n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
        ?.value,
      telephone: this.proprietaireForm.get('telephone')?.value,
      fax: this.proprietaireForm.get('fax')?.value,
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
        ?.value,
      montant_loyer: this.proprietaireForm.get('montant_loyer')?.value,
      mandataire: this.proprietaireForm.get('mandataire')?.value,
      banque_rib: this.proprietaireForm.get('banque_rib')?.value,
      ville_rib: this.proprietaireForm.get('ville_rib')?.value,
      cle_rib: this.proprietaireForm.get('cle_rib')?.value,
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montant_apres_impot,
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
          }, 1000);
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

  getTauxImpot() {
    this.lieuService
      .getContratByLieu(this.lieu_id, this.userMatricule)
      .subscribe((data) => {
        if (data) this.tauxImpot = data[0]?.taux_impot;
      });
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
  get mandataire() {
    return this.proprietaireForm.get('mandataire');
  }
  get ville_rib() {
    return this.proprietaireForm.get('ville_rib');
  }
  get cle_rib() {
    return this.proprietaireForm.get('cle_rib');
  }
  get taux_impot() {
    return this.proprietaireForm.get('taux_impot');
  }

  get retenue_source() {
    return this.proprietaireForm.get('retenue_source');
  }
  get montant_apres_impot() {
    return this.proprietaireForm.get('montant_apres_impot');
  }
  // Mandataire
  // get mandataireForm(): FormArray {
  //   return <FormArray>this.proprietaireForm.get('mandataireForm');
  // }
}
