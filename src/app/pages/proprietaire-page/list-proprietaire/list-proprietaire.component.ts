import { HelperService } from './../../../services/helpers/helper.service';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { Proprietaire } from '../../../models/Proprietaire';
import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';

@Component({
  selector: 'app-list-proprietaire',
  templateUrl: './list-proprietaire.component.html',
  styleUrls: ['./list-proprietaire.component.scss'],
})
export class ListProprietaireComponent implements OnInit {
  proprietaires: Proprietaire[] = [];
  targetProprietaire: Proprietaire[] = [];
  targetProprietaireId: string = '';

  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.getAllProprietaires(); // Trow the fitching data
  }

  // ngOnChanges() {
  //   this.getAllProprietaires(); // Trow the fitching data if anything changes
  // }

  // Get data from proprietaire service
  getAllProprietaires() {
    this.proprietaireService.getProprietaire().subscribe((data) => {
      this.proprietaires = data;
    });
  }

  // Open the update proprietaire form and push index and data of proprietaire
  openModalAndPushProprietaire(myTargetProprietaire: any) {
    this.mainModalService.open(); // Open the update proprietaire form
    this.targetProprietaire = myTargetProprietaire; // Push proprietaire data
  }

  checkAndPutText(value: boolean) {
    let text!: string;
    value ? (text = 'Oui') : (text = 'Non');
    return text;
  }

  // Open confirmation modal
  openConfirmationModal() {
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  // Delete proprietaire
  deleteProprietaire(id: string) {
    let data = {
      deleted: true,
    };

    // Call detele proprietaire function from proprietaire service
    this.proprietaireService.deleteProprietaire(id, data).subscribe((_) => {
      this.getAllProprietaires(); // Trow the fitching data
    });
  }

  // Get id of selected proprietaire
  getProprietaireId(id: string) {
    this.targetProprietaireId = id;
  }

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }
}
