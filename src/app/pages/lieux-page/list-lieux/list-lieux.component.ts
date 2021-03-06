import { Lieu } from '../../../models/Lieu';
import { HelperService } from './../../../services/helpers/helper.service';
import { getLoading, getUserType } from './../../../store/shared/shared.selector';
import { AppState } from './../../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getError, getLieux } from '../lieux-store/lieux.selector';
import { getLieuxAction } from '../lieux-store/lieux.actions';
import { environment } from 'src/environments/environment';
import { AuthService } from '@services/auth-service/auth.service';

@Component({
  selector: 'app-list-lieux',
  templateUrl: './list-lieux.component.html',
  styleUrls: ['./list-lieux.component.scss'],
})
export class ListLieuxComponent implements OnInit, OnDestroy {
  errors!: string;
  lieux!: Lieu[];
  filtredLocaux!: Lieu[];
  lieuEmpty: boolean = true;
  targetlieu: Lieu[] = [];
  targetlieuId: string = '';
  deletedLieu!: Lieu;
  loading: boolean = false;
  lieuxSubscription$!: Subscription;
  findLieu!: string;
  findAmenagement!: any;

  // Pagination options
  listLieuxPage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Entité supprimé avec succés';

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;

  reportingModalId: string = 'lieuxRep';
  reporting: boolean;

  isDC!: boolean;
  isCDGSP!: boolean;
  isCSLA!: boolean;
  isDAJC!: boolean;

  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    public authService: AuthService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService,
    private store: Store<AppState>
  ) {
    this.reporting = environment.REPORTING;
  }

  ngOnInit(): void {
    // Throw get lieux from server function
    this.getAllLieux();
    this.isDC = this.authService.checkUserRole('DC');
    this.isCDGSP = this.authService.checkUserRole('CDGSP');
    this.isCSLA = this.authService.checkUserRole('CSLA');
    this.isDAJC = this.authService.checkUserRole('DAJC');
    // Check data loading status
    this.store.select(getLoading).subscribe((data) => {
      this.loading = data;
    });

    // Check error
    this.store.select(getError).subscribe((data) => {
      if (data) this.accessError = data;
    });
  }

  //==========================================================================================================================================================
  // Filter by intitule
  search() {
    if (this.findLieu !== '') {
      this.lieux = this.lieux.filter((res: any) => {
        return (
          res.type_lieu?.toLowerCase().match(this.findLieu.toLowerCase()) ||
          res.intitule_lieu?.toLowerCase().match(this.findLieu.toLowerCase())
           ||
          res.code_lieu?.toLowerCase().match(this.findLieu.toLowerCase())
        );
      });
    } else if (this.findLieu === '') {
      this.getAllLieux();
    }
  }

  //==========================================================================================================================================================

  getAllLieux() {
    // Select lieux from store
    this.lieuxSubscription$ = this.store.select(getLieux).subscribe((data) => {
      // Check if lieux data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get lieux from server effect
        this.store.dispatch(getLieuxAction());
      }
      this.lieux = data;
    });
  }

  openConfirmationModal(Lieu: any) {
    this.confirmationModalService.open(); // Open delete confirmation modal
    this.deletedLieu = Lieu;
  }

  openModalAndPushLieu(Lieu: any) {
    this.targetlieu = Lieu;
    this.mainModalService.open(); // Open delete confirmation modal
  }

  openModalAndPushLieuId(id: any) {
    // this.targetlieu = Lieu
    // setTimeout(() => {

    this.mainModalService.open(); // Open delete confirmation modal
    // }, 100);
  }



  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  checkAndPutText(value: any) {
    return this.helperService.booleanToText(value);
  }

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }

  ngOnDestroy() {
    this.lieuxSubscription$.unsubscribe();
  }

  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  deleteLieu() {
    this.lieuxService
      .deleteLieu(this.deletedLieu._id, { deleted: true }, this.userMatricule)
      .subscribe(
        (_) => {
          this.store.dispatch(getLieuxAction());
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
          this.closeConfirmationModal();
        }
      );
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
