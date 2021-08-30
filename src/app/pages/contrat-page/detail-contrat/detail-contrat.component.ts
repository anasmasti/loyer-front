import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { Contrat } from '../../../models/Contrat';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss'],
})
export class DetailContratComponent implements OnInit {

  selectedPieceContrat!: any;
  selected_images_res_sortie!: any;
  selected_lettre_res!: any;
  selected_piece_jointe_avenant!: any ;
  url: string = 'http://192.168.11.116:5000/';

  contrat: Contrat ={
    _id: 'Chargement...',
    numero_contrat: 'Chargement...',
    piece_joint_contrat: [],
    date_debut_loyer: 'Chargement...',
    date_fin_contrat: 'Chargement...',
    date_reprise_caution: 'Chargement...',
    date_fin_avance: 'Chargement...',
    date_premier_paiement: 'Chargement...',
    montant_loyer: 0,
    taxe_edilite_loyer: 'Chargement...',
    taxe_edilite_non_loyer: 'Chargement...',
    periodicite_paiement: 'Chargement...',
    duree_location: 0,
    declaration_option: 'Chargement...',
    taux_impot: 'Chargement...',
    retenue_source: 'Chargement...',
    montant_apres_impot: 0 ,
    montant_caution: 0,
    effort_caution: 'Chargement...',
    statut_caution: 'Chargement...',
    montant_avance: 0,
    duree_avance: 0,
    n_engagement_depense: 'Chargement...',
    echeance_revision_loyer: 'Chargement...',
    type_lieu: 'Chargement...',
    lieu: 'Chargement...',
    foncier: 'Chargement...',
    etat_contrat: {
      libelle: 'Chargement...',
      etat: {
        n_avenant: 'Chargement...',
        motif: 'Chargement...',
        montant_nouveau_loyer: 0,
        signaletique_successeur: 'Chargement...',
        intitule_lieu: 'Chargement...',
        date_suspension: 'Chargement...',
        duree_suspension: 0,
        motif_suspension: 'Chargement...',
        reprise_caution: 'Chargement...',
        date_resiliation: 'Chargement...',
        etat_lieu_sortie: 'Chargement...',
        preavis: 'Chargement...',
        images_etat_res_lieu_sortie: [],
        lettre_res_piece_jointe: [],
        piece_jointe_avenant: [],
      }
    },
    deleted: false,
    validation1_DMG: false,
    validation2_DAJC: false,
  }

  constructor(
    private contratService: ContratService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSelectedContrat();
  }

  getSelectedContrat() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.contratService.getSelectedContrat(id).subscribe((data: any) => {
      this.contrat = data;
      this.contrat.piece_joint_contrat = data.piece_joint_contrat;
      this.contrat.etat_contrat = data.etat_contrat
      

      for (let index = 0; index < 1; index++) {
        
        this.selectedPieceContrat = this.contrat.piece_joint_contrat[index];
        this.selected_lettre_res =  this.contrat.etat_contrat?.etat.lettre_res_piece_jointe[index];
        this.selected_piece_jointe_avenant = this.contrat.etat_contrat?.etat.piece_jointe_avenant[index];
        this.selected_images_res_sortie = this.contrat.etat_contrat?.etat.images_etat_res_lieu_sortie[index];
      }
      console.log('1', this.selectedPieceContrat);
      
     
      console.log(this.selectedPieceContrat);
      console.log(this.selected_lettre_res);
      console.log(this.selected_piece_jointe_avenant);
      console.log(this.selected_images_res_sortie);
      // console.log("Data ==> ",this.contrat);
    });

    
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }


}
