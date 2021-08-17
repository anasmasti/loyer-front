import { getLieuxByType } from './../../lieux-page/lieux-store/lieux.selector';
import { getLieuxAction } from './../../lieux-page/lieux-store/lieux.actions';
import { AppState } from 'src/app/store/app.state';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Contrat } from 'src/app/models/Contrat';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { getLieux } from '../../lieux-page/lieux-store/lieux.selector';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss'],
})
export class FormContratComponent implements OnInit {
  // whitch form to load
  @Input() formType!: string;
  //incomming contrat from list in update case
  @Input() contrat?: any;
  //incomming id from list (test)
  idContrat: String = '';
  //etat selectionner dans le form
  etat: string = '';
  //display the alert in success case
  success: boolean = false;
  //message displayed on alert
  msg: string = '';
  //lieux and proprietaires list to fill up drop down lists on form
  lieux!: any;
  foncier!: any;
  selectedFile!: File;
  fd: FormData = new FormData();

  montantLoyer: number = 0
  montantApresImpot: number = 0
  hasDeclarationOption: string = 'non'
  retenueSource: number = 0
  tauxImpot: number = 0

  contratForm!: FormGroup
  etatContrat!: FormGroup

  //objet contrat (je stock les form data dans cet objet pour l'envoyer comme paramaitre au service)
  Contrat!: Contrat;

  date_debut_loyer!: Date;
  date_fin_contrat!: Date;
  date_fin_avance!: Date;
  date_reprise_caution!: Date;
  date_1er_paiement!: Date;
  etat_contrat!: String;
  date_resiliation!: Date;
  date_suspension!: Date;
  updatedContrat: any = {};
  NvEtatContrat: any = {};
  oldEtatContrat: any = {};

