import { getLoading } from './../../../store/shared/shared.selector';
import { AppState } from './../../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Lieu } from '../../../models/Lieu'
import { Observable, timer, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLieux } from '../lieux-store/lieux.selector';
import { getLieuxAction } from '../lieux-store/lieux.actions';

@Component({
  selector: 'app-list-lieux',
  templateUrl: './list-lieux.component.html',
  styleUrls: ['./list-lieux.component.scss']
})
export class ListLieuxComponent implements OnInit, OnDestroy {

  lieux$!: Observable<Lieu[]>;
  lieuEmpty: boolean = true;
  ngrx_lieux: Lieu[] = [];
  targetlieu: Lieu[] = [];
  targetlieuId: string = '';
  loading: boolean = false;
  lieuxSubsction$!: Subscription;

  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    // Throw get lieux from server function
    this.getAllLieux();

    // Check data loading status
    this.store.select(getLoading).subscribe(data => {
      this.loading = data
    })

  }


  getAllLieux() {
    // Select lieux from store
    this.lieux$ = this.store.select(getLieux)

    this.lieuxSubsction$ = this.lieux$.subscribe((data) => {
      // Check if leix data is empty then fetch it from server
      if (data.length === 0) {
        this.lieuEmpty = true
        // Dispatch action to handle the NgRx get lieux from server effect 
        this.store.dispatch(getLieuxAction())
      }
    })

  }

  openConfirmationModal() {
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openModalAndPushLieu(Lieu: any) {
    this.targetlieu = Lieu
    this.mainModalService.open(); // Open delete confirmation modal
  }

  openModalAndPushLieuId(id: any) {
    // this.targetlieu = Lieu
    this.mainModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  checkAndPutText(value: any) {
    let text!: string
    value ? text = 'Oui' : text = 'Non'
    return text
  }

  ngOnDestroy() {
    this.lieuxSubsction$.unsubscribe()
  }
}
