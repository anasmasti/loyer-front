import { FoncierService } from './../../../service/foncier-service/foncier.service';
import { MainModalService } from './../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../services/confirmation-modal-service/confirmation-modal.service';
import { Foncier } from './../../../models/Foncier';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foncier-list',
  templateUrl: './foncier-list.component.html',
  styleUrls: ['./foncier-list.component.scss']
})
export class FoncierListComponent implements OnInit {

  fonciers: any = [];
  id: string = '0';
  targetFoncier!: Foncier;

  constructor(
    private foncierService: FoncierService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
  }

  getContrat() {

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
    setTimeout(() => {
      this.getContrat();
    }, 300);

  }
}