  typeLieu!: any
  lieuxByType: any = []

  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private store: Store<AppState>
  ) { }

  ngOnChanges() {
    if (this.formType != '') {
      if (this.contrat.length != 0) {
        setTimeout(() => {
          this.idContrat = this.contrat._id;
          // this.fillUpContrat();
          this.date_debut_loyer = this.contrat.date_debut_loyer;
          this.date_fin_contrat = this.contrat.date_fin_contrat;
          this.date_fin_avance = this.contrat.date_fin_avance;
          this.date_reprise_caution = this.contrat.date_reprise_caution;
          this.date_1er_paiement = this.contrat.date_premier_paiement;
          this.etat_contrat =
            this.contrat.etat_contrat[
              this.contrat.etat_contrat.length - 1
            ].libelle;
          this.date_resiliation =
            this.contrat.etat_contrat[
              this.contrat.etat_contrat.length - 1
            ].etat.date_resiliation;
          this.date_suspension =
            this.contrat.etat_contrat[
              this.contrat.etat_contrat.length - 1
            ].etat.date_suspension;
        }, 300);
      }
    }

    this.getLieuxByType()
  }

  ngOnInit(): void {
    this.contratForm = new FormGroup({
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

    this.getLieux();
  }

 

  checkRetenue() {
    let montantLoyerForYear = (this.montantLoyer * 12)
    let tauxImpot: number = 0
    let montantApresImpot: number = 0
    let result: number = 0

    if (this.hasDeclarationOption === 'non') {
      if (montantLoyerForYear <= 30000) {
        result = 0
        montantApresImpot = montantLoyerForYear
        tauxImpot = 0
      }
      if (montantLoyerForYear > 30000 && montantLoyerForYear <= 120000) {
        result = (montantLoyerForYear * 10) / 100
        montantApresImpot = (montantLoyerForYear - result) / 12
        tauxImpot = 10
      }
      if (montantLoyerForYear > 120000) {
        result = (montantLoyerForYear * 15) / 100
        montantApresImpot = (montantLoyerForYear - result) / 12
        tauxImpot = 15
      }
    }
    if (this.hasDeclarationOption === 'oui') {
      result = 0
      montantApresImpot = montantLoyerForYear
      tauxImpot = 0
    }
    this.retenueSource = result
    this.montantApresImpot = montantApresImpot
    this.tauxImpot = tauxImpot

    return result
  }

  //----------------- Update and Post  --------------------------

  //functions
  closeModal() {
    this.mainModalService.close();
  }

  getLieux() {
    // Select lieux from store
    this.store.select(getLieux).subscribe((data) => {
      // Check if lieux data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get lieux from server effect
        this.store.dispatch(getLieuxAction());
      }
      this.lieux = data;
    });
  }

  getLieuxByType() {
    // Select Lieux by type from store
    if (this.typeLieu) {
      this.store.select(getLieuxByType, {
        type_lieu: this.typeLieu
      }).subscribe((data) => {
        this.lieuxByType = data;
        console.log(this.lieuxByType);
      });
    }
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

  ShowEtat() {
    this.etat_contrat = this.contratForm.value.etat_contrat;
  }

  //----------------- FIN update && post  -------------------------------------------------------------------------------------------------

  //----------------- Ajouter nouveau Contrat Functions ----------------------------------------------------------------------------


   //Upload Image amenagement avant amenagement
   onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('piece_joint_contrat', this.selectedFile);
    }
  }

  addNewContrat() {
    let ctr_data: any = {

      date_debut_loyer: this.contratForm.get('date_debut_loyer')?.value,
      montant_loyer: this.contratForm.get('montant_loyer')?.value,
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
  
      // //etat de contrat
      // etat_contrat: this.contratForm.get('etat_contrat')?.value,
      
      // //AVENANT
      // N_avenant: this.etatContrat.get('N_avenant')?.value,
      // motif: this.etatContrat.get('motif')?.value,
      // montant_new_loyer: this.etatContrat.get('montant_new_loyer')?.value,
      // signaletique_successeur: this.etatContrat.get('signaletique_successeur')?.value,
  
      // //SUSPENSION
      // date_suspension: this.etatContrat.get('date_suspension')?.value,
      // duree_suspension: this.etatContrat.get('duree_suspension')?.value,
      // motif_suspension: this.etatContrat.get('motif_suspension')?.value,
  
      // //RESILIATION
      // date_resiliation: this.etatContrat.get('date_resiliation')?.value,
      // reprise_caution: this.etatContrat.get('reprise_caution')?.value,
      // etat_lieux_sortie: this.etatContrat.get('etat_lieux_sortie')?.value,
      // preavis: this.etatContrat.get('preavis')?.value,
    }

    this.fd.append('data', JSON.stringify(ctr_data));

    this.contratService.addContrat(this.fd).subscribe((data: any) => {
     // this.fd = data;
      console.log("form data ===> ",data);
      
      setTimeout(() => {
        this.contratForm.reset();
      }, 500);
    });
  }

  //----------------- FIN Ajouter nouveau Contrat Functions -------------------------------------------------------------------------------

  //-----------------  Modifier une Contrat Functions -----------------------------------------------------------------------------------


  // //remplissage de contrat form au cas de modification
  // fillUpContrat() {
  //   if (this.formType != '') {
  //     const id = this.idContrat;

  //     this.contratService.getSelectedContrat(id).subscribe((data: any) => {
  //       this.Contrat = data;
  //     });

  //     setTimeout(() => {
  //       this.contratForm.patchValue({
  //         Ncontrat_loyer: this.Contrat.numero_contrat,
  //         montant_loyer: this.Contrat.Montant_loyer,
  //         taxe_edilite_comprise_loyer: this.Contrat.taxe_edilite_loyer,
  //         taxe_edilite_noncomprise_loyer: this.Contrat.taxe_edilite_non_loyer,
  //         periodicite_paiement: this.Contrat.periodicite_paiement,
  //         duree_location: this.Contrat.duree_location,
  //         declaration_option: this.Contrat.declaration_option,
  //         taux_impot: this.Contrat.taux_impot,
  //         retenue_source: this.Contrat.retenue_source,
  //         montant_apres_impot: this.Contrat.montant_apres_impot,
  //         montant_caution: this.Contrat.montant_caution,
  //         effort_caution: this.Contrat.effort_caution,
  //         statut_caution: this.Contrat.statut_caution,
  //         montant_avance: this.Contrat.montant_avance,
  //         duree_avance: this.Contrat.duree_avance,
  //         echeance_revision_loyer: this.Contrat.echeance_revision_loyer,
  //         proprietaire: this.Contrat.proprietaire,
  //         type_lieu: this.Contrat.type_lieu,
  //         lieu: this.Contrat.lieu,
  //         etat_contrat:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1]
  //             .libelle,
  //         Nengagement_dépense: this.Contrat.N_engagement_depense,
  //       });
  //       this.etatContrat.patchValue({
  //         //AVENANT
  //         N_avenant:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .n_avenant,
  //         motif:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .motif,
  //         montant_new_loyer:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .montant_nouveau_loyer,
  //         signaletique_successeur:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .signaletique_successeur,

  //         //SUSPENSION
  //         intitule_lieu_sus:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .intitule_lieu,
  //         duree_suspension:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .duree_suspension,
  //         motif_suspension:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .motif_suspension,
  //         //RESILIATION
  //         intitule_lieu_res:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .intitule_lieu,
  //         reprise_caution:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .reprise_caution,
  //         etat_lieux_sortie:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .etat_lieu_sortie,
  //         preavis:
  //           this.Contrat.etat_contrat[this.Contrat.etat_contrat.length - 1].etat
  //             .preavis,
  //       });
  //     }, 500);
  //   }
  // }

  fillValuesupdated() {
    if (
      this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle ==
      this.contratForm.get('etat_contrat')?.value
    ) {
      console.log('in == ');
    } else if (
      this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle !=
      this.contratForm.get('etat_contrat')?.value
    ) {
      this.updatedContrat = {
        numero_contrat: this.contratForm.get('Ncontrat_loyer')?.value,
        date_debut_loyer: this.contratForm.get('date_debut_loyer')?.value,
        Montant_loyer: this.contratForm.get('montant_loyer')?.value,
        taxe_edilite_loyer: this.contratForm.get('taxe_edilite_comprise_loyer')
          ?.value,
        taxe_edilite_non_loyer: this.contratForm.get(
          'taxe_edilite_noncomprise_loyer'
        )?.value,
        periodicite_paiement: this.contratForm.get('periodicite_paiement')
          ?.value,
        date_fin_contrat: this.contratForm.get('date_fin_contrat')?.value,
        declaration_option: this.contratForm.get('declaration_option')?.value,
        taux_impot: this.contratForm.get('taux_impot')?.value,
        retenue_source: this.contratForm.get('retenue_source')?.value,
        montant_apres_impot: this.contratForm.get('montant_apres_impot')?.value,
        montant_caution: this.contratForm.get('montant_caution')?.value,
        effort_caution: this.contratForm.get('effort_caution')?.value,
        date_reprise_caution: this.contratForm.get('date_reprise_caution')
          ?.value,
        statut_caution: this.contratForm.get('statut_caution')?.value,
        montant_avance: this.contratForm.get('montant_avance')?.value,
        date_fin_avance: this.contratForm.get('date_fin_avance')?.value,
        date_premier_paiement: this.contratForm.get('date_1er_paiement')?.value,
        duree_avance: this.contratForm.get('duree_avance')?.value,
        echeance_revision_loyer: this.contratForm.get('echeance_revision_loyer')
          ?.value,
        proprietaire: this.contratForm.get('proprietaire')?.value,
        type_lieu: this.contratForm.get('type_lieu')?.value,
        N_engagement_depense: this.contratForm.get('Nengagement_dépense')
          ?.value,
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
            montant_nouveau_loyer:
              this.etatContrat.get('montant_new_loyer')?.value,
            signaletique_successeur: this.etatContrat.get(
              'signaletique_successeur'
            )?.value,
          },
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
          },
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
          },
        };
      }

      if (
        this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
          .libelle == 'Avenant'
      ) {
        this.oldEtatContrat = {
          libelle:
            this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
              .libelle,
          updated: true,
          etat: {
            //AVENANT
            n_avenant:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.n_avenant,
            motif:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.motif,
            montant_nouveau_loyer:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.montant_nouveau_loyer,
            signaletique_successeur:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.signaletique_successeur,
          },
        };
      }
      if (
        this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
          .libelle == 'Suspension'
      ) {
        this.oldEtatContrat = {
          libelle:
            this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
              .libelle,
          updated: true,
          etat: {
            //SUSPENSION
            intitule_lieu:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.intitule_lieu_sus,
            date_suspension:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.date_suspension,
            duree_suspension:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.duree_suspension,
            motif_suspension:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.motif_suspension,
          },
        };
      }
      if (
        this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
          .libelle == 'Résiliation'
      ) {
        this.oldEtatContrat = {
          libelle:
            this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
              .libelle,
          updated: true,
          etat: {
            intitule_lieu:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.intitule_lieu_res,
            date_resiliation:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.date_resiliation,
            reprise_caution:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.reprise_caution,
            etat_lieu_sortie:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.etat_lieux_sortie,
            preavis:
              this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1]
                .etat.preavis,
          },
        };
      }
    }
  }

  // updateContrat() {
  //   //sending request
  //   const id = this.idContrat;
  //   if (
  //     this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle ==
  //     this.contratForm.get('etat_contrat')?.value
  //   ) {
  //     this.fillNewValues();
  //     if (this.Contrat.etat_contrat.length > 1) {
  //       console.log(this.Contrat.etat_contrat);
  //     }
  //     this.contratService
  //       .updateContrat(id, this.Contrat)
  //       .subscribe((data: any) => {
  //         this.Contrat = data;
  //       });
  //   } else if (
  //     this.contrat.etat_contrat[this.contrat.etat_contrat.length - 1].libelle !=
  //     this.contratForm.get('etat_contrat')?.value
  //   ) {
  //     this.fillValuesupdated();
  //     this.contratService
  //       .updateContratNvEtat(
  //         id,
  //         this.updatedContrat,
  //         this.NvEtatContrat,
  //         this.oldEtatContrat
  //       )
  //       .subscribe();
  //   }
  // }
  //----------------- FIN Modifier une Contrat Functions -------------------------------------------------------------------------------------
}
