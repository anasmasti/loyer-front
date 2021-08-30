import { HelperService } from 'src/app/services/helpers/helper.service';
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
import { getFonciers } from '../../foncier-page/foncier-store/foncier.selector';
import { getFoncierAction } from '../../foncier-page/foncier-store/foncier.actions';

@Component({
  selector: 'app-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss'],
})
export class FormContratComponent implements OnInit {
  // whitch form to load
  @Input() update!: boolean;
  //incomming contrat from list in update case
  @Input() contrat?: any;
  //incomming id from list (test)
  idContrat: String = '';
  //etat selectionner dans le form
  etat: string = '';

  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Contrat ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Contrat modifié avec succés';

  foncier!: any;
  selectedFile!: File;
  fd: FormData = new FormData();

  montantLoyer: number = 0
  montantApresImpot: number = 0
  hasDeclarationOption: string = 'non'
  retenueSource: number = 0
  tauxImpot: number = 0

  contratForm!: FormGroup

  etatContratTypes!: string

  typeLieuList: any = [
    {
      'type': 'Direction régionale'
    },
    {
      'type': 'Logement de fonction'
    },
    {
      'type': 'Point de vente'
    },
    {
      'type': 'Siège'
    },
    {
      'type': 'Supervision'
    }
  ]
  lieuxByType: any = []

  updateLieu: boolean = false
  updateFoncier: boolean = false

  constructor(
    private contratService: ContratService,
    private mainModalService: MainModalService,
    private help: HelperService,
    private store: Store<AppState>
  ) { }

  ngOnChanges() {
    if (this.update) {
      this.fetchContrat()
    }
  }

  ngOnInit(): void {
    // this.etatContratTypes = 'Avenant'
    this.contratForm = new FormGroup({
      numero_contrat:new FormControl(),
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
      n_engagement_depense: new FormControl(),
      echeance_revision_loyer: new FormControl(),
      foncier: new FormControl(),
      type_lieu: new FormControl(),
      lieu: new FormControl(),

      // Etat
      etat_contrat_libelle: new FormControl(),
      etat_contrat_n_avenant: new FormControl(),
      etat_contrat_motif: new FormControl(),
      etat_contrat_montant_nouveau_loyer: new FormControl(),
      etat_contrat_signaletique_successeur: new FormControl(),
      etat_contrat_intitule_lieu: new FormControl(),
      etat_contrat_date_suspension: new FormControl(),
      etat_contrat_duree_suspension: new FormControl(),
      etat_contrat_motif_suspension: new FormControl(),
      etat_contrat_reprise_caution: new FormControl(),
      etat_contrat_date_resiliation: new FormControl(),
      etat_contrat_etat_lieu_sortie: new FormControl(),
      etat_contrat_preavis: new FormControl(),
      etat_contrat_images_etat_res_lieu_sortie: new FormControl(),
      etat_contrat_lettre_res_piece_jointe: new FormControl(),
      etat_contrat_piece_jointe_avenant: new FormControl(),

      // Validation
      validation1_DMG: new FormControl(),
      validation2_DAJC: new FormControl(),
    });

    this.getFoncier()
  }

  calculMontant() {
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
  }

  //----------------- Update and Post  --------------------------

  //functions
  closeModal() {
    this.mainModalService.close();
  }

  // Get lieux by type
  getLieuxByType(event: any) {
    let typeLieu = event.target.value;
    this.getAllLieux()
    // Select Lieux by type from store
    if (typeLieu.length !== 0) {
      this.store.select(getLieuxByType, {
        type_lieu: typeLieu
      }).subscribe((data) => {
        this.lieuxByType = data;
      });
    }
  }

