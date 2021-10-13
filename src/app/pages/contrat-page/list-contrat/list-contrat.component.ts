import { HelperService } from './../../../services/helpers/helper.service';
import { Component, OnInit } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { DownloadService } from 'src/app/services/download-service/download.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss'],
})
export class ListContratComponent implements OnInit {
  
  errors!: string;
  contrats!: Contrat[];
  id: string = '0';
  targetContrat: Contrat[] = [];
  findContrat!: string;
  Class: string = '';
  disabledEtat: boolean = false;

  //Validation 1
  isValidate!: boolean;
  //Validation 2
  isValidate2!: boolean;

  testValidation1: boolean = false;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Contrat supprimé avec succés';

  // Pagination options
  listContratPage: number = 1;
  count: number = 0;
  tableSize: number = 6;

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;

  user: any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : [];
  userRoles: any[] = []; 

  idModal : string = "listeProprietaires"
  ProprietairesByContart : any[] = [];
  num_contrat!: string;


  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService,
    private downloadService: DownloadService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getContrat();
    }, 200);
    setTimeout(() => {
      console.log(this.contrats);
      
    }, 1000);


    if (localStorage.getItem('user')) {

      for (let index = 0; index < this.user.existedUser.userRoles.length; index++) {
        const element = this.user.existedUser.userRoles[index].roleCode;
        this.userRoles.push(element)
      }
      
    }

  }

  getContrat() {
    this.contratService.getContrat().subscribe(
      (data: any) => {
        this.contrats = data;
      },
      (error: any) => {
        this.accessError = error.error.message;
      }
    );
    
    
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

  openListeProprietairesModal(SelectedContrat: any) {
    this.mainModalService.open(this.id);
    this.ProprietairesByContart = SelectedContrat.lieu.proprietaire
    this.num_contrat = SelectedContrat.lieu.code_lieu + '/' + SelectedContrat.lieu.intitule_lieu
    
  }

  openConfirmationContratModal(id: string) {
    this.isValidate = false;
    this.isValidate2 = false;
    this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openConfirmationModalValidation1(id: string) {
    this.isValidate2 = false;
    this.isValidate = true;
    this.id = id;
    this.confirmationModalService.open(); // Open validation 1 confirmation modal
  }

  openConfirmationModalValidation2(id: string, validation1: boolean) {
    if (validation1) {
      this.isValidate = false;
      this.isValidate2 = true;
      this.id = id;
      this.confirmationModalService.open(); // Open validation 2 confirmation modal
    } else {
      this.testValidation1 = true;
      // Test pour verifier si la validation 1 est déjà validé sinon on vas afficher le msg d'erreur
      this.errors = "La première validation n'a pas encore faite!";
      setTimeout(() => {
        this.testValidation1 = false;
        this.errors = '';
      }, 3000);
    }
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

  // deleteContrat
  deleteContrat() {
    this.contratService.deleteContrat(this.id, this.userMatricule).subscribe(
      (_) => {
        this.getContrat();
        this.deleteDone = true;
        setTimeout(() => {
          this.deleteDone = false;
        }, 3000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 2000);
        this.hideErrorMessage();
      }
    );
  }

  reload() {
    this.helperService.refrechPage();
  }

  validation1Contrat() {
    (document.getElementById('vld1: ' + this.id) as HTMLInputElement).disabled =
      true;
    (
      document.getElementById('vld1: ' + this.id) as HTMLInputElement
    ).classList.remove('second-btn');
    (
      document.getElementById('vld1: ' + this.id) as HTMLInputElement
    ).classList.add('success-btn');
    this.contratService
      .updateValidation1Contrat(this.id, this.userMatricule)
      .subscribe();
    // this.testValidation1=true;
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  validation2Contrat() {
    (document.getElementById('vld2: ' + this.id) as HTMLInputElement).disabled =
      true;
    (
      document.getElementById('vld2: ' + this.id) as HTMLInputElement
    ).classList.remove('bag-second');
    (
      document.getElementById('vld2: ' + this.id) as HTMLInputElement
    ).classList.add('bag-succes');
    this.contratService
      .updateValidation2Contrat(this.id, this.userMatricule)
      .subscribe();
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  downloadAnnex1(filename: string) {
    this.downloadService.dowloadFileAnnex1(filename).subscribe((res) => {
      if (res) {
        fileSaver.saveAs(res, filename);
      }
    });
  }

  downloadAnnex2(filename: string) {
    this.downloadService.dowloadFileAnnex2(filename).subscribe((res) => {
      if (res) {
        fileSaver.saveAs(res, filename);
      }
    });
  }
}
