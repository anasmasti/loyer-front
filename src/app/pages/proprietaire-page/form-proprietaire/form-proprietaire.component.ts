import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';

@Component({
  selector: 'app-form-proprietaire',
  templateUrl: './form-proprietaire.component.html',
  styleUrls: ['./form-proprietaire.component.scss'],
})
export class FormProprietaireComponent implements OnInit, OnChanges {
  @Input() proprietaire!: any;
  @Input() update!: boolean;

  isMand: boolean = false;
  errors!: any;
  Updatesuccess: string = 'Propriétaire modifié avec succés';
  PostSucces: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;
  mandataireList: any = [];
  updateDone: boolean = false;
  proprietaireForm!: FormGroup;

  userMatricule: any = localStorage.getItem('matricule');

  contratByFoncier!: any[];

  foncier_id!: string;

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

  montantCautionProprietaire!: number;
  pourcentageCaution!: number;

  lengthProprietaire!: number;

  uncheckedProprietaires: any = [];

  default_proprietaire: any;
  proprietaires: any = [];
  proprietaireList: any = [];
  newProprietairesList: any = [];
  oldProprietairesList: any = [];

  //Total des pourcentages des proprietaires
  totalPourcentageProprietaires: number = 0;
  pourcentageProprietaire: number = 0;

  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService,
    private actRoute: ActivatedRoute,
    public router: Router,
    private help: HelperService,
    private lieuService: LieuxService,
    private confirmationModalService: ConfirmationModalService
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
      raison_social: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
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
      is_mandataire: new FormControl('', []),
      taux_impot: new FormControl(),
      retenue_source: new FormControl(),
      montant_apres_impot: new FormControl(),

      montant_avance_proprietaire: new FormControl(),
      tax_avance_proprietaire: new FormControl(),
      tax_par_periodicite: new FormControl(),

      caution_par_proprietaire: new FormControl(),
      pourcentage: new FormControl(),

      proprietaire_list: new FormControl(),
      new_proprietaire_list: new FormControl(),
      old_proprietaires_list: new FormControl(),

