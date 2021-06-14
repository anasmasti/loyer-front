import { Proprietaire } from './../../../models/proprietaire';
import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from 'src/app/services/proprietaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-proprietaire',
  templateUrl: './details-proprietaire.component.html',
  styleUrls: ['./details-proprietaire.component.scss']
})
export class DetailsProprietaireComponent implements OnInit {
  proprietaire: Proprietaire = {
    _id: 'chargement...',
    cin: 'chargement...',
    passport: 'chargement...',
    carte_sejour: 'chargement...',
    nom_prenom: 'chargement...',
    raison_social: 'chargement...',
    n_registre_commerce: 'chargement...',
    telephone: 'chargement...',
    fax: 'chargement...',
    adresse: 'chargement...',
    n_compte_bancaire: 'chargement...',
    banque: 'chargement...',
    nom_agence_bancaire: 'chargement...',
    has_mandataire: false,
    mandataire: [{
      cin_mandataire: 'chargement...',
      nom_prenom_mandataire: 'chargement...',
      raison_social_mandataire: 'chargement...',
      telephone_mandataire: 'chargement...',
      fax_mandataire: 'chargement...',
      adresse_mandataire: 'chargement...',
      n_compte_bancaire_mandataire: 'chargement...',
    }]
  }
  mandataire!: {
    cin_mandataire: string;
    nom_prenom_mandataire: string;
    raison_social_mandataire: string;
    telephone_mandataire: string;
    fax_mandataire: string;
    adresse_mandataire: string;
    n_compte_bancaire_mandataire: string;
  }
  constructor(private proprietaireService: ProprietaireService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProprietaireById() // Fetching proprietaire on initialisation
  }

  // Get the proprietaire data by id
  getProprietaireById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.proprietaireService.getProprietaireById(id).subscribe(data => {
      if (data) {
        this.proprietaire = data
        this.mandataire = data.mandataire[0]
      }
    })
  }
}