  getAllLieux() {
    // Select lieux from store
    this.store.select(getLieux).subscribe((data) => {
      // Check if lieux data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get lieux from server effect
        this.store.dispatch(getLieuxAction());
      }
    });
  }

  getFoncier() {
    this.store.select(getFonciers).subscribe((data) => {
      if (data.length === 0) {
        this.store.dispatch(getFoncierAction());
      }
      this.foncier = data
    })
  }

  showEtatSection(event: any) {
    let selectedEtat = event.target.value
    this.etatContratTypes = selectedEtat
  }

  //----------------- FIN update && post  -------------------------------------------------------------------------------------------------

  //----------------- Ajouter nouveau Contrat Functions ----------------------------------------------------------------------------


  //Upload Image piece joint contrat
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('piece_joint_contrat', this.selectedFile);
    }
  }

   //Upload Image piece joint avenant
   onFileSelectedAvenant(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('piece_jointe_avenant', this.selectedFile);
    }
  }

   //Upload Image image lieu sortie resiliation
   onFileSelectedResLieuSortie(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('images_etat_res_lieu_sortie', this.selectedFile);
    }
  }

   //Upload Image lettre resiliation
   onFileSelectedLettreRes(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('lettre_res_piece_jointe', this.selectedFile);
    }
  }

  addNewContrat() {
    let ctr_data: any = {

      date_debut_loyer: this.contratForm.get('date_debut_loyer')?.value || '',
      montant_loyer: this.contratForm.get('montant_loyer')?.value || '',
      taxe_edilite_loyer: this.contratForm.get('taxe_edilite_comprise_loyer')?.value || '',
      taxe_edilite_non_loyer: this.contratForm.get('taxe_edilite_noncomprise_loyer')?.value || '',
      periodicite_paiement: this.contratForm.get('periodicite_paiement')?.value || '',
      date_fin_contrat: this.contratForm.get('date_fin_contrat')?.value || '',
      declaration_option: this.contratForm.get('declaration_option')?.value || '',
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,
      montant_caution: this.contratForm.get('montant_caution')?.value || '',
      effort_caution: this.contratForm.get('effort_caution')?.value || '',
      date_reprise_caution: this.contratForm.get('date_reprise_caution')?.value || '',
      statut_caution: this.contratForm.get('statut_caution')?.value || '',
      montant_avance: this.contratForm.get('montant_avance')?.value || '',
      date_fin_avance: this.contratForm.get('date_fin_avance')?.value || '',
      date_premier_paiement: this.contratForm.get('date_1er_paiement')?.value || '',
      duree_avance: this.contratForm.get('duree_avance')?.value || '',
      echeance_revision_loyer: this.contratForm.get('echeance_revision_loyer')?.value || '',
      foncier: this.contratForm.get('foncier')?.value || '',
      type_lieu: this.contratForm.get('type_lieu')?.value || '',
      n_engagement_depense: this.contratForm.get('n_engagement_depense')?.value || '',
      lieu: this.contratForm.get('lieu')?.value || '',
      duree_location: this.contratForm.get('duree_location')?.value || '',
    }

  
    

    this.fd.append('data', JSON.stringify(ctr_data));

    this.contratService.addContrat(this.fd).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.contratForm.reset();
          this.postDone = false
          this.help.toTheUp();
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    );
  };
  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }


  fetchContrat() {
    if (this.contrat) {
      this.contratForm?.patchValue({
        numero_contrat: this.contrat.numero_contrat,
        validation1_DMG:this.contrat.validation1_DMG,
        validation2_DAJC: this.contrat.validation2_DAJC,
        date_debut_loyer: this.contrat.date_debut_loyer,
        montant_loyer: this.contrat.montant_loyer,
        taxe_edilite_comprise_loyer: this.contrat.taxe_edilite_loyer,
        taxe_edilite_noncomprise_loyer: this.contrat.taxe_edilite_non_loyer,
        periodicite_paiement: this.contrat.periodicite_paiement,
        date_fin_contrat: this.contrat.date_fin_contrat,
        declaration_option: this.contrat.declaration_option,
        taux_impot: this.contrat.taux_impot,
        retenue_source: this.contrat.retenue_source,
        montant_apres_impot: this.contrat.montant_apres_impot,
        montant_caution: this.contrat.montant_caution,
        effort_caution: this.contrat.effort_caution,
        date_reprise_caution: this.contrat.date_reprise_caution,
        statut_caution: this.contrat.statut_caution,
        montant_avance: this.contrat.montant_avance,
        date_fin_avance: this.contrat.date_fin_avance,
        date_premier_paiement: this.contrat.date_premier_paiement,
        duree_avance: this.contrat.duree_avance,
        echeance_revision_loyer: this.contrat.echeance_revision_loyer,
        foncier: this.contrat.foncier?._id,
        // type_lieu: this.contrat.type_lieu,
        n_engagement_depense: this.contrat.n_engagement_depense,
        lieu: this.contrat.lieu?._id,
        duree_location: this.contrat.duree_location,

        etat_contrat_libelle: this.contrat.etat_contrat?.libelle,
        etat_contrat_n_avenant: this.contrat.etat_contrat?.etat?.n_avenant,
        etat_contrat_motif: this.contrat.etat_contrat?.etat?.motif,
        etat_contrat_montant_nouveau_loyer: this.contrat.etat_contrat?.etat?.montant_nouveau_loyer,
        etat_contrat_signaletique_successeur: this.contrat.etat_contrat?.etat?.signaletique_successeur,
        etat_contrat_intitule_lieu: this.contrat.etat_contrat?.etat?.intitule_lieu,
        etat_contrat_date_suspension: this.contrat.etat_contrat?.etat?.date_suspension,
        etat_contrat_duree_suspension: this.contrat.etat_contrat?.etat?.duree_suspension,
        etat_contrat_motif_suspension: this.contrat.etat_contrat?.etat?.motif_suspension,
        etat_contrat_reprise_caution: this.contrat.etat_contrat?.etat?.reprise_caution,
        etat_contrat_date_resiliation: this.contrat.etat_contrat?.etat?.date_resiliation,
        etat_contrat_etat_lieu_sortie: this.contrat.etat_contrat?.etat?.etat_lieu_sortie,
        etat_contrat_preavis: this.contrat.etat_contrat?.etat?.preavis,
        // etat_contrat_images_etat_res_lieu_sortie: this.contrat.etat_contrat?.etat?.images_etat_res_lieu_sortie,
        // etat_contrat_lettre_res_piece_jointe: this.contrat.etat_contrat?.etat?.lettre_res_piece_jointe,
        // etat_contrat_piece_jointe_avenant: this.contrat.etat_contrat?.etat?.piece_jointe_avenant,
      });
    }

    
  }

  updateContrat() {
    let id = this.contrat._id;

    let ctr_data: any = {
      
      numero_contrat: this.contratForm.get('numero_contrat')?.value || '',
      date_debut_loyer: this.contratForm.get('date_debut_loyer')?.value || '',
      montant_loyer: this.contratForm.get('montant_loyer')?.value || '',
      taxe_edilite_loyer: this.contratForm.get('taxe_edilite_comprise_loyer')?.value || '',
      taxe_edilite_non_loyer: this.contratForm.get('taxe_edilite_noncomprise_loyer')?.value || '',
      periodicite_paiement: this.contratForm.get('periodicite_paiement')?.value || '',
      date_fin_contrat: this.contratForm.get('date_fin_contrat')?.value || '',
      declaration_option: this.contratForm.get('declaration_option')?.value || '',
      taux_impot: this.tauxImpot,
      retenue_source: this.retenueSource,
      montant_apres_impot: this.montantApresImpot,
      montant_caution: this.contratForm.get('montant_caution')?.value || '',
      effort_caution: this.contratForm.get('effort_caution')?.value || '',
      date_reprise_caution: this.contratForm.get('date_reprise_caution')?.value || '',
      statut_caution: this.contratForm.get('statut_caution')?.value || '',
      montant_avance: this.contratForm.get('montant_avance')?.value || '',
      date_fin_avance: this.contratForm.get('date_fin_avance')?.value || '',
      date_premier_paiement: this.contratForm.get('date_1er_paiement')?.value || '',
      duree_avance: this.contratForm.get('duree_avance')?.value || '',
      echeance_revision_loyer: this.contratForm.get('echeance_revision_loyer')?.value || '',
      foncier: this.contratForm.get('foncier')?.value || '',
      type_lieu: this.contratForm.get('type_lieu')?.value || '',
      n_engagement_depense: this.contratForm.get('n_engagement_depense')?.value || '',
      lieu: this.contratForm.get('lieu')?.value || '',
      duree_location: this.contratForm.get('duree_location')?.value || '',

      //etat de contrat
      etat_contrat: {
        libelle: this.contratForm.get('etat_contrat_libelle')?.value || 'En cours',
        etat: {
          n_avenant: this.contratForm.get('etat_contrat_n_avenant')?.value || '',
          motif: this.contratForm.get('etat_contrat_motif')?.value || '',
          montant_nouveau_loyer: this.contratForm.get('etat_contrat_montant_nouveau_loyer')?.value || '',
          signaletique_successeur: this.contratForm.get('etat_contrat_signaletique_successeur')?.value || '',
          intitule_lieu: this.contratForm.get('etat_contrat_intitule_lieu')?.value || '',
          date_suspension: this.contratForm.get('etat_contrat_date_suspension')?.value || '',
          duree_suspension: this.contratForm.get('etat_contrat_duree_suspension')?.value || '',
          motif_suspension: this.contratForm.get('etat_contrat_motif_suspension')?.value || '',
          reprise_caution: this.contratForm.get('etat_contrat_reprise_caution')?.value || '',
          date_resiliation: this.contratForm.get('etat_contrat_date_resiliation')?.value || '',
          etat_lieu_sortie: this.contratForm.get('etat_contrat_etat_lieu_sortie')?.value || '',
          preavis: this.contratForm.get('etat_contrat_preavis')?.value || '',
          images_etat_res_lieu_sortie: this.contratForm.get('etat_contrat_images_etat_res_lieu_sortie')?.value || '',
          lettre_res_piece_jointe: this.contratForm.get('etat_contrat_lettre_res_piece_jointe')?.value || '',
          piece_jointe_avenant: this.contratForm.get('etat_contrat_piece_jointe_avenant')?.value || '',
        }
      },

      //Validation
      validation1_DMG: this.contratForm.get('validation1_DMG')?.value || false,
      validation2_DAJC:this.contratForm.get('validation2_DAJC')?.value || false,

    }

    this.fd.append('data', JSON.stringify(ctr_data));

    this.contratService.updateContrat(id, this.fd).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.updateDone = false;
          this.help.refrechPage();
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    );
  }
}
