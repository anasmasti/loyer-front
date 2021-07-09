import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal.service';
import { ContratService } from 'src/app/services/contrat.service';
import { MainModalService } from 'src/app/services/main-modal.service';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss']
})
export class ListContratComponent implements OnInit {

  contrats: any = [];

  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService
  ) { }
  ngOnInit(): void {
   setTimeout(() => {
      this.getAllLieux();
   }, 400);
   
  }

  getAllLieux(){
    this.contratService.getContrat().subscribe((data:any) => {
      this.contrats = data;
    });
    // console.log('liste des lieux : '+this.lieux);
  }
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }


}
