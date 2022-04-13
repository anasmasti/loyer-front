import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationModalService } from '@services/confirmation-modal-service/confirmation-modal.service';
import { FoncierService } from '@services/foncier-service/foncier.service';
import { Motif } from './motif.class';
import { Proprietaire } from 'src/app/models/Proprietaire';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss'],
})
export class FormContratComponent extends Motif implements OnInit, OnChanges {
  // displayProprFormList() {
  //   throw new Error('Method not implemented.');
  // }

  // whitch form to load
  @Input() update!: boolean;
  //incomming contrat from list in update case
  @Input() contrat?: any;
  @Input() isInsertForm?: boolean;
  //incomming id from list (test)
  idContrat: String = '';
  //etat selectionner dans le form
  etat: string = '';

  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Contrat ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Contrat modifié avec succés';
  isStatutError: boolean = false;
  statutContratError: string = 'Veuillez séléctionnez le statut de contrat';
  isSuspensionValidError: boolean = false;
  suspensionErrorMsg: string =
    'Veuillez séléctionnez la date et la durée de suspension';
  isAvenantError: boolean = false;
  avenantErrorMsg: string = 'Veuillez séléctionnez la date d’effet';

  foncier!: any;
  fd: FormData = new FormData();

  montantLoyer!: number;
  montantApresImpot: number = 0;
  hasDeclarationOption: string = 'non';
  retenueSource: number = 0;
  tauxImpot: number = 0;

  dureeCaution: number = 0;
  montantCaution: number = 0;

  dureeAvance: number = 0;
  result!: any;

  contratForm!: FormGroup;

  selectedEtatContrat!: string;

  typeLieuList: any = [
    {
      type: 'Direction régionale',
    },
    {
      type: 'Logement de fonction',
    },
    {
      type: 'Point de vente',
    },
    {
      type: 'Siège',
    },
    {
      type: 'Supervision',
    },
  ];
  lieuxByType: any = [];

  updateLieu: boolean = false;
  updateFoncier: boolean = false;

  // To format the date
  formattedDateFinAvance: any;

  filename!: any;

  duree!: number;
  retunue_source_par_mois!: number;
  totalBrutLoyer!: number;
  totalNetLoyer!: number;

  foncier_id!: string;

  userMatricule: any = localStorage.getItem('matricule');

  statutCaution: string = '--';

  periodicite!: string;
  datePremierPaiement!: any;
  date_debut_loyer_!: any;
  num_contrat!: string;
  date_preavis!: any;
  dateResiliation!: any;

  montant_avance_tax_!: number;

  montantAvance: number = 0;
  hasErrorEffort: boolean = false;
  hasErrordurreeRecuperer: boolean = false;

  // repriseCaution!: string;

  repriseCaution!: string;
  cautionConsommee!: string;

  durreConsommee: number = 0;
  durreeRecuperer: number = 0;

  taxNonComprise: number = 0;
  montantLoyerTTC: number = 0;

  currentLieu: any;
  id: string = 'ea2022';
  test!: any;
  foncierById!: any;

  // Proprietaire
  targetProprietaireId!: string;
  proprietaires: Proprietaire[] = [];
  deletedProprietaires: String[] = [];

