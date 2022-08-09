import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from '@services/confirmation-modal-service/confirmation-modal.service';
import { HelperService } from '@services/helpers/helper.service';
import { MainModalService } from '@services/main-modal/main-modal.service';
import { SignaletiqueService } from '@services/signaletique.service';
import { Signaletique } from 'src/app/models/Signaletique';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  signaletiques: Signaletique[] = [];
  findSignaletique: string = '';

  // Pagination options
  listSignaletiquesPage: number = 1;
  count: number = 0;
  tableSize: number = 4;

  userMatricule: any = localStorage.getItem('matricule');

  // Response messages
  isDoneMessage: string = '';
  hasErrorMessage: string = '';

  targetSignaletique!: Signaletique;
  signaletiqueIDToDelete: string | undefined = '';

  constructor(
    private signaletiqueService: SignaletiqueService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.getSignaletiqueList()
  }

  getSignaletiqueList() {
    // Get signaletiques from service
    this.signaletiqueService
      .getSignaletiqueList(this.userMatricule)
      .subscribe((signaletiquesRes) => {
        this.signaletiques = signaletiquesRes;
      });
  }

  openModalAndPushUser(signaletique: any) {
    this.targetSignaletique = signaletique;
    this.mainModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  checkAndPutText(value: boolean) {
    return this.helperService.booleanToText(value);
  }

  openConfirmationModal(signaletiqueID: string | undefined) {
    this.signaletiqueIDToDelete = signaletiqueID;
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  search() {
    if (this.findSignaletique !== '') {
      this.signaletiques = this.signaletiques.filter((res) => {
        return (
          res.rib?.toLowerCase().match(this.findSignaletique.toLowerCase()) ||
          res.if?.toLowerCase().match(this.findSignaletique.toLowerCase()) ||
          res.adresse?.toLowerCase().match(this.findSignaletique.toLowerCase())
        );
      });
    } else if (this.findSignaletique === '') {
      this.getSignaletiqueList();
    }
  }

  deleteSignaletique() {
    this.signaletiqueIDToDelete &&
      this.signaletiqueService
        .deleteSignaletique(this.signaletiqueIDToDelete, this.userMatricule)
        .subscribe(
          (data) => {
            this.getSignaletiqueList();
            this.confirmationModalService.close();
            this.isDoneMessage = 'La signalétique est suprimée avec succée';
            setTimeout(() => {
              this.isDoneMessage = '';
            }, 3000);
          },
          (error) => {
            this.hasErrorMessage = error.error.message;
            setTimeout(() => {
              this.hasErrorMessage = '';
            }, 3000);
          }
        );
  }
}
