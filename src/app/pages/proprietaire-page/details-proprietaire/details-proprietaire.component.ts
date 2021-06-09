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
    _id: '--',
    cin: '--',
    passport: '--',
    carte_sejour: '--',
    nom_prenom: '--',
    raison_social: '--',
    n_registre_commerce: '--',
    telephone: '--',
    fax: '--',
    adresse: '--',
    n_compte_bancaire: '--',
    banque: '--',
    nom_agence_bancaire: '--',
    has_mandataire: false,
    mandataire: {
      cin_mandataire: '--',
      nom_prenom_mandataire: '--',
      raison_social_mandataire: '--',
      telephone_mandataire: '--',
      fax_mandataire: '--',
      adresse_mandataire: '--',
      n_compte_bancaire_mandataire: '--',
    }
  }
  constructor(private proprietaireService: ProprietaireService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProprietaireById()
  }

  getProprietaireById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.proprietaireService.getProprietaireById(id).subscribe(data => {
      if (data) {
        this.proprietaire = data
      }
    })
  }
}
