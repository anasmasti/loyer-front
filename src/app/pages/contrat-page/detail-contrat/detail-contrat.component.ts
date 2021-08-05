import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { Contrat } from '../../../models/Contrat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss'],
})
export class DetailContratComponent implements OnInit {
  Contrat: Contrat = {
    _id: 'Chargement...',
    numero_contrat: 'Chargement...',
    date_debut_loyer: new Date(),
    date_fin_contrat: new Date(),
    date_fin_avance: new Date(),
    date_reprise_caution: new Date(),
    date_premier_paiement: new Date(),
    Montant_loyer: 0,
    taxe_edilite_loyer: 'Chargement...',
    taxe_edilite_non_loyer: 'Chargement...',
    periodicite_paiement: 'Chargement...',
    duree_location: 0,
    declaration_option: 'Chargement...',
    taux_impot: 'Chargement...',
    retenue_source: 'Chargement...',
    montant_apres_impot: 0,
    montant_caution: 0,
    effort_caution: 'Chargement...',
    statut_caution: 'Chargement...',
    montant_avance: 0,
    duree_avance: 0,
    N_engagement_depense: 'Chargement...',
    echeance_revision_loyer: 'Chargement...',
    proprietaire: 'Chargement...',
    type_lieu: 'Chargement...',
    lieu: 'Chargement...',
    protrietaire: 'Chargement...',
    etat_contrat: [{
      libelle: 'Chargement...',
      etat: {
        n_avenant: 'Chargement...',
        motif: 'Chargement...',
        montant_nouveau_loyer: 0,
        signaletique_successeur: 'Chargement...',
        intitule_lieu: 'Chargement...',
        date_suspension: new Date(),
        duree_suspension: 0,
        motif_suspension: 'Chargement...',
        reprise_caution: 'Chargement...',
        date_resiliation: new Date(),
        etat_lieu_sortie: 'Chargement...',
        preavis: 'Chargement...',
      },
    }],
    deleted: false,
  };

  constructor(
    private contratService: ContratService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSelectedContrat();
  }

  getSelectedContrat() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.contratService.getSelectedContrat(id).subscribe((data: any) => {
      this.Contrat = data;
    });
  }
}
