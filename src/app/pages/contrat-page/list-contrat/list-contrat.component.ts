import { ReportingService } from './../../../services/reporting/reporting.service';
import { HelperService } from './../../../services/helpers/helper.service';
import { Component, OnInit } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss'],
})
export class ListContratComponent implements OnInit {
  errors!: string;
  contrats!: Contrat[];
  id: string = '0';
  targetContrat: Contrat[] = [];
  findContrat!: string;
  Class: string = '';
  disabledEtat: boolean = false;
  idReport: string = '1';

  //Validation 1
  isValidate!: boolean;
  //Validation 2
  isValidate2!: boolean;

  testValidation1: boolean = false;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Contrat supprimé avec succés';

  // Pagination options
  listContratPage: number = 1;
  count: number = 0;
  tableSize: number = 6;

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;

  user: any = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : [];
  userRoles: any[] = [];

  idModal: string = 'listeProprietaires';
  ProprietairesByContart: any[] = [];
  selectedContrat!: any;
  num_contrat!: string;

  findStatus!: string;

  mntNetGlobal!: number;
  mntBrutGlobal!: number;
  mntTaxGlobal!: number;
  reporting: boolean;
  statut!: string;

  comparedContrat!: Contrat[]

  // Soumettre
  soumettreModal: string = 'soumettreModal';
  isSoumettre: boolean = false;
  test: string = 'test';
  
