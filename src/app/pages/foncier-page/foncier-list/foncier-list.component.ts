import { HelperService } from './../../../services/helpers/helper.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { FoncierService } from '../../../services/foncier-service/foncier.service';
import { MainModalService } from './../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../services/confirmation-modal-service/confirmation-modal.service';
import { Foncier } from './../../../models/Foncier';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFoncierAction } from '../foncier-store/foncier.actions';
import { getFonciers, getError } from '../foncier-store/foncier.selector';
import { environment } from 'src/environments/environment';
import { getUserType } from 'src/app/store/shared/shared.selector';
import { AuthService } from '@services/auth-service/auth.service';
import { Contrat } from 'src/app/models/Contrat';

@Component({
  selector: 'app-foncier-list',
  templateUrl: './foncier-list.component.html',
  styleUrls: ['./foncier-list.component.scss'],
})
export class FoncierListComponent implements OnInit {
  errors!: string;
  fonciers: Foncier[] = [];
  idReport: string = '1';

  filtredFonciers: Foncier[] = [];
  id: string = '0';
  targetFoncier!: Foncier;
  foncierSubscription$!: Subscription;
  findFoncier!: string;
  deletedFoncier!: Foncier;

  // Pagination options
  listFoncierPage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Local supprimé avec succés';

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  reporting: boolean;

  isDC!: boolean;
  isCDGSP!: boolean;
  isCSLA!: boolean;
  isDAJC!: boolean;
  constructor(
    private foncierService: FoncierService,
    public authService: AuthService,
    private helperService: HelperService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private store: Store<AppState>
  ) {
    this.reporting = environment.REPORTING;
  }

  ngOnInit(): void {
    this.getFonciers();
    this.isDC = this.authService.checkUserRole('DC');
    this.isCDGSP = this.authService.checkUserRole('CDGSP');
    this.isCSLA = this.authService.checkUserRole('CSLA');
    this.isDAJC = this.authService.checkUserRole('DAJC');
    // Check error
    this.store.select(getError).subscribe((data) => {
      if (data) this.accessError = data;
    });
  }

  getFonciers() {
    // Select foncier from store
    this.foncierSubscription$ = this.store
      .select(getFonciers)
      .subscribe((data) => {
        // Check if foncier data is empty then fetch it from server
        if (data.length === 0) {
          // Dispatch action to handle the NgRx get foncier from server effect
          this.store.dispatch(getFoncierAction());
        }
        this.fonciers = data;
        console.log(data);
      });
  }

  checkAndPutText(value: boolean | undefined) {
    return this.helperService.booleanToText(value);
  }

  // Filter by intitule
  search() {
    if (this.findFoncier !== '') {
      this.fonciers = this.fonciers.filter((res: any) => {
        return (
          res.type_lieu?.toLowerCase().match(this.findFoncier.toLowerCase()) ||
          res.ville?.toLowerCase().match(this.findFoncier.toLowerCase()) ||
          res.lieu[0].lieu.code_lieu
            ?.toLowerCase()
            .match(this.findFoncier.toLowerCase()) ||
          res.contrat[0]?.numero_contrat
            ?.toLowerCase()
            .match(this.findFoncier.toLowerCase())
        );
      });
    } else if (this.findFoncier === '') {
      this.getFonciers();
    }
  }

  searchByAmenagement(event: any, statut: string) {
    this.getFonciers();

    if (event.target.checked) {
      if (statut === 'all') {
        return this.fonciers;
      }

      if (statut !== 'all') {
        this.filtredFonciers = this.fonciers.filter((res) => {
          return res.has_amenagements?.toString().match(statut);
        });
        this.fonciers = this.filtredFonciers;
      }
    }

    return;
  }

  openEditModal(SelectedFoncier: any) {
    this.mainModalService.open();
    this.targetFoncier = SelectedFoncier;
  }

  openConfirmationModal(Foncier: any) {
    // this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
    this.deletedFoncier = Foncier;
  }

  // Close confirmation modal
  closeConfirmationModal() {
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

  // Delete fonfier
  deleteFoncier() {
    this.foncierService
      .deleteFoncier(
        this.deletedFoncier._id,
        { deleted: true },
        this.userMatricule
      )
      .subscribe(
        (_) => {
          this.store.dispatch(getFoncierAction());
          this.confirmationModalService.close();
          this.deleteDone = true;
          setTimeout(() => {
            this.deleteDone = false;
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
  getProprietaireLength(foncier: Foncier) {
    let count = 0;
    foncier.proprietaire.forEach((proprietaire: any) => {
      if (
        !proprietaire.deleted && (proprietaire?.statut == 'Actif' || proprietaire?.statut == 'À supprimer')
      ) {
        count = count + 1;
        console.log(proprietaire);
        
      }
    });
    return count;
  }
  openModalAndPushFoncier(foncier: any) {
    this.targetFoncier = foncier;
    this.mainModalService.open(); // Open delete confirmation modal
  }
  reload() {
    this.helperService.refrechPage();
  }

  getUserRole() {
    this.store.select(getUserType).subscribe((roles) => {
      this.checkRole(roles);
    });
  }

  checkRole(role: string[]) {
    role.forEach((item) => {
      switch (item) {
        case 'DC':
          this.isDC;
          break;
        case 'CDGSP':
          this.isCDGSP;
          break;
        case 'CSLA':
          this.isCSLA;
          break;
        case 'DAJC':
          this.isDAJC;
          break;

        default:
          break;
      }
    });
  }
}
