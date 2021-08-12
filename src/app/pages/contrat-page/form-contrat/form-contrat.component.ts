import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contrat } from 'src/app/models/Contrat';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss'],
})
export class FormContratComponent implements OnInit {
  // whitch form to load

  @Input() formType!: string;
  //objet contrat
  updatedEtatContrat!: Contrat;

  @Input() contrat?: any;
  idContrat: String = '';
  etat: string = '';
  success: boolean = false;
  msg: string = '';
  updatedContrat: any = {};
  NvEtatContrat: any = {};
  oldEtatContrat: any = {};
  contratForm!: FormGroup;
  etatContrat!: FormGroup;
  lieux!: any;
  propriataire!: any;
  date_debut_loyer!: Date;
  date_fin_contrat!: Date;
  date_fin_avance!: Date;
  date_reprise_caution!: Date;
  date_1er_paiement!: Date;
  etat_contrat!: String;
  date_resiliation!: Date;
  date_suspension!: Date;

  constructor(
    private contratService: ContratService,
    private lieuxService: LieuxService,
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService
  ) { }

  ngOnChanges() {

    if (this.formType != '') {
      if (this.contrat.length != 0) {
        setTimeout(() => {

          this.idContrat = this.contrat._id;
          this.fillUpContrat();
          this.date_debut_loyer = this.contrat.date_debut_loyer;
          this.date_fin_contrat = this.contrat.date_fin_contrat;
          this.date_fin_avance = this.contrat.date_fin_avance;
          this.date_reprise_caution = this.contrat.date_reprise_caution;
          this.date_1er_paiement = this.contrat.date_premier_paiement;
          this.etat_contrat = this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle;
          this.date_resiliation =
            this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.date_resiliation;
          this.date_suspension =
            this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.date_suspension;
        }, 300);
      }
    }

  }

