import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss']
})
export class ListContratComponent implements OnInit {

  contrats: any = [];

  constructor(
    private contratService: ContratService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getContrat();
    }, 200);

  }

  getContrat() {
    this.contratService.getContrat().subscribe((data: any) => {
      this.contrats = data;
    });
  }
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }


}
