import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contrat } from 'src/app/models/Contrat';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss'],
})
export class FormContratComponent implements OnInit {
  // whitch form to load

  @Input() formType!: any;

  etat: string = '';

  constructor(
    private contratService: ContratService,
    private lieuxService: LieuxService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnChanges() {
    this.fillUpContrat();
    setTimeout(() => {
      this.date_debut_loyer = this.Contrat.date_debut_loyer;
      this.date_fin_contrat = this.Contrat.date_fin_contrat;
      this.date_fin_avance = this.Contrat.date_fin_avance;
      this.date_reprise_caution = this.Contrat.date_reprise_caution;
      this.date_1er_paiement = this.Contrat.date_premier_paiement;
      this.etat_contrat = this.Contrat.etat_contrat.libelle;
      this.date_resiliation = this.Contrat.etat_contrat.etat.date_resiliation;
      this.date_suspension = this.Contrat.etat_contrat.etat.date_suspension;
    }, 300);
  }

  ngOnInit(): void {
    // this.fillUpContrat();
    this.getLieux();
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
  });
  etatContrat: FormGroup = new FormGroup({
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
  });

  lieux!:any;

  date_debut_loyer!: Date;
  date_fin_contrat!: Date;
  date_fin_avance!: Date;
  date_reprise_caution!: Date;
  date_1er_paiement!: Date;
  etat_contrat!: String;
  date_resiliation!: Date;
  date_suspension!: Date;

  ShowEtat() {
    this.etat_contrat = this.contratForm.value.etat_contrat;
    console.log('================', this.contratForm.value.etat_contrat);
  }

  //objet contrat
  Contrat: Contrat = {
    numero_contrat: 'loading...',
    date_debut_loyer: new Date(),
    date_fin_contrat: new Date(),
    date_fin_avance: new Date(),
    date_reprise_caution: new Date(),
    date_premier_paiement: new Date(),
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
    etat_contrat: {
      libelle: 'loading...',
      etat: {
        n_avenant: 'loading...',
        motif: 'loading...',
        montant_nouveau_loyer: 0,
        signaletique_successeur: 'loading...',
        intitule_lieu: 'loading...',
        date_suspension: new Date(),
        duree_suspension: 0,
        motif_suspension: 'loading...',
        reprise_caution: 'loading...',
        date_resiliation: new Date(),
        etat_lieu_sortie: 'loading...',
        preavis: 'loading...',
      },
    },
    deleted: false,
  };

  //remplissage de contrat form au cas de modification
  fillUpContrat() {
    if (this.formType != '') {
      const id = this.actRoute.snapshot.paramMap.get('id') || '';
      this.contratService.getSelectedContrat(id).subscribe((data: any) => {
        this.Contrat = data;
      });
      console.log('---' + this.Contrat.numero_contrat);
      setTimeout(() => {
        this.contratForm.patchValue({
          Ncontrat_loyer: this.Contrat.numero_contrat,
          // date_debut_loyer: this.Contrat.date_debut_loyer ,
          montant_loyer: this.Contrat.Montant_loyer,
          taxe_edilite_comprise_loyer: this.Contrat.taxe_edilite_loyer,
          taxe_edilite_noncomprise_loyer: this.Contrat.taxe_edilite_non_loyer,
          periodicite_paiement: this.Contrat.periodicite_paiement,
          duree_location: this.Contrat.duree_location,
          // date_fin_contrat: this.Contrat.date_fin_contrat,
          declaration_option: this.Contrat.declaration_option,
          taux_impot: this.Contrat.taux_impot,
          retenue_source: this.Contrat.retenue_source,
          montant_apres_impot: this.Contrat.montant_apres_impot,
          montant_caution: this.Contrat.montant_caution,
          effort_caution: this.Contrat.effort_caution,
          // date_reprise_caution: this.Contrat.date_reprise_caution,
          statut_caution: this.Contrat.statut_caution,
          montant_avance: this.Contrat.montant_avance,
          // date_fin_avance: this.Contrat.date_fin_avance,
          // date_1er_paiement: this.Contrat.date_premier_paiement,
          duree_avance: this.Contrat.duree_avance,
          echeance_revision_loyer: this.Contrat.echeance_revision_loyer,
          proprietaire: this.Contrat.proprietaire,
          type_lieu: this.Contrat.type_lieu,
          lieu: this.Contrat.lieu,
          etat_contrat: this.Contrat.etat_contrat.libelle,
          Nengagement_dépense: this.Contrat.N_engagement_depense,
        });
        this.etatContrat.patchValue({
          //AVENANT
          N_avenant: this.Contrat.etat_contrat.etat.n_avenant,
          //  piece_joint_av:this.Contrat.etat_contrat.etat.n_avenant,
          motif: this.Contrat.etat_contrat.etat.motif,
          montant_new_loyer:
            this.Contrat.etat_contrat.etat.montant_nouveau_loyer,
          signaletique_successeur:
            this.Contrat.etat_contrat.etat.signaletique_successeur,
          //SUSPENSION
          intitule_lieu_sus: this.Contrat.etat_contrat.etat.intitule_lieu,
          //  date_suspension:this.Contrat.etat_contrat.etat.date_suspension,
          duree_suspension: this.Contrat.etat_contrat.etat.duree_suspension,
          motif_suspension: this.Contrat.etat_contrat.etat.motif_suspension,
          //RESILIATION
          intitule_lieu_res: this.Contrat.etat_contrat.etat.intitule_lieu,
          reprise_caution: this.Contrat.etat_contrat.etat.reprise_caution,
          //  date_resiliation:this.Contrat.etat_contrat.etat.date_resiliation,
          etat_lieux_sortie: this.Contrat.etat_contrat.etat.etat_lieu_sortie,
          //  images_lieux_sortie:this.Contrat.etat_contrat.etat.n_avenant,
          preavis: this.Contrat.etat_contrat.etat.preavis,
          //  lettre_resiliation_scannee:this.Contrat.etat_contrat.etat.n_avenant,
        });
      }, 500);
    }
  }

