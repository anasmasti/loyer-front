import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.scss']
})
export class EditContratComponent implements OnInit {
  etat: string = ''
  constructor() { }

  ngOnInit(): void {
  }

  contratForm: FormGroup = new FormGroup({
    Ncontrat_loyer: new FormControl(),
    piece_jointe: new FormControl(),
    date_debut_loyer: new FormControl(),
    montant_loyer: new FormControl(),
    taxe_edilite_comprise_loyer: new FormControl(),
    taxe_edilite_noncomprise_loyer: new FormControl(),
    periodicite_paiement: new FormControl(),
    duree_location: new FormControl(),
    date_fin_contrat: new FormControl(),
    declaration_option: new FormControl(),
    taux_impot: new FormControl(),
    retenue_source: new FormControl(),
    montant_apres_impot: new FormControl(),
    montant_caution: new FormControl(),
    effort_caution: new FormControl(),
    date_reprise_caution: new FormControl(),
    statut_caution: new FormControl(),
    montant_avance: new FormControl(),
    date_fin_avance: new FormControl(),
    date_1er_paiement: new FormControl(),
    duree_avance: new FormControl(),
    Nengagement_dépense: new FormControl(),
    echeance_revision_loyer: new FormControl(),
    proprietaire: new FormControl(),
    type_lieu: new FormControl(),
    lieu: new FormControl(),
    etat_contrat: new FormControl(),
  })

  etatContrat : FormGroup = new FormGroup({
    //AVENANT
    N_avenant: new FormControl(),
    piece_joint_av: new FormControl(),
    motif: new FormControl(),
    montant_new_loyer: new FormControl(),
    signaletique_successeur: new FormControl(),
    //SUSPENSION
    intitule_lieu_sus: new FormControl(),
    date_suspension: new FormControl(),
    duree_suspension: new FormControl(),
    motif_suspension: new FormControl(),
    //RESILIATION
    intitule_lieu_res: new FormControl(),
    reprise_caution: new FormControl(),
    date_resiliation: new FormControl(),
    etat_lieux_sortie: new FormControl(),
    images_lieux_sortie: new FormControl(),
    preavis: new FormControl(),
    lettre_resiliation_scannee: new FormControl(),


  })

  ShowEtat() {
    this.etat = this.contratForm.value.etat_contrat
    console.log("================", this.contratForm.value.etat_contrat);
  }

}
