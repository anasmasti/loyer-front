import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationModalService } from '@services/confirmation-modal-service/confirmation-modal.service';
import { HelperService } from '@services/helpers/helper.service';
import { MainModalService } from '@services/main-modal/main-modal.service';
import { AssignmentProprietaire } from 'src/app/models/AssignmentProprietaire';

@Component({
  selector: 'app-list-assign',
  templateUrl: './list-assign.component.html',
  styleUrls: ['./list-assign.component.scss'],
})
export class ListAssignComponent implements OnInit {
  @Input() proprietaireId!: string;
  assignmentProprietaires!: AssignmentProprietaire[];
  targetAssignmentProprietaire!: AssignmentProprietaire;
  targetAssignmentProprietaireId!: string;

  // Server errors
  errors!: string;
  accessError!: string;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Proprietaire supprimé avec succés';

  // Pagination options
  listAssignmentProprietairePage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  // User roles
  userMatricule: any = localStorage.getItem('matricule');

  // Modal id
  modalId: string = 'DeleteAssignmentConfirmation';

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.getAssignmentProprietaires();
  }

  getAssignmentProprietaires() {
    throw new Error('Method not implemented.');
  }

  // Open the update proprietaire form and push index and data of proprietaire
  openModalAndPushProprietaire(myTargetProprietaire: any) {
    this.mainModalService.open(); // Open the update proprietaire form
    this.targetAssignmentProprietaire = myTargetProprietaire; // Push proprietaire data
  }

  checkAndPutText(value: boolean) {
    return this.helperService.booleanToText(value);
  }

  // Open confirmation modal
  openDeleteConfirmationModal() {
    this.confirmationModalService.open(this.modalId); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeDeleteConfirmationModal() {
    this.confirmationModalService.close(this.modalId); // Close delete confirmation modal
  }

  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Delete proprietaire
  deleteAssignmentProprietaire(id: string) {
    let data = {
      deleted: true,
    };
    // Call detele proprietaire function from proprietaire service
    // this.proprietaireService
    //   .deleteProprietaire(id, data, this.userMatricule)
    //   .subscribe(
    //     (_) => {
    //       // this.getAllFonciers(); // Trow the fitching data
    //       this.closeDeleteConfirmationModal();
    //       this.deleteDone = true;
    //       setTimeout(() => {
    //         this.deleteDone = false;
    //         this.helperService.refrechPage();
    //       }, 3000);
    //     },
    //     (error) => {
    //       this.errors = error.error.message;
    //       setTimeout(() => {
    //         this.showErrorMessage();
    //       }, 3000);
    //       this.hideErrorMessage();
    //     }
    //   );
  }

  // Get id of selected proprietaire
  getAssignmentProprietaireId(id: any) {
    this.targetAssignmentProprietaire = id;
  }

   // Refrtech the page
   refrechPage() {
    this.helperService.refrechPage();
  }
}
