import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentProprietaireService } from '@services/assignment-proprietaire-service/assignment-proprietaire.service';
import { ConfirmationModalService } from '@services/confirmation-modal-service/confirmation-modal.service';
import { ContratService } from '@services/contrat-service/contrat.service';
import { HelperService } from '@services/helpers/helper.service';
import { MainModalService } from '@services/main-modal/main-modal.service';
import { ProprietaireService } from '@services/proprietaire-service/proprietaire.service';
import { AssignmentProprietaire } from 'src/app/models/AssignmentProprietaire';
import { Proprietaire } from 'src/app/models/Proprietaire';

@Component({
  selector: 'app-form-assign',
  templateUrl: './form-assign.component.html',
  styleUrls: ['./form-assign.component.scss'],
})
export class FormAssignComponent implements OnInit, OnChanges {
  @Input() isUpdate!: boolean;
  @Input() assignmentProprietaire!: any;

  isMand: boolean = true;
  errors!: any;
  Updatesuccess: string = `L'affectation modifié avec succés`;
  PostSucces: string = 'Propriétaire affecté avec succés';
  postDone: boolean = false;
  mandataireList: any = [];
  updateDone: boolean = false;
  assignProprietaireForm!: FormGroup;
  assignProprietaire!: any;
  userMatricule: any = localStorage.getItem('matricule');
  //les calcules
  montantLoyer!: number;
  tauxImpot!: any;
  contrats!: any[];
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
  proprietaireList: any = [];
  newProprietairesList: any = [];
  oldProprietairesList: any = [];

  //Total des parts des proprietaires
  totalPartProprietaires: number = 0;
  partProprietaire: number = 0;
  hasDeclarationOption: string = 'non';

  periodicite: any[] = [
    {
      number: 1,
      name: 'annuelle',
    },
    {
      number: 4,
      name: 'trimestrielle',
    },
    {
      number: 12,
      name: 'mensuelle',
    },
  ];
  contrat_id: any;

  selectedProprietaire!: Proprietaire;
  proprietaires!: Proprietaire[];
  proprietairesToSelect!: Proprietaire[];
  assignment!: AssignmentProprietaire
  
  constructor(
    private assignmentProprietaireService: AssignmentProprietaireService,
    private mainModalService: MainModalService,
    private actRoute: ActivatedRoute,
    public router: Router,
    private help: HelperService,
    private confirmationModalService: ConfirmationModalService,
    private proprietaireService: ProprietaireService,
    private contratService: ContratService
  ) {
    this.insertProprietaireForm();
  }

  ngOnChanges() {
    if (this.assignmentProprietaire != '') {
      // this.fetchProprietaire();
    }
  }

  ngOnInit(): void {
    this.getContrat()
    this.getProprietaires();
    if (!this.isUpdate) {
      // this.proprietaireForm.reset();
      this.contrat_id = this.actRoute.snapshot.paramMap.get('id_contrat') || '';
      this.callGetContratAndLieuMethods();
    }
  } //End ngOnInit

  insertProprietaireForm() {
    this.assignProprietaireForm = new FormGroup({
      // Champs du propriètaire
      proprietaire: new FormControl('', [Validators.required]),
      montant_loyer: new FormControl('', [Validators.pattern('[0-9]*')]),
      is_mandataire: new FormControl('', []),
      taux_impot: new FormControl(),
      retenue_source: new FormControl(),
      montant_apres_impot: new FormControl(),
      declaration_option: new FormControl(),

      montant_avance_proprietaire: new FormControl(),
      tax_avance_proprietaire: new FormControl(),
      tax_par_periodicite: new FormControl(),

      caution_par_proprietaire: new FormControl(),
      part_proprietaire: new FormControl('', [Validators.required]),

      proprietaire_list: new FormControl(),
      new_proprietaire_list: new FormControl(),
      old_proprietaires_list: new FormControl(),
      is_person_physique: new FormControl(''),
    });
  }

  callGetContratAndLieuMethods() {
    setTimeout(() => {
      this.getTauxImpot();
    }, 1000);
  }

