import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { data } from 'jquery';
import { Proprietaire } from 'src/app/models/proprietaire';

@Component({
  selector: 'app-form-proprietaire',
  templateUrl: './form-proprietaire.component.html',
  styleUrls: ['./form-proprietaire.component.scss'],
})
export class FormProprietaireComponent implements OnInit, OnChanges {
  @Input() proprietaire!: any;
  @Input() isInsertForm!: boolean;
  isMand: boolean = false;
  errors!: any;
  Updatesuccess: string = 'Propriétaire modifié avec succés';
  PostSucces: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;
  mandataireList: any = [];
  updateDone: boolean = false;
  proprietaireForm!: FormGroup;

  userMatricule: any = localStorage.getItem('matricule');

  contratByLieu!: any[];

  lieu_id!: any;

  //les calcules
  montantLoyer!: number;
  tauxImpot!: any;
  contrat!: any[];
  retenueSource!: number;
  montantApresImpot!: number;
  duree: number = 12;
  montantAvance: number = 0;
  taxAvance!: number;
  taxPeriodicite!: number;



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

      montant_avance_proprietaire: new FormControl(),
      tax_avance_proprietaire: new FormControl(),
      tax_par_periodicite: new FormControl(),

      // Champs du mandataire
      // mandataireForm: new FormArray([]),
    });

    if (this.isInsertForm) {
      this.proprietaireForm.reset();
      this.lieu_id = this.actRoute.snapshot.paramMap.get('id_lieu')
      setTimeout(() => {
        this.getTauxImpot();
      }, 500);
      setTimeout(() => {
        this.calculMontant();
      }, 1000);
    }
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

      this.getLieuId()
      setTimeout(() => {
        this.getTauxImpot();
      }, 500);
      setTimeout(() => {
      this.calculMontant();
      }, 1000);
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

      montant_avance_proprietaire: this.proprietaire.montant_avance_proprietaire,
      tax_avance_proprietaire: this.proprietaire.tax_avance_proprietaire,
      tax_par_periodicite: this.proprietaire.tax_par_periodicite,

      // mandataire inputs
      // cin_mandataire: '',
      // nom_prenom_mandataire: '',
      // raison_social_mandataire: '',
      // telephone_mandataire: '',
      // fax_mandataire: '',
      // adresse_mandataire: '',
      // n_compte_bancaire_mandataire: '',
    });
    setTimeout(() => {
      
      this.getTauxImpot();
    }, 1000);
  }


  // Get Lieu id By Proprietaire id 
  getLieuId(){
    this.proprietaireService.getLieuIdByProprietaire(this.proprietaire._id , this.userMatricule).subscribe((data: any) => {
      this.lieu_id = data[0]._id
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

  getTauxImpot() {
    this.lieuService
      .getContratByLieu(this.lieu_id, this.userMatricule)
      .subscribe((data) => {
        if (data) this.contratByLieu = data;
      });
  }

  // Calculer le montant
  calculMontant() {

    // let montantLoyerForYear = this.montantLoyer * 12;
    let tauxImpot: number = 0;
    let montantApresImpot: number = 0;
    let result: number = 0;

    // // Date debut de loyer
    let dateDebutLoyer = this.contratByLieu[0].date_debut_loyer;
    

    dateDebutLoyer = new Date(dateDebutLoyer);
    let month = dateDebutLoyer.getMonth() + 1;

    // // Date resilition
    let dateResiliation = this.contratByLieu[0]?.etat_contrat?.etat?.date_resiliation;
    dateResiliation = new Date(dateResiliation);
    let monthResiliation = dateResiliation.getMonth() + 1;

    let etatContratTypes = this.contratByLieu[0]?.etat_contrat?.libelle;

    // // ------First Condition--------
    if (month == 1 && etatContratTypes != 'Résilié') {
      this.duree = 12;
      if (this.contratByLieu[0]?.declaration_option === 'non') {
        if (this.montantLoyer * 12 <= 30000) {
          result = 0;
          montantApresImpot = this.montantLoyer * 12;
          tauxImpot = 0;
        }
        if (
          this.montantLoyer * 12 > 30000 &&
          this.montantLoyer * 12 <= 120000
        ) {
          result = (this.montantLoyer * 12 * 10) / 100;
          montantApresImpot = (this.montantLoyer * 12 - result) / 12;
          tauxImpot = 10;
        }
        if (this.montantLoyer * 12 > 120000) {
          result = (this.montantLoyer * 12 * 15) / 100;
          montantApresImpot = (this.montantLoyer * 12 - result) / 12;
          tauxImpot = 15;
        }
      }
      if (this.contratByLieu[0]?.declaration_option === 'oui') {
        result = 0;
        montantApresImpot = this.montantLoyer * 12;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;

    }
    // // ------Seconde Condition--------
    if (month != 1 && etatContratTypes != 'Résilié') {
      // nombre des mois louer
      let nbr_mois_louer = 12 - month + 1;
      this.duree = nbr_mois_louer;

      if (this.contratByLieu[0]?.declaration_option === 'non') {
        if (this.montantLoyer * nbr_mois_louer <= 30000) {
          result = 0;
          montantApresImpot = this.montantLoyer;
          tauxImpot = 0;
        }
        if (
          this.montantLoyer * nbr_mois_louer > 30000 &&
          this.montantLoyer * nbr_mois_louer <= 120000
        ) {
          result = (this.montantLoyer * nbr_mois_louer * 10) / 100;
          montantApresImpot =
            (this.montantLoyer * nbr_mois_louer - result) / nbr_mois_louer;
          tauxImpot = 10;
        }
        if (this.montantLoyer * nbr_mois_louer > 120000) {
          result = (this.montantLoyer * nbr_mois_louer * 15) / 100;
          montantApresImpot =
            (this.montantLoyer * nbr_mois_louer - result) / nbr_mois_louer;
          tauxImpot = 15;
        }
      }
      if (this.contratByLieu[0]?.declaration_option === 'oui') {
        result = 0;
        montantApresImpot = this.montantLoyer * nbr_mois_louer;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;

    }

    // // ------Third Condition--------
    if (etatContratTypes == 'Résilié') {
      // nombre des mois louer
      let nbr_mois_louer = monthResiliation - month + 1;
      this.duree = nbr_mois_louer;

      if (this.contratByLieu[0]?.declaration_option === 'non') {
        if (this.montantLoyer * nbr_mois_louer <= 30000) {
          result = 0;
          montantApresImpot = this.montantLoyer;
          tauxImpot = 0;
        }
        if (
          this.montantLoyer * nbr_mois_louer > 30000 &&
          this.montantLoyer * nbr_mois_louer <= 120000
        ) {
          result = (this.montantLoyer * nbr_mois_louer * 10) / 100;
          montantApresImpot =
            (this.montantLoyer * nbr_mois_louer - result) / nbr_mois_louer;
          tauxImpot = 10;
        }
        if (this.montantLoyer * nbr_mois_louer > 120000) {
          result = (this.montantLoyer * nbr_mois_louer * 15) / 100;
          montantApresImpot =
            (this.montantLoyer * nbr_mois_louer - result) / nbr_mois_louer;
          tauxImpot = 15;
        }
      }
      if (this.contratByLieu[0]?.declaration_option === 'oui') {
        result = 0;
        montantApresImpot = this.montantLoyer * nbr_mois_louer;
        tauxImpot = 0;
      }

    
      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;
    }
  }

  calculMontantAvance() {
    let dureeAvance = this.contratByLieu[0]?.duree_avance;
    let dureeLocation = this.contratByLieu[0]?.duree_location;
    let periodicite = this.contratByLieu[0]?.periodicite_paiement;

    this.montantAvance = this.montantLoyer * dureeAvance;
    this.taxAvance = (this.retenueSource / dureeLocation) * dureeAvance;

    if (periodicite == 'mensuelle') {
      this.taxPeriodicite = this.retenueSource / dureeLocation;
    }

    if (periodicite == 'trimestrielle') {
      this.taxPeriodicite = this.retenueSource / (dureeLocation * 3);
    }

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

      montant_avance_proprietaire: this.montantAvance,
      tax_avance_proprietaire: this.taxAvance,
      tax_par_periodicite: this.taxPeriodicite,


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
      montant_apres_impot: this.montantApresImpot,

      montant_avance_proprietaire: this.montantAvance,
      tax_avance_proprietaire: this.taxAvance,
      tax_par_periodicite: this.taxPeriodicite,
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
          this.errors = error.error.message
          setTimeout(() => {
            this.showErrorMessage();
          }, 4000);
          this.hideErrorMessage();
        }
      );
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

  get montant_avance_proprietaire() {
    return this.proprietaireForm.get('montant_avance_proprietaire');
  }

  get tax_avance_proprietaire() {
    return this.proprietaireForm.get('tax_avance_proprietaire');
  }

  get tax_par_periodicite() {
    return this.proprietaireForm.get('tax_par_periodicite');
  }
  // Mandataire
  // get mandataireForm(): FormArray {
  //   return <FormArray>this.proprietaireForm.get('mandataireForm');
  // }
}
