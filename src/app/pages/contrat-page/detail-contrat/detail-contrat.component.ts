import { Component, OnInit } from '@angular/core';
import { Contrat } from '../../../models/Contrat';
@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss']
})
export class DetailContratComponent implements OnInit {

  Contrat: Contrat = {
    _id: "chargement ...",
    etat: "chargement ...",
    Date_debut_loyer:  new Date(),
    Date_fin_contrat_bail:  new Date(),
    Duree_location: 0,
    Periodicite_paiement: "chargement ...",
    Montant_loyer: 0,
    Taxe_edilite_loyer: 0,
    Taxe_edilite_non_loyer: 0,
    Declaration_option: "chargement ...",
    Taux_impot: 0,
    Retenue_source: "chargement ...",
    Montant_apres_impot: 0,
    Montant_caution: 0,
    Effort_caution:"chargement ...",
    Date_reprise_caution : new Date(),
    Statut_caution:"chargement ...",
    Montant_lavance:0,
    Date_fin_lavance: new Date(),
    Date_1er_paiement: new Date(),
    Duree_lavance:0,
    N_dengagement_depense:0,
    Echeance_revision_loyer:"chargement ..."
  };

  constructor() { }
  
  ngOnInit(): void {
  }


}
