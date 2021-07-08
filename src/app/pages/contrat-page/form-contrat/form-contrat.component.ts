import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss']
})
export class FormContratComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contratForm : FormGroup = new FormGroup({
    Ncontrat_loyer : new FormControl(),
    piece_jointe : new FormControl(),
    date_debut_loyer : new FormControl(),
    montant_loyer : new FormControl(),
    taxe_edilite_comprise_loyer : new FormControl(),
    taxe_edilite_noncomprise_loyer : new FormControl(),
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

  ShowEtat(){
    this.contratForm.patchValue({
     etat: this.contratForm.value.etat_contrat
  })

  console.log("================",this.contratForm.value.etat_contrat);
  

  }
   

  
}