  fetchAssignmentProprietaire() {
    this.callGetContratAndLieuMethods();

    this.assignProprietaireForm.patchValue({
      proprietaire: this.assignmentProprietaire.montant_loyer,
      montant_loyer: this.assignmentProprietaire.montant_loyer,
      is_mandataire: this.assignmentProprietaire.is_mandataire,
      banque_rib: this.assignmentProprietaire.banque_rib,
      ville_rib: this.assignmentProprietaire.ville_rib,
      cle_rib: this.assignmentProprietaire.cle_rib,
      declaration_option: this.assignmentProprietaire.declaration_option,
      taux_impot: this.assignmentProprietaire.taux_impot,
      retenue_source: this.assignmentProprietaire.retenue_source,
      montant_apres_impot: this.assignmentProprietaire.montant_apres_impot,
      is_person_physique: this.assignmentProprietaire.is_person_physique,

      montant_avance_proprietaire:
        this.assignmentProprietaire.montant_avance_proprietaire,
      tax_avance_proprietaire:
        this.assignmentProprietaire.tax_avance_proprietaire,
      tax_par_periodicite: this.assignmentProprietaire.tax_par_periodicite,

      part_proprietaire: this.assignmentProprietaire.part_proprietaire,
      caution_par_proprietaire:
        this.assignmentProprietaire.caution_par_proprietaire,
    });

    this.hasDeclarationOption = this.assignmentProprietaire.declaration_option;
    this.isMand = this.assignmentProprietaire.is_mandataire;
    this.CheckMandataire(this.isMand);
    this.montantLoyer = this.assignmentProprietaire.montant_loyer;
    // this.fillProprietaireInfos();
    setTimeout(() => {
      // Calcul montants
      this.calculMontant();
      this.calculMontantAvance();
      this.calculCaution();
    }, 2000);
  }

  fillFreedProprietaire() {
    this.proprietaireList = [];
    this.oldProprietairesList = [];
    this.assignmentProprietaire.proprietaire_list.forEach((element: any) => {
      this.proprietaireList.push(element);
    });
    this.getTauxImpot();
  }

  getProprietaires() {
    this.proprietaireService
      .getProprietaires(this.userMatricule)
      .subscribe((data) => {
        this.proprietaires = data;
        console.log(this.proprietaires);
        
      });
  }

  // checkPersonMoralOrPhysique(){
  //   this.proprietaires.forEach((prop) => {
  //     if(prop.type_proprietaire == 'Personne physique') this.hasDeclarationOption = 'non'
  //     else this.hasDeclarationOption = 'oui'
  //     console.log(this.hasDeclarationOption);
  //   })
  // }

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

  // To get the contrat and proprietaire in lieux
  getTauxImpot() {
    if (this.contrat_id) {
      this.totalPartProprietaires = 0;

      // if (this.isUpdate) {
      //   this.totalPartProprietaires =
      //     this.totalPartProprietaires -
      //     this.proprietairesToSelect.part_proprietaire;
      // }
    }
  }

  getContrat(){
    this.contratService.getContrat().subscribe((data: any) => {
      this.contrats = data;
    })
  }

