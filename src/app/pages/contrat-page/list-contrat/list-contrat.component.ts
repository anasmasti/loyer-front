import { HelperService } from './../../../services/helpers/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss'],
})
export class ListContratComponent implements OnInit {
  contrats!: Contrat[];
  id: string = '0';
  targetContrat: Contrat[] = [];
  findContrat!: string;
  Class: string = '';

  isValidate!: boolean;
  isValidate2!: boolean;

  msgErrorV2: string ="Vous devez d'abbord validé la validation numéro 1!"
  testValidation1: boolean = false;

  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService
  ) {}

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

  // Filter by intitule
  search() {
    if (this.findContrat != '') {
      this.contrats = this.contrats.filter((res) => {
        return res.numero_contrat
          ?.toLowerCase()
          .match(this.findContrat.toLowerCase());
      });
    } else if (this.findContrat == '') {
      this.getContrat();
    }
  }

  openEditModal(SelectedContrat: any) {
    this.mainModalService.open();
    this.targetContrat = SelectedContrat;
  }

  openConfirmationModal(id: string) {
    this.isValidate = false;
    this.isValidate2 = false;
    this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openConfirmationModalValidation1(id: string) {
    this.isValidate2 = false;
    this.isValidate = true;
    this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openConfirmationModalValidation2(id: string,validation1:boolean) {
    if(validation1){
      this.isValidate = false;
      this.isValidate2 = true;
      this.id = id;
      this.confirmationModalService.open(); // Open delete confirmation modal
      
    }
    else {
      this.testValidation1 = true ;
      setTimeout(() => {
        this.testValidation1 = false ;
      }, 2000);
    }
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  // deleteContrat
  deleteContrat() {
    this.contratService.deleteContrat(this.id).subscribe((_) => {
      this.getContrat();
    });
  }

  reload() {
    this.helperService.refrechPage();
  }

  validation1Contrat() {
    (document.getElementById("vld1: " + this.id) as HTMLInputElement).disabled=true;
    (document.getElementById("vld1: " + this.id) as HTMLInputElement).classList.remove('bag-second');
    (document.getElementById("vld1: " + this.id) as HTMLInputElement).classList.add('bag-succes');
    this.contratService.updateValidation1Contrat(this.id).subscribe();
    // this.testValidation1=true;
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  validation2Contrat() {
    (document.getElementById("vld2: " + this.id) as HTMLInputElement).disabled=true;
    (document.getElementById("vld2: " + this.id) as HTMLInputElement).classList.remove('bag-second');
    (document.getElementById("vld2: " + this.id) as HTMLInputElement).classList.add('bag-succes');
    this.contratService.updateValidation2Contrat(this.id).subscribe();
    setTimeout(() => {
      location.reload();
    }, 400);

  }
}
