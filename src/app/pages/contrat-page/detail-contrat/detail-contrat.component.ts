import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { Contrat } from '../../../models/Contrat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss']
})
export class DetailContratComponent implements OnInit {

  Contrat: Contrat = {
    numero_contrat: 'loading...', 
    date_debut_loyer:  new Date, 
    date_fin_contrat:  new Date, 
    date_fin_avance:  new Date, 
    date_reprise_caution: new Date,
    date_premier_paiement:  new Date, 
    Montant_loyer: 0, 
    taxe_edilite_loyer: 'loading...', 
    taxe_edilite_non_loyer: 'loading...', 
    periodicite_paiement: 'loading...',
    duree_location: 0, 
    declaration_option: 'loading...', 
    taux_impot: 'loading...', 
    retenue_source: 'loading...', 
    montant_apres_impot: 0, 
    montant_caution: 0, 
    effort_caution: 'loading...', 
    statut_caution: 'loading...', 
    montant_avance: 0, 
    duree_avance: 0, 
    N_engagement_depense: 'loading...', 
    echeance_revision_loyer: 'loading...', 
    proprietaire: 'loading...', 
    type_lieu: 'loading...', 
    lieu: 'loading...', 
    protrietaire: 'loading...', 
    etat_contrat:{
       libelle: 'loading...', 
       etat: {
            n_avenant: 'loading...',
            motif: 'loading...', 
            montant_nouveau_loyer: 0, 
            signaletique_successeur: 'loading...',
            intitule_lieu: 'loading...',
            date_suspension:  new Date, 
            duree_suspension:0, 
            motif_suspension:'loading...',
            reprise_caution: 'loading...', 
            date_resiliation: new Date, 
            etat_lieu_sortie:'loading...',
            preavis: 'loading...'
       }
    } ,
    deleted: false
  };

  constructor(private contratService: ContratService,  private actRoute: ActivatedRoute) { }
  
  ngOnInit(): void {

    this.getSelectedContrat()
  }

  getSelectedContrat(){
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.contratService.getSelectedContrat(id).subscribe((data:any) => {
      this.Contrat = data;
    });
  }


}
