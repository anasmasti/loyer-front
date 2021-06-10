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

  targetIndex!: number;
  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService
  ) {}

  ngOnInit(): void {
    this.getAllProprietaires();
  }

  getAllProprietaires() {
    this.proprietaireService.getProprietaire().subscribe((data) => {
      this.proprietaires = data;
    });
  }

  // Open the contact form
  openModalAndFetchProprietaire(myTargetIndex: any, myTargetProprietaire: any) {
    this.mainModalService.open();
    
      this.targetIndex = myTargetIndex;
      this.targetProprietaire = myTargetProprietaire;
    
  }
}
