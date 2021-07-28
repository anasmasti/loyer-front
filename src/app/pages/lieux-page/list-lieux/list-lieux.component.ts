import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Lieu } from '../../../models/Lieu'
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-list-lieux',
  templateUrl: './list-lieux.component.html',
  styleUrls: ['./list-lieux.component.scss']
})
export class ListLieuxComponent implements OnInit {

  lieux: Lieu[] = [];
  targetlieu: Lieu[] = [];
  targetlieuId: string = '';

  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    //  setTimeout(() => {
    this.getAllLieux();
    //  }, 1000);

  }

  getAllLieux() {
    this.lieuxService.getLieux().subscribe((data) => {
      this.lieux = data;
    });
  }
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openModalAndPushLieu(Lieu: any) {
    this.targetlieu = Lieu
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

}