  // Calculer le montant (retenue à la source / montant apres impot / TAX)
  calculMontant() {
    let tauxImpot: number = 0;
    let montantApresImpot: number = 0;
    let result: number = 0;

    // // Date debut de loyer
    let dateDebutLoyer = this.contrats[0].date_debut_loyer;
    dateDebutLoyer = new Date(dateDebutLoyer);
    let month = dateDebutLoyer.getMonth() + 1;

    // // Date resilition
    let dateResiliation =
      this.contrats[0]?.etat_contrat?.etat?.date_resiliation;
    dateResiliation = new Date(dateResiliation);
    let monthResiliation = dateResiliation.getMonth() + 1;

    // Les etats de contrats
    let etatContratTypes = this.contrats[0]?.etat_contrat?.libelle;

    // Get value of input part
    this.partProprietaire = Number(
      this.assignProprietaireForm.get('part_proprietaire')?.value
    );

    //Get montant loyer from contrat (Montant de loyer Global)
    let montantLoyerContrat = this.contrats[0]?.montant_loyer;
    let nbrPartContrat = this.contrats[0]?.nombre_part;

    // condition to control if the total part are > nbrPartContrat the we show an error message and take nbrPartContrat minus the total part and stock the result in the partProprietaire
    if (this.totalPartProprietaires + this.partProprietaire > nbrPartContrat) {
      this.partProprietaire = nbrPartContrat - this.totalPartProprietaires;
      this.openConfirmationModal();
    }

    let namePeriodicite = this.contrats[0].periodicite_paiement;
    //  CALCULER LE MONTANT DE LOYER A PARTIR DE PART DONNE PAR L'UTILISATEUR
    this.montantLoyer =
      (this.partProprietaire * montantLoyerContrat) / nbrPartContrat;
    // // ------First Condition--------
    if (etatContratTypes !== 'Résilié') {
      this.duree = 12;

      this.periodicite.forEach((period) => {
        if (namePeriodicite === period.name) {
          if (this.hasDeclarationOption === 'non') {
            if (this.montantLoyer * period.number <= 30000) {
              result = 0;
              montantApresImpot = this.montantLoyer - result;
              tauxImpot = 0;
            }

            if (
              this.montantLoyer * period.number > 30000 &&
              this.montantLoyer * period.number < 120000
            ) {
              result = this.montantLoyer * (10 / 100);
              montantApresImpot = this.montantLoyer - result;
              tauxImpot = 10;
            }

            if (this.montantLoyer * period.number >= 120000) {
              result = this.montantLoyer * (15 / 100);
              montantApresImpot = this.montantLoyer - result;
              tauxImpot = 15;
            }
          }
        }
      });

      if (this.hasDeclarationOption === 'oui') {
        result = 0;
        // montantApresImpot = this.montantLoyer * 12;
        montantApresImpot = this.montantLoyer - result;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;
    }

    // // ------Third Condition--------
    if (etatContratTypes === 'Résilié') {
      // nombre des mois louer
      let nbr_mois_louer = monthResiliation - month + 1;
      this.duree = nbr_mois_louer;

      if (this.hasDeclarationOption === 'non') {
        if (this.montantLoyer * nbr_mois_louer <= 30000) {
          result = 0;
          montantApresImpot = this.montantLoyer;
          tauxImpot = 0;
        }
        if (
          this.montantLoyer * nbr_mois_louer > 30000 &&
          this.montantLoyer * nbr_mois_louer < 120000
        ) {
          result = (this.montantLoyer * nbr_mois_louer * 10) / 100;
          montantApresImpot =
            (this.montantLoyer * nbr_mois_louer - result) / nbr_mois_louer;
          tauxImpot = 10;
        }
        if (this.montantLoyer * nbr_mois_louer >= 120000) {
          result = (this.montantLoyer * nbr_mois_louer * 15) / 100;
          montantApresImpot =
            (this.montantLoyer * nbr_mois_louer - result) / nbr_mois_louer;
          tauxImpot = 15;
        }
      }

      if (this.hasDeclarationOption === 'oui') {
        result = 0;
        // montantApresImpot = this.montantLoyer * nbr_mois_louer;
        montantApresImpot = this.montantLoyer - 12;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;
    }
  }

  //calculate the montant avance and tax d'avance of each proprietaire
  calculMontantAvance() {
    let dureeAvance = this.contrats[0]?.duree_avance;
    let dureeLocation = this.contrats[0]?.duree_location;
    // let dureeLocation = 2;
    let periodicite = this.contrats[0]?.periodicite_paiement;

    this.montantAvance = this.montantLoyer * dureeAvance;
    // this.taxAvance = (this.retenueSource / dureeLocation) * dureeAvance;
    this.taxAvance = this.retenueSource * dureeAvance;

    if (periodicite === 'mensuelle') {
      // this.taxPeriodicite = this.retenueSource / dureeLocation;
      this.taxPeriodicite = this.retenueSource;
    }
    if (periodicite === 'trimestrielle') {
      // this.taxPeriodicite = this.retenueSource / (dureeLocation * 3);
      this.taxPeriodicite = this.retenueSource * 3;
    }
    if (periodicite === 'annuelle') {
      // this.taxPeriodicite = this.retenueSource / 12;
      this.taxPeriodicite = this.retenueSource * 12;
    }
  }

  // caluclate the caution of each proprietaire
  calculCaution() {
    let cautionContrat = this.contrats[0]?.montant_caution;
    let nbrPartContrat = this.contrats[0]?.nombre_part;
    let cautionProprietaire =
      (cautionContrat * this.partProprietaire) / nbrPartContrat;
    this.montantCautionProprietaire = cautionProprietaire;
  }

  // function to open model
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open confirmation modal
  }

  // store the unchecked proprietaire , so we can update his ' has_mondataire ' value in the backend
  setUncheckedProp(Action: string, prop: any) {
    if (Action === 'Remove')
      this.oldProprietairesList.splice(this.oldProprietairesList.indexOf(prop));
    if (Action === 'Add') this.oldProprietairesList.push(prop);
  }

  // Select proprietaire
  selectProp(Element: any) {
    let InputElement = document.getElementById(Element._id) as HTMLInputElement;
    if (InputElement.checked) {
      // push selected proprietaire id to proprietaire list
      if (!this.isUpdate) this.newProprietairesList.push(InputElement.value);
      if (this.isUpdate) {
        // remove selected proprietaire id  from proprietaires and add it in proprietaireList
        for (let i = 0; i < this.proprietaires.length; i++) {
          if (this.proprietaires[i]._id === Element._id) {
            this.proprietaires.splice(i, 1);
          }
        }
        this.proprietaireList.push(Element);
        this.setUncheckedProp('Remove', Element._id);
      }
    } else {
      if (!this.isUpdate) {
        this.newProprietairesList.forEach((prop: any, i: number) => {
          if (prop === InputElement.value) {
            // remove selected proprietaire id from proprietaire list & add it in proprietaires
            this.unselectProp(i);
          }
        });
      }
      if (this.isUpdate) {
        for (let i = 0; i < this.proprietaireList.length; i++) {
          if (this.proprietaireList[i]._id === Element._id) {
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
    if (!this.isUpdate) this.newProprietairesList.splice(index, 1);
    if (this.isUpdate) this.newProprietairesList.splice(index, 1);
  }

  addAssignmentProprietaire() {
    let proprietaire_data: any = {
      proprietaire: this.assignProprietaireForm.get('proprietaire')?.value,
      montant_loyer: this.montantLoyer,
      declaration_option:
        this.assignProprietaireForm.get('declaration_option')?.value || '',
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,

      montant_avance_proprietaire: this.montantAvance,
      tax_avance_proprietaire: this.taxAvance,
      tax_par_periodicite: this.taxPeriodicite,

      part_proprietaire: this.partProprietaire,
      caution_par_proprietaire: this.montantCautionProprietaire,

      is_mandataire: this.assignProprietaireForm.get('is_mandataire')?.value,
      is_person_physique:
        this.assignProprietaireForm.get('is_person_physique')?.value,

      proprietaire_list: this.newProprietairesList,

      statut: '',
    };

    this.assignmentProprietaireService
      .assignProprietaire(
        proprietaire_data,
        this.contrat_id,
        this.userMatricule
      )
      .subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
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

  updateAssignmentProprietaire() {
    let id = this.selectedProprietaire._id || '';
    this.newProprietairesList = [];

    if (this.newProprietairesList) {
      this.proprietaireList.forEach((prop: any) => {
        this.newProprietairesList.push(prop._id);
      });
    }

    let proprietaireData: any = {
      // _id: this.proprietaireForm.get('_id').value ,

      montant_loyer: this.montantLoyer,

      declaration_option:
        this.assignProprietaireForm.get('declaration_option')?.value || '',
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,

      montant_avance_proprietaire: this.montantAvance,
      tax_avance_proprietaire: this.taxAvance,
      tax_par_periodicite: this.taxPeriodicite,

      part_proprietaire: this.partProprietaire,
      caution_par_proprietaire: this.montantCautionProprietaire,

      is_mandataire: this.assignProprietaireForm.get('is_mandataire')?.value,
      is_person_physique:
        this.assignProprietaireForm.get('is_person_physique')?.value,
      proprietaire_list: this.newProprietairesList,
      old_proprietaires_list: this.oldProprietairesList,
      statut: this.assignProprietaire.statut,
    };

    this.assignmentProprietaireService
      .updateassignmentProprietaire(id, proprietaireData, this.userMatricule)
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

  //if the montant loyer contrat < sum of montant loyer proprietaire then display an error and roolBack to initial data
  roolBack() {
    // check if it is in update form
    if (this.isUpdate) {
      this.closeModel();
      this.assignProprietaireForm.patchValue({
        part_proprietaire: this.selectedProprietaire.part_proprietaire,
      });
    }
    // check if it is in add form
    if (!this.isUpdate) {
      this.closeModel();
      this.assignProprietaireForm.patchValue({
        part_proprietaire: this.partProprietaire,
      });
    }
  }

  // function to close the model
  closeModel() {
    this.confirmationModalService.close();
  }

  CheckMandataire(isMand: boolean) {
    if (this.isUpdate) {
      if (isMand) {
        this.fillFreedProprietaire();
      } else {
        this.selectedProprietaire.proprietaire_list.forEach((element: any) => {
          this.oldProprietairesList.push(element._id);
        });
        this.proprietaireList = [];
      }
    }
  }

  // Get proprietaire form controlers

  get proprietaire() {
    return this.assignProprietaireForm.get('proprietaire');
  }

  get montant_loyer() {
    return this.assignProprietaireForm.get('montant_loyer');
  }

  get mandataire() {
    return this.assignProprietaireForm.get('mandataire');
  }

  get taux_impot() {
    return this.assignProprietaireForm.get('taux_impot');
  }

  get retenue_source() {
    return this.assignProprietaireForm.get('retenue_source');
  }

  get montant_apres_impot() {
    return this.assignProprietaireForm.get('montant_apres_impot');
  }

  get montant_avance_proprietaire() {
    return this.assignProprietaireForm.get('montant_avance_proprietaire');
  }

  get tax_avance_proprietaire() {
    return this.assignProprietaireForm.get('tax_avance_proprietaire');
  }

  get tax_par_periodicite() {
    return this.assignProprietaireForm.get('tax_par_periodicite');
  }

  get part_proprietaire() {
    return this.assignProprietaireForm.get('part_proprietaire');
  }
}
