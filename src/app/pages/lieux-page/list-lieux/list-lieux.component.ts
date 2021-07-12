import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-list-lieux',
  templateUrl: './list-lieux.component.html',
  styleUrls: ['./list-lieux.component.scss']
})
export class ListLieuxComponent implements OnInit {
  lieux: any = [];

  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService
  ) { }
  ngOnInit(): void {
   setTimeout(() => {
      this.getAllLieux();
   }, 400);
   
  }

  getAllLieux(){
    this.lieuxService.getLieux().subscribe((data:any) => {
      this.lieux = data;
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

  checkAndPutText(value: boolean) {
    let text!: string
    value ? text = 'Oui' : text = 'Non'
    return text
  }

}