  updateContrat() {
    this.fillNewValues();
    console.log(this.Contrat);
    //sending request
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.contratService
      .updateContrat(id, this.Contrat)
      .subscribe((data: any) => {
        this.Contrat = data;
      });
  }

  addNewContrat() {
    this.fillNewValues();
    console.log(this.Contrat);
    this.contratService.addContrat(this.Contrat).subscribe((data: any) => {
      this.Contrat = data;
    });
  }

  fillNewValues() {
    //filling-up Contrat object with the new values form formGroup
    this.Contrat.numero_contrat = this.contratForm.get('Ncontrat_loyer')?.value;
    this.Contrat.date_debut_loyer =
      this.contratForm.get('date_debut_loyer')?.value;
    this.Contrat.Montant_loyer = this.contratForm.get('montant_loyer')?.value;
    this.Contrat.taxe_edilite_loyer = this.contratForm.get(
      'taxe_edilite_comprise_loyer'
    )?.value;
    this.Contrat.taxe_edilite_non_loyer = this.contratForm.get(
      'taxe_edilite_noncomprise_loyer'
    )?.value;
    this.Contrat.periodicite_paiement = this.contratForm.get(
      'periodicite_paiement'
    )?.value;
    this.Contrat.date_fin_contrat =
      this.contratForm.get('date_fin_contrat')?.value;
    this.Contrat.declaration_option =
      this.contratForm.get('declaration_option')?.value;
    this.Contrat.taux_impot = this.contratForm.get('taux_impot')?.value;
    this.Contrat.retenue_source = this.contratForm.get('retenue_source')?.value;
    this.Contrat.montant_apres_impot = this.contratForm.get(
      'montant_apres_impot'
    )?.value;
    this.Contrat.montant_caution =
      this.contratForm.get('montant_caution')?.value;
    this.Contrat.effort_caution = this.contratForm.get('effort_caution')?.value;
    this.Contrat.date_reprise_caution = this.contratForm.get(
      'date_reprise_caution'
    )?.value;
    this.Contrat.statut_caution = this.contratForm.get('statut_caution')?.value;
    this.Contrat.montant_avance = this.contratForm.get('montant_avance')?.value;
    this.Contrat.date_fin_avance =
      this.contratForm.get('date_fin_avance')?.value;
    this.Contrat.date_premier_paiement =
      this.contratForm.get('date_1er_paiement')?.value;
    this.Contrat.duree_avance = this.contratForm.get('duree_avance')?.value;
    this.Contrat.echeance_revision_loyer = this.contratForm.get(
      'echeance_revision_loyer'
    )?.value;
    this.Contrat.proprietaire = this.contratForm.get('proprietaire')?.value;
    this.Contrat.type_lieu = this.contratForm.get('type_lieu')?.value;
    this.Contrat.N_engagement_depense = this.contratForm.get(
      'Nengagement_dépense'
    )?.value;
    this.Contrat.lieu = this.contratForm.get('lieu')?.value;
    this.Contrat.duree_location = this.contratForm.get('duree_location')?.value;
    this.Contrat.etat_contrat.libelle =
      this.contratForm.get('etat_contrat')?.value;

    //AVENANT
    this.Contrat.etat_contrat.etat.n_avenant =
      this.etatContrat.get('N_avenant')?.value;
    this.Contrat.etat_contrat.etat.motif = this.etatContrat.get('motif')?.value;
    this.Contrat.etat_contrat.etat.montant_nouveau_loyer =
      this.etatContrat.get('montant_new_loyer')?.value;
    this.Contrat.etat_contrat.etat.signaletique_successeur =
      this.etatContrat.get('signaletique_successeur')?.value;
    //SUSPENSION
    
    this.Contrat.etat_contrat.etat.date_suspension =
      this.etatContrat.get('date_suspension')?.value;
    this.Contrat.etat_contrat.etat.duree_suspension =
      this.etatContrat.get('duree_suspension')?.value;
    this.Contrat.etat_contrat.etat.motif_suspension =
      this.etatContrat.get('motif_suspension')?.value;
    //RESILIATION
    
    this.Contrat.etat_contrat.etat.date_resiliation =
      this.etatContrat.get('date_resiliation')?.value;
    this.Contrat.etat_contrat.etat.reprise_caution =
      this.etatContrat.get('reprise_caution')?.value;
    this.Contrat.etat_contrat.etat.etat_lieu_sortie =
      this.etatContrat.get('etat_lieux_sortie')?.value;
    this.Contrat.etat_contrat.etat.preavis =
      this.etatContrat.get('preavis')?.value;

      if(this.etatContrat.get('intitule_lieu_sus')?.value!=''){
         this.Contrat.etat_contrat.etat.intitule_lieu =
        this.etatContrat.get('intitule_lieu_sus')?.value;
      }else if(this.etatContrat.get('intitule_lieu_res')?.value!=''){
        this.Contrat.etat_contrat.etat.intitule_lieu =
      this.etatContrat.get('intitule_lieu_res')?.value;
      }

     
      
  }

  getLieux(){
    
    this.lieuxService.getLieux().subscribe((data: any) => {
      this.lieux = data;
      console.log(data);
      
    });
  
  }

}