  ngOnInit(): void {
    // this.fillUpContrat();
    this.getLieux();
    this.getProps();

    this.contratForm = new FormGroup({
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

    this.etatContrat = new FormGroup({
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
  }






  ShowEtat() {
    this.etat_contrat = this.contratForm.value.etat_contrat;
  }

  addNewContrat() {
    this.fillNewValues();

    this.contratService.addContrat(this.updatedEtatContrat).subscribe((data: any) => {
      this.updatedEtatContrat = data;
    });
    this.contratForm.reset();
  }

  //remplissage de contrat form au cas de modification
  fillUpContrat() {
    if (this.formType != '') {
      const id = this.idContrat;

      this.contratService.getSelectedContrat(id).subscribe((data: any) => {
        this.updatedEtatContrat = data;
      });

      setTimeout(() => {
        this.contratForm.patchValue({
          Ncontrat_loyer: this.updatedEtatContrat.numero_contrat,
          montant_loyer: this.updatedEtatContrat.Montant_loyer,
          taxe_edilite_comprise_loyer: this.updatedEtatContrat.taxe_edilite_loyer,
          taxe_edilite_noncomprise_loyer: this.updatedEtatContrat.taxe_edilite_non_loyer,
          periodicite_paiement: this.updatedEtatContrat.periodicite_paiement,
          duree_location: this.updatedEtatContrat.duree_location,
          declaration_option: this.updatedEtatContrat.declaration_option,
          taux_impot: this.updatedEtatContrat.taux_impot,
          retenue_source: this.updatedEtatContrat.retenue_source,
          montant_apres_impot: this.updatedEtatContrat.montant_apres_impot,
          montant_caution: this.updatedEtatContrat.montant_caution,
          effort_caution: this.updatedEtatContrat.effort_caution,
          statut_caution: this.updatedEtatContrat.statut_caution,
          montant_avance: this.updatedEtatContrat.montant_avance,
          duree_avance: this.updatedEtatContrat.duree_avance,
          echeance_revision_loyer: this.updatedEtatContrat.echeance_revision_loyer,
          proprietaire: this.updatedEtatContrat.proprietaire,
          type_lieu: this.updatedEtatContrat.type_lieu,
          lieu: this.updatedEtatContrat.lieu,
          etat_contrat: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].libelle,
          Nengagement_dépense: this.updatedEtatContrat.N_engagement_depense,
        });
        this.etatContrat.patchValue({
          //AVENANT
          N_avenant: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.n_avenant,
          motif: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.motif,
          montant_new_loyer:
            this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.montant_nouveau_loyer,
          signaletique_successeur:
            this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.signaletique_successeur,

          //SUSPENSION
          intitule_lieu_sus: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.intitule_lieu,
          duree_suspension: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.duree_suspension,
          motif_suspension: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.motif_suspension,

          //RESILIATION
          intitule_lieu_res: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.intitule_lieu,
          reprise_caution: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.reprise_caution,
          etat_lieux_sortie: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.etat_lieu_sortie,
          preavis: this.updatedEtatContrat.etat_contrat[this.updatedEtatContrat.etat_contrat.length - 1].etat.preavis
        });
      }, 500);
    }
  }

  fillNewValues() {
    //filling-up Contrat object with the new values form formGroup
    this.updatedEtatContrat.numero_contrat = this.contratForm.get('Ncontrat_loyer')?.value;
    this.updatedEtatContrat.date_debut_loyer =
      this.contratForm.get('date_debut_loyer')?.value;
    this.updatedEtatContrat.Montant_loyer = this.contratForm.get('montant_loyer')?.value;
    this.updatedEtatContrat.taxe_edilite_loyer = this.contratForm.get(
      'taxe_edilite_comprise_loyer'
    )?.value;
    this.updatedEtatContrat.taxe_edilite_non_loyer = this.contratForm.get(
      'taxe_edilite_noncomprise_loyer'
    )?.value;
    this.updatedEtatContrat.periodicite_paiement = this.contratForm.get(
      'periodicite_paiement'
    )?.value;
    this.updatedEtatContrat.date_fin_contrat =
      this.contratForm.get('date_fin_contrat')?.value;
    this.updatedEtatContrat.declaration_option =
      this.contratForm.get('declaration_option')?.value;
    this.updatedEtatContrat.taux_impot = this.contratForm.get('taux_impot')?.value;
    this.updatedEtatContrat.retenue_source = this.contratForm.get('retenue_source')?.value;
    this.updatedEtatContrat.montant_apres_impot = this.contratForm.get(
      'montant_apres_impot'
    )?.value;
    this.updatedEtatContrat.montant_caution =
      this.contratForm.get('montant_caution')?.value;
    this.updatedEtatContrat.effort_caution = this.contratForm.get('effort_caution')?.value;
    this.updatedEtatContrat.date_reprise_caution = this.contratForm.get(
      'date_reprise_caution'
    )?.value;
    this.updatedEtatContrat.statut_caution = this.contratForm.get('statut_caution')?.value;
    this.updatedEtatContrat.montant_avance = this.contratForm.get('montant_avance')?.value;
    this.updatedEtatContrat.date_fin_avance =
      this.contratForm.get('date_fin_avance')?.value;
    this.updatedEtatContrat.date_premier_paiement =
      this.contratForm.get('date_1er_paiement')?.value;
    this.updatedEtatContrat.duree_avance = this.contratForm.get('duree_avance')?.value;
    this.updatedEtatContrat.echeance_revision_loyer = this.contratForm.get(
      'echeance_revision_loyer'
    )?.value;
    this.updatedEtatContrat.proprietaire = this.contratForm.get('proprietaire')?.value;
    this.updatedEtatContrat.type_lieu = this.contratForm.get('type_lieu')?.value;
    this.updatedEtatContrat.N_engagement_depense = this.contratForm.get(
      'Nengagement_dépense'
    )?.value;
    this.updatedEtatContrat.lieu = this.contratForm.get('lieu')?.value;
    this.updatedEtatContrat.duree_location = this.contratForm.get('duree_location')?.value;
    this.updatedEtatContrat.etat_contrat[0].libelle =
      this.contratForm.get('etat_contrat')?.value;

    //AVENANT
    this.updatedEtatContrat.etat_contrat[0].etat.n_avenant =
      this.etatContrat.get('N_avenant')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.motif =
      this.etatContrat.get('motif')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.montant_nouveau_loyer =
      this.etatContrat.get('montant_new_loyer')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.signaletique_successeur =
      this.etatContrat.get('signaletique_successeur')?.value;
    //SUSPENSION

    this.updatedEtatContrat.etat_contrat[0].etat.date_suspension =
      this.etatContrat.get('date_suspension')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.duree_suspension =
      this.etatContrat.get('duree_suspension')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.motif_suspension =
      this.etatContrat.get('motif_suspension')?.value;
    //RESILIATION

    this.updatedEtatContrat.etat_contrat[0].etat.date_resiliation =
      this.etatContrat.get('date_resiliation')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.reprise_caution =
      this.etatContrat.get('reprise_caution')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.etat_lieu_sortie =
      this.etatContrat.get('etat_lieux_sortie')?.value;
    this.updatedEtatContrat.etat_contrat[0].etat.preavis =
      this.etatContrat.get('preavis')?.value;

    if (this.contratForm.get('etat_contrat')?.value == 'Suspension') {
      this.updatedEtatContrat.etat_contrat[0].etat.intitule_lieu =
        this.etatContrat.get('intitule_lieu_sus')?.value;
    } else if (this.contratForm.get('etat_contrat')?.value == 'Résiliation') {
      this.updatedEtatContrat.etat_contrat[0].etat.intitule_lieu =
        this.etatContrat.get('intitule_lieu_res')?.value;
    }
  }

  getLieux() {
    this.lieuxService.listLieux().subscribe((data: any) => {
      this.lieux = data;
    });
  }
  getProps() {
    this.proprietaireService.getProps().subscribe((data: any) => {
      this.propriataire = data;
    });
  }

  alertOn(action: string) {
    if (action == 'update') {
      this.msg = 'Cette contrat est modifiée avec succées !';
    } else if (action == 'add') {
      this.msg = 'Contrat ajoutée avec succées !';
    }
    this.success = true;
    setTimeout(() => {
      window.scroll(0, 0);
    }, 100);
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

  closeModal() {
    this.mainModalService.close();
  }

  // ----------------------------------------------------- check if working 

  fillValuesupdate() {
    if (this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle != this.contratForm.get('etat_contrat')?.value) {
      this.updatedContrat = {
        numero_contrat: this.contratForm.get('Ncontrat_loyer')?.value,
        date_debut_loyer: this.contratForm.get('date_debut_loyer')?.value,
        Montant_loyer: this.contratForm.get('montant_loyer')?.value,
        taxe_edilite_loyer: this.contratForm.get('taxe_edilite_comprise_loyer')?.value,
        taxe_edilite_non_loyer: this.contratForm.get('taxe_edilite_noncomprise_loyer')?.value,
        periodicite_paiement: this.contratForm.get('periodicite_paiement')?.value,
        date_fin_contrat: this.contratForm.get('date_fin_contrat')?.value,
        declaration_option: this.contratForm.get('declaration_option')?.value,
        taux_impot: this.contratForm.get('taux_impot')?.value,
        retenue_source: this.contratForm.get('retenue_source')?.value,
        montant_apres_impot: this.contratForm.get('montant_apres_impot')?.value,
        montant_caution: this.contratForm.get('montant_caution')?.value,
        effort_caution: this.contratForm.get('effort_caution')?.value,
        date_reprise_caution: this.contratForm.get('date_reprise_caution')?.value,
        statut_caution: this.contratForm.get('statut_caution')?.value,
        montant_avance: this.contratForm.get('montant_avance')?.value,
        date_fin_avance: this.contratForm.get('date_fin_avance')?.value,
        date_premier_paiement: this.contratForm.get('date_1er_paiement')?.value,
        duree_avance: this.contratForm.get('duree_avance')?.value,
        echeance_revision_loyer: this.contratForm.get('echeance_revision_loyer')?.value,
        proprietaire: this.contratForm.get('proprietaire')?.value,
        type_lieu: this.contratForm.get('type_lieu')?.value,
        N_engagement_depense: this.contratForm.get('Nengagement_dépense')?.value,
        lieu: this.contratForm.get('lieu')?.value,
        duree_location: this.contratForm.get('duree_location')?.value,
      };

      if (this.contratForm.get('etat_contrat')?.value == 'Avenant') {
        this.NvEtatContrat = {
          libelle: this.contratForm.get('etat_contrat')?.value,
          updated: false,
          etat: {
            //AVENANT
            n_avenant: this.etatContrat.get('N_avenant')?.value,
            motif: this.etatContrat.get('motif')?.value,
            montant_nouveau_loyer: this.etatContrat.get('montant_new_loyer')?.value,
            signaletique_successeur: this.etatContrat.get('signaletique_successeur')
              ?.value,
          }

        };
      }
      if (this.contratForm.get('etat_contrat')?.value == 'Résiliation') {
        this.NvEtatContrat = {
          libelle: this.contratForm.get('etat_contrat')?.value,
          updated: false,
          etat: {

            //RESILIATION
            intitule_lieu: this.etatContrat.get('intitule_lieu_res')?.value,
            date_resiliation: this.etatContrat.get('date_resiliation')?.value,
            reprise_caution: this.etatContrat.get('reprise_caution')?.value,
            etat_lieu_sortie: this.etatContrat.get('etat_lieux_sortie')?.value,
            preavis: this.etatContrat.get('preavis')?.value,
          }

        };
      }
      if (this.contratForm.get('etat_contrat')?.value == 'Suspension') {
        this.NvEtatContrat = {
          libelle: this.contratForm.get('etat_contrat')?.value,
          updated: false,
          etat: {
            intitule_lieu: this.etatContrat.get('intitule_lieu_sus')?.value,
            date_suspension: this.etatContrat.get('date_suspension')?.value,
            duree_suspension: this.etatContrat.get('duree_suspension')?.value,
            motif_suspension: this.etatContrat.get('motif_suspension')?.value,
          }
        };
      }

      if (this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle == 'Avenant') {
        this.oldEtatContrat = {
          libelle: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle,
          updated: true,
          etat: {
            //AVENANT
            n_avenant: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.n_avenant,
            motif: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.motif,
            montant_nouveau_loyer: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.montant_nouveau_loyer,
            signaletique_successeur:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.signaletique_successeur,
          }
        };
      }
      if (this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle == 'Suspension') {
        this.oldEtatContrat = {
          libelle: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle,
          updated: true,
          etat: {
            //SUSPENSION
            intitule_lieu: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.intitule_lieu_sus,
            date_suspension: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.date_suspension,
            duree_suspension: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.duree_suspension,
            motif_suspension: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.motif_suspension,
          }
        };
      }
      if (this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle == 'Résiliation') {
        this.oldEtatContrat = {
          libelle: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle,
          updated: true,
          etat: {
            intitule_lieu: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.intitule_lieu_res,
            date_resiliation: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.date_resiliation,
            reprise_caution: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.reprise_caution,
            etat_lieu_sortie: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.etat_lieux_sortie,
            preavis: this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].etat.preavis,
          }
        };
      }
    }
  }


  updateContrat() {
    //sending request
    const id = this.idContrat;
    if (
      this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle ==
      this.contratForm.get('etat_contrat')?.value
    ) {
      this.fillNewValues();

      this.contratService
        .updateContrat(id, this.updatedEtatContrat)
        .subscribe((data: any) => {
          this.updatedEtatContrat = data;
        });
    } else if (
      this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle !=
      this.contratForm.get('etat_contrat')?.value
    ) {
      this.fillValuesupdate();
      this.contratService
        .updateContratNvEtat(
          id,
          this.updatedEtatContrat,
          this.NvEtatContrat,
          this.oldEtatContrat
        )
        .subscribe();
    }
  }
}