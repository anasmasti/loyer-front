import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentProprietaireService } from '@services/assignment-proprietaire-service/assignment-proprietaire.service';
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
  proprietaireId!: string
  proprietaire!: any;
  assignmentProprietaires!: AssignmentProprietaire[];
  targetAssignmentProprietaire!: AssignmentProprietaire;
  targetAssignmentProprietaireId!: string;

  // Server errors
  errors!: string;
  accessError!: string;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Affectation supprimé avec succés';

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
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentProprietaireService
  ) {
    this.assignmentProprietaires = []
  }

  ngOnInit(): void {
    this.getProprietaireID()
    this.getAssignmentProprietaires();
  }

  getProprietaireID() {
    // Get proprietaire ID from route
    this.proprietaireId = this.activatedRoute.snapshot.paramMap.get('id_proprietaire') || '';
  }

  getAssignmentProprietaires() {
    // Get all proprietaire assignments
    this.assignmentService
      .getProprietaireAssagnments(this.proprietaireId, this.userMatricule)
      .subscribe((proprietaire) => {
        this.proprietaire = proprietaire;
        this.proprietaire.affectations.forEach(
          (assignment: AssignmentProprietaire) => {
            this.assignmentProprietaires.push(assignment);
          }
        );
      });
  }

  // Open the update proprietaire form and push index and data of proprietaire
  openModalAndPushProprietaire(myTargetAssignmentProprietaire: any) {
    this.mainModalService.open(); // Open the update proprietaire form
    this.targetAssignmentProprietaire = myTargetAssignmentProprietaire; // Push assignment proprietaire data
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
  deleteAssignmentProprietaire(assignmentId: string) {
    let deleteData = {
      deleted: true,
    };
    // Call detele proprietaire function from proprietaire service
    this.assignmentService
      .deleteAssignmentProprietaire(assignmentId, deleteData, this.userMatricule)
      .subscribe(
        (_) => {
          this.closeDeleteConfirmationModal();
          this.deleteDone = true;
          setTimeout(() => {
            this.deleteDone = false;
            this.assignmentProprietaires = []
            this.getAssignmentProprietaires()
          }, 2000);
        },
        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 3000);
          this.hideErrorMessage();
        }
      );
  }

  // Get id of selected proprietaire
  getAssignmentProprietaireId(id: any) {
    this.targetAssignmentProprietaireId = id;
  }

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }
}
