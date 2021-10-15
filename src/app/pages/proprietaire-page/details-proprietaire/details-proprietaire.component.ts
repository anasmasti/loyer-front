import { Proprietaire } from 'src/app/models/Proprietaire';
import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-proprietaire',
  templateUrl: './details-proprietaire.component.html',
  styleUrls: ['./details-proprietaire.component.scss'],
})
export class DetailsProprietaireComponent implements OnInit {
  
  proprietaire!: Proprietaire;
  mandataire!: any;

  userMatricule: any = localStorage.getItem('matricule')

  constructor(
    private proprietaireService: ProprietaireService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProprietaireById(); // Fetching proprietaire on initialisation
  }

  // Get the proprietaire data by id
  getProprietaireById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '615c714d3500e8382c92fcda';
    this.proprietaireService.getProprietaireById(id, this.userMatricule).subscribe((data) => {
      if (data) {
        this.proprietaire = data;
        this.mandataire = data.mandataire;
      }
    });
  }
}