  soumettreSuccess: string = 'Contrat soumettre avec succés';
  soumettreDone: boolean = false;

  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService,
    private reportingService: ReportingService,
    private searchService: SearchServiceService
  ) {
    this.reporting = environment.REPORTING;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getContrat();
    }, 200);

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
  }
  getContrat() {
    this.contratService.getContrat().subscribe(
      (data: any) => {
        this.contrats = data;
        this.comparedContrat = data
      },
      (error: any) => {
        this.accessError = error.error.message;
      }
    );
  }

  checkAndPutText(value: boolean) {
    return this.helperService.booleanToText(value);
  }

  // Filter by intitule
  search() {
    if (this.findContrat != '') {
      this.searchService.mainSearch(
        (this.contrats = this.contrats.filter((res) => {
          return res.numero_contrat
            ?.toString()
            ?.toLowerCase()
            .match(this.findContrat.toLowerCase()) || 
            res.foncier.type_lieu
            ?.toString()
            ?.toLowerCase()
            .match(this.findContrat.toLowerCase());
        }))
      );
    } else if (this.findContrat == '') {
      this.getContrat();
    }
  }

  searchByEtat(event: any, statut: string) {
    if (event.target.checked) {
      if (statut == 'all') return this.getContrat();

        if (statut == 'Avenant') {
          this.contrats = this.comparedContrat.filter((res) => {            
            return res.old_contrat.length > 0;
          });
        }
        else if (statut == 'Actif') {
          this.contrats = this.comparedContrat.filter((res) => {
              return res.etat_contrat?.libelle?.toString().match(statut);
            });
        }
    }
    return;
  }

  searchByStatutCaution(event: any, statut: string) {
    if (event.target.checked) {
      this.contrats = this.contrats.filter((res) => {
        return res.statut_caution
          ?.toString()
          ?.toLowerCase()
          .match(statut.toLowerCase());
        // En cours
      });
    }
  }

  openEditModal(SelectedContrat: any) {
    this.mainModalService.open();
    this.targetContrat = SelectedContrat;
  }

  openListReportingModal() {
    this.mainModalService.open(this.idReport);
  }

  openListeProprietairesModal(SelectedContrat: any) {
    this.mainModalService.open(this.id);
    this.ProprietairesByContart = SelectedContrat.foncier.proprietaire;
    this.selectedContrat = SelectedContrat;

    this.num_contrat = SelectedContrat.numero_contrat;
  }

  openConfirmationContratModal(id: string) {
    this.isValidate = false;
    this.isValidate2 = false;
    this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openConfirmationModalValidation1(id: string) {
    this.isValidate2 = false;
    this.isValidate = true;
    this.id = id;
    this.confirmationModalService.open(); // Open validation 1 confirmation modal
  }

  openConfirmationModalValidation2(id: string, validation1: boolean) {
    if (validation1) {
      this.isValidate = false;
      this.isValidate2 = true;
      this.id = id;
      this.confirmationModalService.open(); // Open validation 2 confirmation modal
    } else {
      this.testValidation1 = true;
      // Test pour verifier si la validation 1 est déjà validé sinon on vas afficher le msg d'erreur
      this.errors = "La première validation n'a pas encore faite!";
      setTimeout(() => {
        this.testValidation1 = false;
        this.errors = '';
      }, 3000);
    }
  }

  openConfirmationSoumettre(id: string) {
    this.id = id;
    this.isSoumettre = true;
   this.confirmationModalService.open(); //  Open soumettre confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal(id: string = 'confirmationModal') {
    this.isSoumettre = false;
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // deleteContrat
  deleteContrat() {
    this.contratService.deleteContrat(this.id, this.userMatricule).subscribe(
      (_) => {
        this.getContrat();
        this.deleteDone = true;
        setTimeout(() => {
          this.deleteDone = false;
        }, 3000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 2000);
        this.hideErrorMessage();
      }
    );
  }

  reload() {
    this.helperService.refrechPage();
  }

  validation1Contrat() {
    (document.getElementById('vld1: ' + this.id) as HTMLInputElement).disabled =
      true;
    (
      document.getElementById('vld1: ' + this.id) as HTMLInputElement
    ).classList.remove('second-btn');
    (
      document.getElementById('vld1: ' + this.id) as HTMLInputElement
    ).classList.add('success-btn');
    this.contratService
      .updateValidation1Contrat(this.id, this.userMatricule)
      .subscribe();
    // this.testValidation1=true;
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  soumettreContrat() {
    this.contratService.updateSoumettre(this.id, this.userMatricule).subscribe(
      (_) => {
        this.closeConfirmationModal(this.soumettreModal)
        this.soumettreDone = true;
        setTimeout(() => {
          this.soumettreDone = false;
          this.helperService.refrechPage()
        }, 3000);
      },
      (error) => {
        this.errors = error.error.message;
        this.closeConfirmationModal(this.soumettreModal)
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    );
  }

  annulerContrat() {
    this.contratService.annulerContrat(this.id, this.userMatricule).subscribe();
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  validation2Contrat() {
    (document.getElementById('vld2: ' + this.id) as HTMLInputElement).disabled =
      true;
    (
      document.getElementById('vld2: ' + this.id) as HTMLInputElement
    ).classList.remove('bag-second');
    (
      document.getElementById('vld2: ' + this.id) as HTMLInputElement
    ).classList.add('bag-succes');
    this.contratService
      .updateValidation2Contrat(this.id, this.userMatricule)
      .subscribe();
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  calculMontantsGlobal(proprietaire: any) {
    let mntLoyerGlobal = 0,
      mntAvanceGlobal = 0,
      mntCautionGlobal = 0,
      mntTaxAvanceGlobal = 0,
      mntTaxPeriodiciteGlobal = 0,
      mntApresImpotGlobal = 0;

    this.mntBrutGlobal = 0;
    this.mntNetGlobal = 0;
    this.mntTaxGlobal = 0;

    proprietaire.proprietaire_list.forEach((prop: any) => {
      mntLoyerGlobal += prop.montant_loyer;
      mntAvanceGlobal += prop.montant_avance_proprietaire;
      mntCautionGlobal += prop.caution_par_proprietaire;
      mntApresImpotGlobal += prop.montant_apres_impot;
      mntTaxAvanceGlobal += prop.tax_avance_proprietaire;
      mntTaxPeriodiciteGlobal += prop.tax_par_periodicite;
    });
    if (
      this.selectedContrat.avance_versee &&
      this.selectedContrat.caution_versee
    ) {
      // Calcul montant net global
      this.mntNetGlobal = mntApresImpotGlobal;

      // Calcul montant brut global
      this.mntBrutGlobal = mntLoyerGlobal;

      // Calcul montant tax global
      this.mntTaxGlobal = mntTaxPeriodiciteGlobal;
    } else {
      // Calcul montant net global
      this.mntNetGlobal =
        mntApresImpotGlobal +
        (mntAvanceGlobal - mntTaxAvanceGlobal) +
        mntCautionGlobal;

      // Calcul montant brut global
      this.mntBrutGlobal = mntLoyerGlobal + mntAvanceGlobal + mntCautionGlobal;

      // Calcul montant tax global
      this.mntTaxGlobal = mntTaxPeriodiciteGlobal + mntTaxAvanceGlobal;
    }
  }

  calculMontantsProprietaire(proprietaire: any, field: string) {
    let mntNet, mntBrut, mntTaxe;

    if (
      this.selectedContrat.avance_versee &&
      this.selectedContrat.caution_versee
    ) {
      mntNet = proprietaire.montant_apres_impot;
      mntBrut = proprietaire.montant_loyer;
      mntTaxe = proprietaire.tax_par_periodicite;
    } else {
      mntNet =
        proprietaire.montant_apres_impot +
        (proprietaire.montant_avance_proprietaire -
          proprietaire.tax_avance_proprietaire) +
        proprietaire.caution_par_proprietaire;
      mntBrut =
        proprietaire.montant_loyer +
        proprietaire.montant_avance_proprietaire +
        proprietaire.caution_par_proprietaire;
      mntTaxe =
        proprietaire.tax_avance_proprietaire + proprietaire.tax_par_periodicite;
    }

    switch (field) {
      case 'mntNet':
        return mntNet;
      case 'mntBrut':
        return mntBrut;
      case 'mntTaxe':
        return mntTaxe;
      default:
        return null;
    }
  }

  getProprietaireLength(proprietaires: any[]) {
    let count = 0;
    proprietaires.forEach((proprietaire) => {
      if (!proprietaire.deleted) {
        count = count + 1;
      }
    });
    return count;
  }
}
