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
import { getFonciers } from '../foncier-store/foncier.selector';

@Component({
  selector: 'app-foncier-list',
  templateUrl: './foncier-list.component.html',
  styleUrls: ['./foncier-list.component.scss']
})
export class FoncierListComponent implements OnInit {

  fonciers: any = [];
  id: string = '0';
  targetFoncier!: Foncier;
  foncierSubscription$!: Subscription

  // Pagination options
  listFoncierPage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  constructor(
    private helperService: HelperService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getFoncier()
  }

  getFoncier() {
    // Select foncier from store
    this.foncierSubscription$ = this.store.select(getFonciers).subscribe((data) => {
      // Check if foncier data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get foncier from server effect 
        this.store.dispatch(getFoncierAction())
      }
      this.fonciers = data
    })
  }

  openEditModal(SelectedFoncier: any) {
    this.mainModalService.open();
    this.targetFoncier = SelectedFoncier;
  }

  openConfirmationModal(id: string) {
    this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  // Delete fonfier
  deleteFoncier() {

  }

  reload() {
    this.helperService.refrechPage()
  }
}
