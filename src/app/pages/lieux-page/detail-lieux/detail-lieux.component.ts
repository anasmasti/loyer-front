import { Lieu } from 'src/app/models/Lieu';

import { Component, OnInit } from '@angular/core';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss'],
})
export class DetailLieuxComponent implements OnInit {
  lieu: Lieu = {

    _id: 'Chargement...',
    code_lieu: 'Chargement...',
    intitule_lieu: 'Chargement...',
    intitule_DR: 'Chargement...',
    adresse: 'Chargement...',
    ville: 'Chargement...',
    code_localite: 'Chargement...',
    desc_lieu_entrer: 'Chargement...',
    imgs_lieu_entrer: 'Chargement...',
    has_amenagements: false,
    superficie: 'Chargement...',
    telephone: 'Chargement...',
    fax: 'Chargement...',
    etat_logement_fonction: 'Chargement...',
    etage: 'Chargement...',
    type_lieu: 'Chargement...',
    code_rattache_DR: 'Chargement...',
    code_rattache_SUP: 'Chargement...',
    intitule_rattache_SUP_PV: 'Chargement...',
    centre_cout_siege: 'Chargement...',
    categorie_pointVente: 'Chargement...',

    directeur_regional: [
      {
        matricule: 'Chargement...',
        nom: 'Chargement...',
        prenom: 'Chargement...',
        deleted: false
      }
    ],

    amenagement: [{
      _id: 'Chargement...',
      nature_amenagement: 'Chargement...',
      montant_amenagement: 'Chargement...',
      valeur_nature_chargeProprietaire: 'Chargement...',
      valeur_nature_chargeFondation: 'Chargement...',
      numero_facture: 'Chargement...',
      numero_bon_commande: 'Chargement...',
      date_passation_commande: 'Chargement...',
      evaluation_fournisseur: 'Chargement...',
      date_fin_travaux: 'Chargement...',
      date_livraison_local: 'Chargement...',

      fournisseur: [{
        nom: 'Chargement...',
        prenom: 'Chargement...',
        amenagement_effectue: 'Chargement...',
      }]
    }]

  };

  selectedAmenagement: any = {
    _id: 'Chargement...',
    nature_amenagement: 'Chargement...',
    montant_amenagement: 'Chargement...',
    valeur_nature_chargeProprietaire: 'Chargement...',
    valeur_nature_chargeFondation: 'Chargement...',
    numero_facture: 'Chargement...',
    numero_bon_commande: 'Chargement...',
    date_passation_commande: 'Chargement...',
    evaluation_fournisseur: 'Chargement...',
    date_fin_travaux: 'Chargement...',
    date_livraison_local: 'Chargement...',

    fournisseur: [{
      nom: 'Chargement...',
      prenom: 'Chargement...',
      amenagement_effectue: 'Chargement...',
    }]
  };

  displayAmenagementSection: boolean = false;

  constructor(
    private lieuxService: LieuxService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLieuById();

  }
  // Get the Lieu data by id
  getLieuById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.lieuxService.getLieuById(id).subscribe((data: any) => {
      this.lieu = data;
      this.lieu.amenagement = data.amenagements;
    });
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  displayAmenagement(id: any) {
    if (this.lieu.amenagement?.length) {
      for (let index = 0; index < this.lieu.amenagement.length; index++) {
        if (this.lieu.amenagement[index]._id == id) {
          this.selectedAmenagement = this.lieu.amenagement[index];
        }
      }
      this.displayAmenagementSection = true;
    }
  }
}