  // Motif
  motif: any[] = [];
  user: any = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : [];
  userRoles: any[] = [];
  isAV: boolean = false;
  checkDeces: boolean = false;
  checkCession: boolean = false;
  checkMontantLoyer: boolean = false;

  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private help: HelperService,
    public router: Router,
    private actRoute: ActivatedRoute,
    private confirmationModalService: ConfirmationModalService,
    private foncierService: FoncierService
  ) {
    super();
  }

  ngOnChanges() {
    if (this.contrat && this.contrat.length !== 0) {
      this.fetchContrat();
      // this.proprDecesFormList = false;
      // this.proprCessionFormList = false;
      // this.montantLoyerForm = false;
    }
  }

  ngOnInit(): void {
    if (this.isInsertForm) {
      // this.foncier_id = this.actRoute.snapshot.paramMap.get('id_foncier') || '';
      this.actRoute.url.subscribe((data) => {
        this.foncier_id = data[0].path;
      });
      this.getFoncierById();
    }

    if (localStorage.getItem('user')) {
      for (
        let index = 0;
        index < this.user.existedUser.userRoles.length;
        index++
      ) {
        if (!this.user.existedUser.userRoles[index].deleted) {
          const element = this.user.existedUser.userRoles[index].roleCode;
          this.userRoles.push(element);
        }
      }
    }

    // this.selectedEtatContrat = 'Avenant'
    this.contratForm = new FormGroup({
      numero_contrat: new FormControl(''),
      piece_jointe: new FormControl([''], Validators.required),
      date_debut_loyer: new FormControl('', [Validators.required]),
      montant_loyer: new FormControl('', [Validators.required]),
      taxe_edilite_comprise_loyer: new FormControl(),
      taxe_edilite_noncomprise_loyer: new FormControl(),
      periodicite_paiement: new FormControl('', [Validators.required]),
      duree_location: new FormControl(''),
      date_fin_contrat: new FormControl(''),
      declaration_option: new FormControl(),
      taux_impot: new FormControl(),
      retenue_source: new FormControl(),
      montant_apres_impot: new FormControl(),
      montant_caution: new FormControl(),
      duree_caution: new FormControl(),
      date_reprise_caution: new FormControl(''),
      statut_caution: new FormControl(),
      montant_avance: new FormControl(''),
      date_fin_avance: new FormControl(''),
      date_premier_paiement: new FormControl(''),
      duree_avance: new FormControl(''),
      n_engagement_depense: new FormControl(),
      echeance_revision_loyer: new FormControl(),
      foncier: new FormControl(),
      lieu: new FormControl(),
      montant_loyer_ttc: new FormControl(''),

      // Etat
      etat_contrat_libelle: new FormControl(),
      etat_contrat_n_avenant: new FormControl(),
      etat_contrat_motif: new FormControl(),
      etat_contrat_montant_nouveau_loyer: new FormControl(),
      etat_contrat_signaletique_successeur: new FormControl(),
      etat_contrat_intitule_lieu: new FormControl(),
      etat_contrat_date_suspension: new FormControl('', Validators.required),
      etat_contrat_duree_suspension: new FormControl('', Validators.required),
      etat_contrat_motif_suspension: new FormControl(),
      etat_contrat_reprise_caution: new FormControl(),
      etat_contrat_date_resiliation: new FormControl('', Validators.required),
      etat_contrat_etat_lieu_sortie: new FormControl(),
      etat_contrat_preavis: new FormControl(),
      etat_contrat_images_etat_res_lieu_sortie: new FormControl(),
      etat_contrat_lettre_res_piece_jointe: new FormControl(),
      etat_contrat_piece_jointe_avenant: new FormControl(),
      deleted_proprietaires: new FormControl(),
      date_effet_av: new FormControl('', Validators.required),
      etat_contrat_frais_reamenagement: new FormControl(),

      //caution consommé
      etat_caution_consomme: new FormControl(),
      duree_consomme: new FormControl(),
      duree_a_recupere: new FormControl(),

      // Validation
      validation1_DMG: new FormControl(),
      validation2_DAJC: new FormControl(),

      //calculer par mois
      duree: new FormControl(),
      retunue_source_par_mois: new FormControl(),
      total_montant_brut_loyer: new FormControl(),
      total_montant_net_loyer: new FormControl(),

      // Calcul montant avance tax
      montant_avance_tax: new FormControl(),

      nombre_part: new FormControl('', Validators.required),
    });
  }

  scrollToTop() {
    let element: HTMLElement = document.getElementById(
      'form_content'
    ) as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Calculer le montant
  calculMontant() {
    let montantLoyerForYear = this.montantLoyer * 12;
    let tauxImpot: number = 0;
    let montantApresImpot: number = 0;
    let result: number = 0;
    // Date debut de loyer
    let dateDebutLoyer = this.contratForm.get('date_debut_loyer')?.value;
    dateDebutLoyer = new Date(dateDebutLoyer);
    let month = dateDebutLoyer.getMonth() + 1;
    // Date resilition
    let dateResiliation = this.contratForm.get(
      'etat_contrat_date_resiliation'
    )?.value;
    dateResiliation = new Date(dateResiliation);
    let monthResiliation = dateResiliation.getMonth() + 1;

    // ------First Condition--------
    if (month === 1 && this.selectedEtatContrat !== 'Résilié') {
      this.duree = 12;
      if (this.hasDeclarationOption === 'non') {
        if (montantLoyerForYear <= 30000) {
          result = 0;
          montantApresImpot = montantLoyerForYear;
          tauxImpot = 0;
        }
        if (montantLoyerForYear > 30000 && montantLoyerForYear <= 120000) {
          result = (montantLoyerForYear * 10) / 100;
          montantApresImpot = (montantLoyerForYear - result) / 12;
          tauxImpot = 10;
        }
        if (montantLoyerForYear > 120000) {
          result = (montantLoyerForYear * 15) / 100;
          montantApresImpot = (montantLoyerForYear - result) / 12;
          tauxImpot = 15;
        }
      }
      if (this.hasDeclarationOption === 'oui') {
        result = 0;
        montantApresImpot = montantLoyerForYear;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;
      //calculer retenue a la source par mois
      this.retunue_source_par_mois = this.retenueSource / this.duree;
      //total brut loyer
      this.totalBrutLoyer = this.montantLoyer * this.duree;
      // total net loyer
      this.totalNetLoyer = this.montantApresImpot * this.duree;
    }
    // ------Seconde Condition--------
    if (month !== 1 && this.selectedEtatContrat !== 'Résilié') {
      // nombre des mois louer
      let nbr_mois_louer = 12 - month + 1;
      this.duree = nbr_mois_louer;

      if (this.hasDeclarationOption === 'non') {
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
      if (this.hasDeclarationOption === 'oui') {
        result = 0;
        montantApresImpot = this.montantLoyer * nbr_mois_louer;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;
      //calculer retenue a la source par mois
      this.retunue_source_par_mois = this.retenueSource / this.duree;
      //total brut loyer
      this.totalBrutLoyer = this.montantLoyer * this.duree;
      // total net loyer
      this.totalNetLoyer = this.montantApresImpot * this.duree;
    }

    // ------Third Condition--------
    if (this.selectedEtatContrat === 'Résilié') {
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
      if (this.hasDeclarationOption === 'oui') {
        result = 0;
        montantApresImpot = this.montantLoyer * nbr_mois_louer;
        tauxImpot = 0;
      }

      this.retenueSource = result;
      this.montantApresImpot = montantApresImpot;
      this.tauxImpot = tauxImpot;
      //calculer retenue a la source par mois
      this.retunue_source_par_mois = this.retenueSource / this.duree;
      //total brut loyer
      this.totalBrutLoyer = this.montantLoyer * this.duree;
      // total net loyer
      this.totalNetLoyer = this.montantApresImpot * this.duree;
    }
  }

  // Calcul effort caution and show error if the outside is a decimal number
  calculEffortCaution() {
    let montantCaution: number = this.contratForm.get('montant_caution')?.value;
    let dureeCaution!: number;
    dureeCaution = montantCaution / this.montantLoyer;
    this.montantCaution = montantCaution;
    this.dureeCaution = dureeCaution || 0;
    if (montantCaution % this.montantLoyer !== 0) {
      this.hasErrorEffort = true;
    } else this.hasErrorEffort = false;

    // Change status caution
    if (montantCaution > 0) this.statutCaution = 'En cours';
    else this.statutCaution = '--';
  }

  calculMontantAvanceTax() {
    if (this.dureeAvance > 0 && this.hasDeclarationOption === 'non') {
      let montantAvance: number = this.contratForm.get('montant_avance')?.value;
      this.montant_avance_tax_ = montantAvance * (this.tauxImpot / 100);
    }
  }

  calculCautionDurreeRecuperer() {
    this.durreConsommee = this.contratForm.get('duree_consomme')?.value;

    // this.dureeCaution = this.contrat.duree_caution;

    this.durreeRecuperer = this.dureeCaution - this.durreConsommee;
    if (this.durreeRecuperer < 0) {
      this.hasErrordurreeRecuperer = true;
    } else this.hasErrordurreeRecuperer = false;
  }

  // calcul Date fin de l’avance et Date 1er de l'avance
  // calculDate() {
  //   let montant_loyer = parseInt(this.contratForm.get('montant_loyer')?.value,10);
  //   let date = new Date(this.contratForm.get('date_debut_loyer')?.value);
  //   let month = date.getMonth();
  //   this.dureeAvance = this.contratForm.get('duree_avance')?.value;

  //   if (this.dureeAvance > 0) {
  //     switch (this.periodicite) {
  //       case 'mensuelle':
  //         month += this.dureeAvance;
  //         break;
  //       case 'trimestrielle':
  //         month += this.dureeAvance * 3;
  //         break;
  //       case 'annuelle':
  //         month += this.dureeAvance * 12;
  //         break;
  //       default:
  //         break;
  //     }
  //     // if ((date.getMonth() + 1) === 4) {

  //     //   this.datePremierPaiement = new Date(`${date.getFullYear()}-${month}-${1}`).toISOString().slice(0, 10);
  //     // }
  //     // Date fin de l'avance
  //     date.setMonth(month);
  //     this.datePremierPaiement = date.toISOString().slice(0, 10);

  //     // Date 1er paiment
  //     date.setDate(0);
  //     this.formattedDateFinAvance = date.toISOString().slice(0, 10);

  //     // Montant de l'avance
  //     this.montantAvance = montant_loyer * this.dureeAvance;
  //   } else {
  //     // this.datePremierPaiement = null;
  //     this.datePremierPaiement = this.date_debut_loyer_;
  //     this.formattedDateFinAvance = null;
  //     this.montantAvance = 0;
  //   }
  // }

  calculDate() {
    let montant_loyer = parseInt(
      this.contratForm.get('montant_loyer')?.value,
      10
    );
    let date = new Date(this.contratForm.get('date_debut_loyer')?.value);
    let month = date.getMonth();
    this.dureeAvance = this.contratForm.get('duree_avance')?.value;

    if (this.dureeAvance > 0) {
      switch (this.periodicite) {
        case 'mensuelle':
          month += this.dureeAvance;
          break;
        case 'trimestrielle':
          month += this.dureeAvance * 3;
          break;
        case 'annuelle':
          month += this.dureeAvance * 12;
          break;
        default:
          break;
      }
      // if ((date.getMonth() + 1) === 4) {

      //   this.datePremierPaiement = new Date(`${date.getFullYear()}-${month}-${1}`).toISOString().slice(0, 10);
      // }
      // Date fin de l'avance
      date.setMonth(month);
      // this.datePremierPaiement = date.toISOString().slice(0, 10);
      this.datePremierPaiement = `${date.getFullYear()}-${month + 1}-01`;

      // Date 1er paiment
      date.setDate(0);
      this.formattedDateFinAvance = date.toISOString().slice(0, 10);

      // Montant de l'avance
      this.montantAvance = montant_loyer * this.dureeAvance;
    } else {
      // this.datePremierPaiement = null;
      this.datePremierPaiement = this.date_debut_loyer_;
      this.formattedDateFinAvance = null;
      this.montantAvance = 0;
    }
  }

  calculPreavis() {
    let date_resiliation = new Date(
      this.contratForm.get('etat_contrat_date_resiliation')?.value
    );
    this.dateResiliation = this.contratForm.get(
      'etat_contrat_date_resiliation'
    )?.value;
    let month = date_resiliation.getMonth();
    let day = date_resiliation.getDate();

    if (month + 1 === 3 && day === 31) {
      date_resiliation.setMonth(month);
      date_resiliation.setDate(0);
      this.date_preavis = date_resiliation.toISOString().slice(0, 10);
    } else {
      let date = moment(date_resiliation).subtract(1, 'M');
      this.date_preavis = date.toISOString().slice(0, 10);
    }
  }

  getFoncierById() {
    this.foncierService
      .getFoncierById(this.foncier_id, this.userMatricule)
      .subscribe((data) => {
        this.foncierById = data;
      });
  }
  //Calcul taxe d'édilité
  // calculTaxeNonComprise() {
  //   // let taxComprise = this.contratForm.get('taxe_edilite_comprise_loyer')?.value;
  //   // if(taxComprise !== 0 && taxComprise !== null)
  //   //   this.taxNonComprise = 0;
  //   // else
  //     this.taxNonComprise = this.montantLoyer  * (10.5 / 100);
  // }

  // calculMontantLoyerTTC(){
  //   this.montantLoyerTTC = this.montantLoyer * 1.105;
  // }

  //Reinitialise dates :::///
  reinitialiserDates() {
    this.dureeAvance = 0;
    this.formattedDateFinAvance = null;
    // this.datePremierPaiement = null;
    this.datePremierPaiement = this.date_debut_loyer_;
    this.montantAvance = 0;
  }

  reinitialiserDateDebut() {
    let date = new Date(this.contratForm.get('date_debut_loyer')?.value);
    date.setDate(1);
    this.date_debut_loyer_ = date.toISOString().slice(0, 10);
  }

  //functions
  closeModal() {
    this.mainModalService.close();
  }

  showEtatSection(event: any) {
    let numeroAvenant = `${this.contrat.numero_contrat}/AV`;
    this.contratForm.controls.etat_contrat_n_avenant.setValue(numeroAvenant);
    let selectedEtat = event.target.value;
    this.selectedEtatContrat = selectedEtat;
  }

  //Upload Image piece joint contrat
  onFileSelected(event: any, fileName: string) {
    if (event.target.files.length > 0) {
      this.help.selecteFiles(event, this.fd, fileName);
    }
  }

  //----------------- Update and Post  --------------------------
  //Add contrat
  addNewContrat() {
    let ctr_data: any = {
      numero_contrat: this.num_contrat,
      // date_debut_loyer: this.contratForm.get('date_debut_loyer')?.value || '',
      date_debut_loyer: this.date_debut_loyer_ || '',
      // piece_jointe: this.contratForm.get('piece_jointe')?.value || '',
      montant_loyer: this.contratForm.get('montant_loyer')?.value || '',
      taxe_edilite_loyer:
        this.contratForm.get('taxe_edilite_comprise_loyer')?.value || '',
      // taxe_edilite_loyer: this.taxNonComprise,
      taxe_edilite_non_loyer:
        this.contratForm.get('taxe_edilite_noncomprise_loyer')?.value || '',
      // taxe_edilite_non_loyer: this.taxNonComprise,
      periodicite_paiement:
        this.contratForm.get('periodicite_paiement')?.value || '',
      date_fin_contrat:
        this.contratForm.get('date_fin_contrat')?.value ||
        new Date('2999-01-01'),
      declaration_option:
        this.contratForm.get('declaration_option')?.value || '',
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,
      montant_caution: this.contratForm.get('montant_caution')?.value || 0,
      duree_caution: this.dureeCaution,
      date_reprise_caution:
        this.contratForm.get('date_reprise_caution')?.value || '',
      statut_caution: this.contratForm.get('statut_caution')?.value || '',
      montant_avance: this.contratForm.get('montant_avance')?.value || '',
      date_fin_avance: this.formattedDateFinAvance,
      date_premier_paiement: this.datePremierPaiement || '',
      duree_avance: this.contratForm.get('duree_avance')?.value || '',
      echeance_revision_loyer:
        this.contratForm.get('echeance_revision_loyer')?.value || '',
      n_engagement_depense:
        this.contratForm.get('n_engagement_depense')?.value || '',
      foncier: this.foncier_id,
      duree_location: this.contratForm.get('duree_location')?.value || '',
      duree: this.duree || '',
      retunue_source_par_mois: this.retunue_source_par_mois || '',
      total_montant_brut_loyer: this.totalBrutLoyer || '',
      total_montant_net_loyer: this.totalNetLoyer || '',
      montant_avance_tax: this.montant_avance_tax_,
      montant_loyer_ttc: this.montantLoyerTTC,
      nombre_part: this.contratForm.get('nombre_part')?.value || '',
    };

    //Append contrat-data in formdata
    this.fd.append('data', JSON.stringify(ctr_data));
    // let idFoncier = this.actRoute.snapshot.paramMap.get('id_foncier');

    // post the formdata (data+files)
    this.contratService
      .addContrat(this.fd, this.userMatricule, this.foncier_id)
      .subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            this.contratForm.reset();
            this.postDone = false;
            this.help.toTheUp();
            this.router
              .navigate(['/proprietaire/add', this.foncier_id, 'Actif'])
              .then(() => {
                this.help.refrechPage();
              });
          }, 3000);
        },
        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
            // this.contratForm.reset();
          }, 5000);
          this.hideErrorMessage();
        }
      );
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  // Open confirmation modal
  openConfirmationModal() {
    this.confirmationModalService.open(this.id);
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  formatDate(date: Date) {
    return this.help.formatDate(date);
  }

  fetchContrat() {
    this.proprDecesFormList = false;
    this.proprCessionFormList = false;
    this.montantLoyerForm = false;
    this.isAV = false;
    let index = this.contrat?.numero_contrat.indexOf('/AV');
    let checkAv = this.contrat?.numero_contrat.slice(index);
    if (checkAv == '/AV') this.isAV = true;

    if (this.contrat) {
      this.contrat.foncier.lieu.forEach((lieu: any) => {
        if (!lieu.deleted) {
          this.currentLieu = lieu;
        }
      });

      // this.etatContrat = this.contrat.etat_contrat.libelle

      this.contratForm?.patchValue({
        numero_contrat: this.contrat.numero_contrat,
        validation1_DMG: this.contrat.validation1_DMG,
        validation2_DAJC: this.contrat.validation2_DAJC,
        // date_debut_loyer: `${ date_debut_loyer.getFullYear() +'-'+('0'+(date_debut_loyer.getMonth()+1)).slice(-2)+'-'+ ('0'+date_debut_loyer.getDate()).slice(-2) }`,
        date_debut_loyer: this.formatDate(this.contrat.date_debut_loyer),
        montant_loyer: this.contrat.montant_loyer,
        taxe_edilite_comprise_loyer: this.contrat.taxe_edilite_loyer,
        taxe_edilite_noncomprise_loyer: this.contrat.taxe_edilite_non_loyer,
        periodicite_paiement: this.contrat.periodicite_paiement,
        date_fin_contrat: this.formatDate(this.contrat.date_fin_contrat),
        declaration_option: this.contrat.declaration_option,
        taux_impot: this.contrat.taux_impot,
        retenue_source: this.contrat.retenue_source,
        montant_apres_impot: this.contrat.montant_apres_impot,
        montant_caution: this.contrat.montant_caution,
        duree_caution: this.contrat.duree_caution,
        date_reprise_caution: this.formatDate(
          this.contrat.date_reprise_caution
        ),
        statut_caution: this.contrat.statut_caution,
        montant_avance: this.contrat.montant_avance,
        date_fin_avance: this.formatDate(this.contrat.date_fin_avance),
        date_premier_paiement: this.formatDate(
          this.contrat.date_premier_paiement
        ),
        duree_avance: this.contrat.duree_avance,
        echeance_revision_loyer: this.contrat.echeance_revision_loyer,
        foncier: this.contrat.foncier?._id,
        n_engagement_depense: this.contrat.n_engagement_depense,
        lieu: this.contrat.lieu?._id,
        duree_location: this.contrat.duree_location,
        montant_avance_tax: this.contrat.montant_avance_tax,
        montant_loyer_ttc: this.contrat.montant_loyer_ttc,

        etat_contrat_libelle: this.contrat.etat_contrat?.libelle,
        etat_contrat_n_avenant: this.contrat.etat_contrat?.etat?.n_avenant,
        etat_contrat_motif: this.contrat.etat_contrat?.etat?.motif?.type_motif,
        etat_contrat_montant_nouveau_loyer:
          this.contrat.etat_contrat?.etat?.montant_nouveau_loyer,
        etat_contrat_signaletique_successeur:
          this.contrat.etat_contrat?.etat?.signaletique_successeur,
        etat_contrat_intitule_lieu: this.currentLieu?.lieu?.intitule_lieu,
        etat_contrat_date_suspension: this.formatDate(
          this.contrat.etat_contrat?.etat?.date_suspension
        ),
        etat_contrat_duree_suspension:
          this.contrat.etat_contrat?.etat?.duree_suspension,
        etat_contrat_motif_suspension:
          this.contrat.etat_contrat?.etat?.motif_suspension,
        etat_contrat_reprise_caution:
          this.contrat.etat_contrat?.etat?.reprise_caution,
        etat_contrat_date_resiliation: this.formatDate(
          this.contrat.etat_contrat?.etat?.date_resiliation
        ),
        etat_contrat_etat_lieu_sortie:
          this.contrat.etat_contrat?.etat?.etat_lieu_sortie,
        etat_contrat_preavis: this.formatDate(
          this.contrat.etat_contrat?.etat?.preavis
        ),
        date_effet_av: this.formatDate(
          this.contrat.etat_contrat?.etat?.date_effet_av
        ),
        nombre_part: this.contrat.nombre_part,
        etat_contrat_frais_reamenagement:
          this.contrat.etat_contrat?.etat?.frais_reamenagement,
        // etat_contrat_images_etat_res_lieu_sortie: this.contrat.etat_contrat?.etat?.images_etat_res_lieu_sortie,
        // etat_contrat_lettre_res_piece_jointe: this.contrat.etat_contrat?.etat?.lettre_res_piece_jointe,
        // etat_contrat_piece_jointe_avenant: this.contrat.etat_contrat?.etat?.piece_jointe_avenant,
      });
      this.date_debut_loyer_ = this.contrat.date_debut_loyer;
      this.deletedProprietaires = [];
      this.proprietaires = this.contrat.foncier.proprietaire;
      // this.contrat.numero_contrat
      //   ? (this.foncier_id = this.contrat.lieu._id)
      //   : null;
      // Check motif checkboxs
      if (this.contrat.is_avenant) {
        this.contrat.etat_contrat.etat.motif.forEach((motif: any) => {
          switch (motif.type_motif) {
            case 'Révision du prix du loyer':
              this.checkMontantLoyer = true;
              this.montantLoyerForm = true;
              this.contratForm?.patchValue({
                etat_contrat_montant_nouveau_loyer: motif.montant_nouveau_loyer,
              });
              break;
            case 'Décès':
              this.proprDecesFormList = true;
              this.checkDeces = true;
              break;
            case 'Cession':
              this.checkCession = true;
              this.proprCessionFormList = true;
              break;
          }
        });
      }
      this.contrat.numero_contrat
        ? (this.foncier_id = this.contrat.foncier)
        : null;
    }
  }

  // Update contrat
  updateContrat() {
    let dateSuspension = this.contratForm.get(
      'etat_contrat_date_suspension'
    )?.value;
    let durreSuspension = this.contratForm.get(
      'etat_contrat_duree_suspension'
    )?.value;
    let dateEffetAvenant = this.contratForm.get('date_effet_av')?.value;
    let contratLibelle = this.contratForm.get('etat_contrat_libelle')?.value;

    if (contratLibelle != 'Initié') {
      if (
        (dateSuspension == (null || undefined) || durreSuspension == null) &&
        contratLibelle != null &&
        contratLibelle == 'Suspendu'
      ) {
        this.isSuspensionValidError = true;
        setTimeout(() => {
          this.isSuspensionValidError = false;
        }, 3000);
      }

      if (
        dateEffetAvenant == (null || undefined) &&
        contratLibelle != null &&
        contratLibelle == 'Avenant'
      ) {
        this.isAvenantError = true;
        setTimeout(() => {
          this.isAvenantError = false;
        }, 3000);
      }

      if (contratLibelle == (undefined || null)) {
        this.isStatutError = true;
        setTimeout(() => {
          this.isStatutError = false;
        }, 3000);
      }
      if (
        ((dateSuspension != null && durreSuspension != null) ||
          dateEffetAvenant != null) &&
        contratLibelle != (undefined || null)
      )
        this.succesUpdate();
    } else this.succesUpdate();
  }

  succesUpdate() {
    let id = this.contrat._id;
    // Get all checked motif values
    (this.contratForm.get('etat_contrat_libelle')?.value == 'Avenant' ||
      this.contrat.is_avenant) &&
      this.getMotifs();

    let ctr_data: any = {
      numero_contrat: this.contratForm.get('numero_contrat')?.value || '',
      date_debut_loyer: this.date_debut_loyer_ || '',
      montant_loyer: this.contratForm.get('montant_loyer')?.value || '',
      taxe_edilite_loyer:
        this.contratForm.get('taxe_edilite_comprise_loyer')?.value || '',
      // taxe_edilite_non_loyer: this.taxNonComprise,
      taxe_edilite_non_loyer:
        this.contratForm.get('taxe_edilite_noncomprise_loyer')?.value || '',
      periodicite_paiement:
        this.contratForm.get('periodicite_paiement')?.value || '',
      date_fin_contrat: this.contratForm.get('date_fin_contrat')?.value || '',
      declaration_option:
        this.contratForm.get('declaration_option')?.value || '',
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,
      montant_caution: this.contratForm.get('montant_caution')?.value || '',
      duree_caution: this.dureeCaution,
      date_reprise_caution:
        this.contratForm.get('date_reprise_caution')?.value || '',
      statut_caution: this.contratForm.get('statut_caution')?.value || '',
      montant_avance: this.contratForm.get('montant_avance')?.value || '',
      date_fin_avance: this.formattedDateFinAvance
        ? this.formattedDateFinAvance
        : this.contratForm.get('date_fin_avance')?.value,
      date_premier_paiement: this.datePremierPaiement
        ? this.datePremierPaiement
        : this.contratForm.get('date_premier_paiement')?.value,
      duree_avance: this.contratForm.get('duree_avance')?.value || '',
      echeance_revision_loyer:
        this.contratForm.get('echeance_revision_loyer')?.value || '',
      foncier: this.contratForm.get('foncier')?.value || '',
      n_engagement_depense:
        this.contratForm.get('n_engagement_depense')?.value || '',
      lieu: this.contratForm.get('lieu')?.value || '',
      duree_location: this.contratForm.get('duree_location')?.value || '',
      is_avenant: this.contrat.is_avenant,
      //etat de contrat
      etat_contrat: {
        libelle: this.contratForm.get('etat_contrat_libelle')?.value || null,
        etat: {
          n_avenant:
            this.contratForm.get('etat_contrat_n_avenant')?.value || '',
          motif: this.motif,
          // montant_nouveau_loyer:
          //   this.contratForm.get('etat_contrat_montant_nouveau_loyer')?.value ||
          //   '',
          signaletique_successeur:
            this.contratForm.get('etat_contrat_signaletique_successeur')
              ?.value || '',
          intitule_lieu:
            this.contratForm.get('etat_contrat_intitule_lieu')?.value || '',
          date_suspension:
            this.contratForm.get('etat_contrat_date_suspension')?.value || null,
          duree_suspension:
            this.contratForm.get('etat_contrat_duree_suspension')?.value ||
            null,
          motif_suspension:
            this.contratForm.get('etat_contrat_motif_suspension')?.value || '',
          reprise_caution:
            this.contratForm.get('etat_contrat_reprise_caution')?.value || '',
          date_resiliation:
            this.contratForm.get('etat_contrat_date_resiliation')?.value || '',
          etat_lieu_sortie:
            this.contratForm.get('etat_contrat_etat_lieu_sortie')?.value || '',
          preavis: this.date_preavis,
          images_etat_res_lieu_sortie:
            this.contratForm.get('etat_contrat_images_etat_res_lieu_sortie')
              ?.value || '',
          lettre_res_piece_jointe:
            this.contratForm.get('etat_contrat_lettre_res_piece_jointe')
              ?.value || '',
          piece_jointe_avenant:
            this.contratForm.get('etat_contrat_piece_jointe_avenant')?.value ||
            '',
          etat_caution_consomme:
            this.contratForm.get('etat_caution_consomme')?.value || '',
          duree_consomme: this.contratForm.get('duree_consomme')?.value || '',
          duree_a_recupere: this.durreeRecuperer,
          deleted_proprietaires: this.deletedProprietaires,
          date_effet_av: this.contratForm.get('date_effet_av')?.value || '',
          frais_reamenagement:
            this.contratForm.get('etat_contrat_frais_reamenagement')?.value ||
            '',
        },
      },

      //Validation
      validation1_DMG: this.contratForm.get('validation1_DMG')?.value || false,
      validation2_DAJC:
        this.contratForm.get('validation2_DAJC')?.value || false,

      montant_avance_tax: this.montant_avance_tax_,
      montant_loyer_ttc: this.montantLoyerTTC,
      nombre_part: this.contratForm.get('nombre_part')?.value || '',
    };
    //Append contrat-data in formdata
    this.fd.append('data', JSON.stringify(ctr_data));

    // console.log(ctr_data);

    //  patch the formdata (data+files)
    this.contratService.updateContrat(id, this.fd).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.updateDone = false;
          this.help.refrechPage();
        }, 3000);
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

  getMotifs() {
    this.proprDecesFormList && this.motif.push({ type_motif: 'Décès' });
    this.proprCessionFormList && this.motif.push({ type_motif: 'Cession' });
    this.montantLoyerForm &&
      this.motif.push({
        type_motif: 'Révision du prix du loyer',
        montant_nouveau_loyer: this.contratForm.get(
          'etat_contrat_montant_nouveau_loyer'
        )?.value,
      });
  }

  // :::: Proprietaire List ::::
  deleteProprietaire() {
    this.proprietaires.forEach((proprietaire, index) => {
      if (proprietaire._id === this.targetProprietaireId) {
        this.proprietaires.splice(index, 1);
        this.deletedProprietaires.push(proprietaire._id);
      }
    });
    this.closeDeleteConfirmationModal();
  }

  checkAndPutText(value: boolean) {
    return this.help.booleanToText(value);
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close();
  }

  // Open confirmation modal
  openDeleteConfirmationModal(proprietaireId: any) {
    this.targetProprietaireId = proprietaireId;
    this.confirmationModalService.open(this.id); // Open delete confirmation modal
  }

  openResiliationModel() {
    if (this.selectedEtatContrat === 'Résilié') {
      this.openConfirmationModal();
    } else {
      this.updateContrat();
    }
  }

  closeDeleteConfirmationModal() {
    this.confirmationModalService.close(this.id); // Close delete confirmation modal
  }

  get date_debut_loyer() {
    return this.contratForm.get('date_debut_loyer');
  }
  get montant_loyer() {
    return this.contratForm.get('montant_loyer');
  }
  get periodicite_paiement() {
    return this.contratForm.get('periodicite_paiement');
  }
  get duree_location() {
    return this.contratForm.get('duree_location');
  }
  get date_fin_contrat() {
    return this.contratForm.get('date_fin_contrat');
  }
  get date_reprise_caution() {
    return this.contratForm.get('date_reprise_caution');
  }
  get etat_contrat_date_resiliation() {
    return this.contratForm.get('etat_contrat_date_resiliation');
  }
  get etat_contrat_date_suspension() {
    return this.contratForm.get('etat_contrat_date_suspension');
  }
  get piece_jointe() {
    return this.contratForm.get('piece_jointe');
  }
  get nombre_part() {
    return this.contratForm.get('nombre_part');
  }
  get etat_contrat_duree_suspension() {
    return this.contratForm.get('etat_contrat_duree_suspension');
  }
  get date_effet_av() {
    return this.contratForm.get('date_effet_av');
  }
}
