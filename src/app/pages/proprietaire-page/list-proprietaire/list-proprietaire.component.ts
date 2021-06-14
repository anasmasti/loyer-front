import { ConfirmationModalService } from './../../../services/confirmation-modal.service';
import { MainModalService } from './../../../services/main-modal.service';
import { Proprietaire } from './../../../models/proprietaire';
import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from 'src/app/services/proprietaire.service';

@Component({
  selector: 'app-list-proprietaire',
  templateUrl: './list-proprietaire.component.html',
  styleUrls: ['./list-proprietaire.component.scss'],
})
export class ListProprietaireComponent implements OnInit {
  proprietaires: Proprietaire[] = [];
  targetProprietaire: any = [];
  selectedId : any;

  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService
  ) { }

  ngOnInit(): void {
    this.getAllProprietaires(); // Trow the fitching data
  }
  
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
    let text!: string
    value ? text = 'Oui' : text = 'Non'
    return text
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
      deleted: true
    }
    // Call detele proprietaire function from proprietaire service
    this.proprietaireService.deleteProprietaire(id, data).subscribe((_) => {
      this.getAllProprietaires(); // Trow the fitching data

    })
  }

  // Refrtech the page
  refrechPage() {
    location.reload();
  }

}