      // Champs du mandataire
      // mandataireForm: new FormArray([]),
    });

    if (!this.update) {
      this.proprietaireForm.reset();
      this.foncier_id = this.actRoute.snapshot.paramMap.get('id_foncier') || '';
      this.callGetContratAndLieuMethods();
    }
  } //End ngOnInit

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

  callGetContratAndLieuMethods() {
    setTimeout(() => {
      this.getTauxImpot();
    }, 1000);
    setTimeout(() => {
      // this.calculCaution();
    }, 2000);
  }

  fetchProprietaire() {
    this.getFoncierId();
    this.callGetContratAndLieuMethods();

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
      is_mandataire: this.proprietaire.is_mandataire,
      banque_rib: this.proprietaire.banque_rib,
      ville_rib: this.proprietaire.ville_rib,
      cle_rib: this.proprietaire.cle_rib,
      taux_impot: this.proprietaire.taux_impot,
      retenue_source: this.proprietaire.retenue_source,
      montant_apres_impot: this.proprietaire.montant_apres_impot,

      montant_avance_proprietaire:
        this.proprietaire.montant_avance_proprietaire,
      tax_avance_proprietaire: this.proprietaire.tax_avance_proprietaire,
      tax_par_periodicite: this.proprietaire.tax_par_periodicite,

      pourcentage: this.proprietaire.pourcentage,
      caution_par_proprietaire: this.proprietaire.caution_par_proprietaire,
      // proprietaire_list: this.proprietaireList,

      // mandataire inputs
      // cin_mandataire: '',
      // nom_prenom_mandataire: '',
      // raison_social_mandataire: '',
      // telephone_mandataire: '',
      // fax_mandataire: '',
      // adresse_mandataire: '',
      // n_compte_bancaire_mandataire: '',
    });

    this.montantLoyer = this.proprietaire.montant_loyer;
    this.fillProprietaireInfos();
  }

  fillProprietaireInfos() {
    this.proprietaireList = [];
    this.oldProprietairesList = [];
    this.proprietaire.proprietaire_list.forEach((element: any) => {
      this.proprietaireList.push(element);
    });
    this.getTauxImpot();
  }

  // Get Lieu id By Proprietaire id
  getFoncierId() {
    this.proprietaireService
      .getFoncierIdByProprietaire(this.proprietaire._id, this.userMatricule)
      .subscribe((data: any) => {
        this.foncier_id = data[0]._id;
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

  // To get the contrat and proprietaire in lieux
  getTauxImpot() {
    this.totalPourcentageProprietaires = 0;
    this.lieuService
      .getContratByFoncier(this.foncier_id, this.userMatricule)
      .subscribe((data) => {
        if (data) {
          this.contratByFoncier = data;

          this.lengthProprietaire =
            this.contratByFoncier[0]?.foncier?.proprietaire.length;

          this.proprietaires = [];

          for (
            let index = 0;
            index < this.contratByFoncier[0]?.foncier?.proprietaire.length;
            index++
          ) {
            if (
              this.contratByFoncier[0].foncier.proprietaire[index]
                .is_mandataire == false &&
              this.contratByFoncier[0].foncier.proprietaire[index]
                .has_mandataire == null &&
                this.contratByFoncier[0].foncier.proprietaire[index]
                ._id != this.proprietaire._id
            )
              this.proprietaires.push(
                this.contratByFoncier[0].foncier.proprietaire[index]
              );
            // this.uncheckedProprietaires.push(this.contratByFoncier[0].foncier.proprietaire[index])
            this.totalPourcentageProprietaires +=
              this.contratByFoncier[0].foncier.proprietaire[index].pourcentage;
          }
          if (this.update) {
            this.totalPourcentageProprietaires =
              this.totalPourcentageProprietaires -
              this.proprietaire.pourcentage;
          }
        }
      });
  }

  // Calculer le montant (retenue à la source / montant apres impot / TAX)
  calculMontant() {
    // let montantLoyerForYear = this.montantLoyer * 12;
    let tauxImpot: number = 0;
    let montantApresImpot: number = 0;
    let result: number = 0;
    // // Date debut de loyer
    let dateDebutLoyer = this.contratByFoncier[0].date_debut_loyer;
    dateDebutLoyer = new Date(dateDebutLoyer);
    let month = dateDebutLoyer.getMonth() + 1;
    // // Date resilition
    let dateResiliation =
      this.contratByFoncier[0]?.etat_contrat?.etat?.date_resiliation;
    dateResiliation = new Date(dateResiliation);
    let monthResiliation = dateResiliation.getMonth() + 1;
    // Les etats de contrats
    let etatContratTypes = this.contratByFoncier[0]?.etat_contrat?.libelle;

    let dureeLocation = this.contratByFoncier[0].duree_location;

    // Get value of input pourcentage
    this.pourcentageProprietaire = Number(
      this.proprietaireForm.get('pourcentage')?.value
    );
    //Get montant loyer from contrat (Montant de loyer Global)
    let montantLoyerContrat = this.contratByFoncier[0]?.montant_loyer;

    // condition to control if the total pourcentage are > 100 the we show an error message and take 100 minus the total pourcentage and stock the result in the pourcentageProprietaire
    if (
      this.totalPourcentageProprietaires + this.pourcentageProprietaire >
      100
    ) {
      this.pourcentageProprietaire = 100 - this.totalPourcentageProprietaires;
      this.openConfirmationModal();
    }
    //  CALCULER LE MONTANT DE LOYER A PARTIR DE POURCENTAGE DONNE PAR L'UTILISATEUR
    this.montantLoyer =
      (this.pourcentageProprietaire * montantLoyerContrat) / 100;

    // Condition for etat != resilié
    if (etatContratTypes != 'Résilié') {
      // Condition taux d'impot 0%
      if (this.montantLoyer * dureeLocation <= 30000) {
        result = 0;
        montantApresImpot = this.montantLoyer - result / dureeLocation;
        tauxImpot = 0;
      }
      // Condition taux d'impot 10%
      if (
        this.montantLoyer * dureeLocation > 30000 &&
        this.montantLoyer * this.contratByFoncier[0].duree_location <= 120000
      ) {
        result = this.montantLoyer * 0.1 * dureeLocation;
        montantApresImpot = this.montantLoyer - result / dureeLocation;
        tauxImpot = 10;
      }
      // Condition taux d'impot 15%
      if (this.montantLoyer * dureeLocation > 120000) {
        result = this.montantLoyer * 0.15 * dureeLocation;
        montantApresImpot = this.montantLoyer - result / dureeLocation;
        tauxImpot = 15;
      }
    } //End if (etatContratTypes != 'Résilié')

    // Condition for etat resilié
    if (etatContratTypes == 'Résilié') {
      // nombre des mois louer
      let nbr_mois_louer = dureeLocation - monthResiliation;

      // Condition taux d'impot 0%
      if (this.montantLoyer * nbr_mois_louer <= 30000) {
        result = 0;
        montantApresImpot = this.montantLoyer - result / nbr_mois_louer;
        tauxImpot = 0;
      }
      // Condition taux d'impot 10%
      if (
        this.montantLoyer * nbr_mois_louer > 30000 &&
        this.montantLoyer * nbr_mois_louer <= 120000
      ) {
        result = this.montantLoyer * 0.1 * nbr_mois_louer;
        montantApresImpot = this.montantLoyer - result / nbr_mois_louer;
        tauxImpot = 10;
      }
      // Condition taux d'impot 15%
      if (this.montantLoyer * nbr_mois_louer > 120000) {
        result = this.montantLoyer * 0.15 * nbr_mois_louer;
        montantApresImpot = this.montantLoyer - result / nbr_mois_louer;
        tauxImpot = 15;
      }
    } // End if (etatContratTypes == 'Résilié')

    this.retenueSource = result;
    this.montantApresImpot = montantApresImpot;
    this.tauxImpot = tauxImpot;
  }

  //calculate the montant avance and tax d'avance of each proprietaire
  calculMontantAvance() {
    let dureeAvance = this.contratByFoncier[0]?.duree_avance;
    let dureeLocation = this.contratByFoncier[0]?.duree_location;
    let periodicite = this.contratByFoncier[0]?.periodicite_paiement;

    this.montantAvance = this.montantLoyer * dureeAvance;
    this.taxAvance = (this.retenueSource / dureeLocation) * dureeAvance;

    if (periodicite == 'mensuelle') {
      this.taxPeriodicite = this.retenueSource / dureeLocation;
    }
    if (periodicite == 'trimestrielle') {
      this.taxPeriodicite = this.retenueSource / (dureeLocation * 3);
    }
    if (periodicite == 'annuelle') {
      this.taxPeriodicite = this.retenueSource / 12;
    }
  }

  // caluclate the caution of each proprietaire
  calculCaution() {
    let cautionContrat = this.contratByFoncier[0]?.montant_caution;
    let cautionProprietaire =
      (cautionContrat * this.pourcentageProprietaire) / 100;
    this.montantCautionProprietaire = cautionProprietaire;
  }

  // function to open model
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open confirmation modal
  }

  // store the unchecked proprietaire , so we can update his ' has_mondataire ' value in the backend
  setUncheckedProp(Action: string, prop: any) {
    if (Action == 'Remove')
      this.oldProprietairesList.splice(this.oldProprietairesList.indexOf(prop));
    if (Action == 'Add') this.oldProprietairesList.push(prop);
  }

  // Select proprietaire
  selectProp(Element: any) {
    let InputElement = document.getElementById(Element._id) as HTMLInputElement;
    if (InputElement.checked) {
      // push selected proprietaire id to proprietaire list
      if (!this.update) this.newProprietairesList.push(InputElement.value);
      if (this.update) {
        // remove selected proprietaire id  from proprietaires and add it in proprietaireList
        for (let i = 0; i < this.proprietaires.length; i++) {
          if (this.proprietaires[i]._id == Element._id) {
            this.proprietaires.splice(i, 1);
          }
        }
        this.proprietaireList.push(Element);
        this.setUncheckedProp('Remove', Element._id);
      }
    } else {
      if (!this.update) {
        this.newProprietairesList.forEach((prop: any, i: number) => {
          if (prop == InputElement.value) {
            // remove selected proprietaire id from proprietaire list & add it in proprietaires
            this.unselectProp(i);
          }
        });
      }
      if (this.update) {
        for (let i = 0; i < this.proprietaireList.length; i++) {
          if (this.proprietaireList[i]._id == Element._id) {
            // remove selected proprietaire id  from proprietaireList
            this.proprietaireList.splice(i, 1);
          }
        }

        this.setUncheckedProp('Add', Element._id);
        this.proprietaires.push(Element);
      }
    }
  }

  // Unselect proprietaire
  unselectProp(index: number) {
    if (!this.update) this.newProprietairesList.splice(index, 1);
    if (this.update) this.newProprietairesList.splice(index, 1);
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
      montant_loyer: this.montantLoyer,
      banque_rib: this.proprietaireForm.get('banque_rib')?.value,
      ville_rib: this.proprietaireForm.get('ville_rib')?.value,
      cle_rib: this.proprietaireForm.get('cle_rib')?.value,
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,

      montant_avance_proprietaire: this.montantAvance,
      tax_avance_proprietaire: this.taxAvance,
      tax_par_periodicite: this.taxPeriodicite,

      pourcentage: this.pourcentageProprietaire,
      caution_par_proprietaire: this.montantCautionProprietaire,

      is_mandataire: this.proprietaireForm.get('is_mandataire')?.value,

      proprietaire_list: this.newProprietairesList,
      // mandataire: this.proprietaireForm.get('mandataireForm')?.value,
      // deleted:false,
    };

    this.proprietaireService
      .postProprietaire(proprietaire_data, this.foncier_id, this.userMatricule)
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
    this.newProprietairesList = [];

    if (this.newProprietairesList) {
      this.proprietaireList.forEach((prop: any) => {
        this.newProprietairesList.push(prop._id);
      });
    }

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
      montant_loyer: this.montantLoyer,
      banque_rib: this.proprietaireForm.get('banque_rib')?.value,
      ville_rib: this.proprietaireForm.get('ville_rib')?.value,
      cle_rib: this.proprietaireForm.get('cle_rib')?.value,
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,

      montant_avance_proprietaire: this.montantAvance,
      tax_avance_proprietaire: this.taxAvance,
      tax_par_periodicite: this.taxPeriodicite,

      pourcentage: this.pourcentageProprietaire,
      caution_par_proprietaire: this.montantCautionProprietaire,

      is_mandataire: this.proprietaireForm.get('is_mandataire')?.value,
      proprietaire_list: this.newProprietairesList,
      old_proprietaires_list: this.oldProprietairesList,
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

  //if the montant loyer contrat < sum of montant loyer proprietaire then display an error and roolBack to initial data
  roolBack() {
    // check if it is in update form
    if (this.update) {
      this.closeModel();
      this.proprietaireForm.patchValue({
        pourcentage: this.proprietaire.pourcentage,
      });
    }
    // check if it is in add form
    if (!this.update) {
      this.closeModel();
      this.proprietaireForm.patchValue({
        pourcentage: this.pourcentageProprietaire,
      });
    }
  }

  // function to close the model
  closeModel() {
    this.confirmationModalService.close();
  }

  CheckMandataire(isMand: boolean) {
    if (this.update) {
      if (isMand) {
        this.fillProprietaireInfos();
      } else {
        this.proprietaire.proprietaire_list.forEach((element: any) => {
          this.oldProprietairesList.push(element._id);
        });
        this.proprietaireList = []
      }
    }
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
