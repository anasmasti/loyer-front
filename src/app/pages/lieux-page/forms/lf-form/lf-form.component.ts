import { Lieu } from 'src/app/models/Lieu';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';

@Component({
  selector: 'lf-form',
  templateUrl: './lf-form.component.html',
  styleUrls: ['./lf-form.component.scss'],
})
export class LfFormComponent implements OnInit {
  modalHeight: string = '40vh';
  hasAmenagement: boolean = false;
  etatLogement = '';
  // test1 = 'update';
  isReplace: string = '';
  amenagementList: any = [];
  @Input() update!: boolean;
  lF !: Lieu;
  LfForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Logement de fonction ajouté avec succés';

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private lieuService: LieuxService
  ) { }


  //////////////////////////////////////////////////////////////////////////////////
  showEtatLogement() {
    this.etatLogement = this.LfForm.value.etat_logement_fonction;
  }
  //////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.LfForm = new FormGroup({
      code_lieu: new FormControl(''),
      intitule_lieu: new FormControl(''),
      intitule_DR: new FormControl(''),
      adresse: new FormControl(''),
      ville: new FormControl(''),
      code_localite: new FormControl(''),
      desc_lieu_entrer: new FormControl(''),
      imgs_lieu_entrer: new FormControl(''),
      has_amenagements: new FormControl(''),
      etat_logement_fonction: new FormControl(''),
      etage: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      superficie: new FormControl('',),
      telephone: new FormControl('',),
      fax: new FormControl('',),

      //Directeur
      matricule_directeur: new FormControl(''),
      nom_directeur: new FormControl(''),
      prenom_directeur: new FormControl(''),
      deleted_directeur: new FormControl(''),

      //Aménagement
      amenagementForm: new FormArray([]),

    });
  }

  // Amenagement
  addAmenagement() {
    const amenagementData = new FormGroup({
      nature_amenagement: new FormControl(''),
      montant_amenagement: new FormControl(''),
      valeur_nature_chargeProprietaire: new FormControl(''),
      valeur_nature_chargeFondation: new FormControl(''),
      numero_facture: new FormControl(''),
      numero_bon_commande: new FormControl(''),
      date_passation_commande: new FormControl(''),
      evaluation_fournisseur: new FormControl(''),
      date_fin_travaux: new FormControl(''),
      date_livraison_local: new FormControl(''),
      fournisseur: new FormArray([]),
      images_local_apres_amenagement: new FormControl(''),
      croquis_amenagement_via_imagerie: new FormControl(''),
    });

    (<FormArray>this.LfForm.get('amenagementForm')).push(<FormGroup>amenagementData)

  }
  removeAmenagement(index: number) {
    (<FormArray>this.LfForm.get('amenagementForm')).removeAt(index)
  }


  // FournisseurData
  addFournisseur(amenagementForm: any, index: number) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(<FormGroup>fournisseurData)
  }

  removeFournisseur(amenagementForm: any, index: number) {
    (<FormArray>amenagementForm.controls[index].controls.fournisseur).removeAt(index)
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
  }

  //////////////////////////////////////////////////////////////////////////////////
  openReplaceModal(active: any) {
    this.isReplace = active;
    this.mainModalService.open();
    // this.confirmationModalService.open();

  }
  //////////////////////////////////////////////////////////////////////////////////
  closeReplaceModal() {
    // this.isReplace = false;
    this.mainModalService.close();
  }
  //////////////////////////////////////////////////////////////////////////////////
  openConfirmationModal() {
    this.confirmationModalService.open();
  }
  //////////////////////////////////////////////////////////////////////////////////
  openUpdate() {
    this.mainModalService.open();
  }
  //////////////////////////////////////////////////////////////////////////////////
  closeConfirmationModal() {
    this.confirmationModalService.close();
    // this.isReplace='';
  }
  //////////////////////////////////////////////////////////////////////////////////
  switchIsReplace() {
    this.isReplace = '';
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }


  //////////////////////////////////////////////////////////////////////////////////
  addLf() {
    let lfData: Lieu = {
      code_lieu: this.LfForm.get('code_lieu')?.value,
      intitule_lieu: this.LfForm.get('intitule_lieu')?.value,
      intitule_DR: this.LfForm.get('intitule_DR')?.value,
      adresse: this.LfForm.get('adresse')?.value,
      ville: this.LfForm.get('ville')?.value,
      code_localite: this.LfForm.get('code_localite')?.value,
      desc_lieu_entrer: this.LfForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.LfForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.LfForm.get('has_amenagements')?.value,
      superficie: this.LfForm.get('superficie')?.value,
      telephone: this.LfForm.get('telephone')?.value,
      fax: this.LfForm.get('fax')?.value,
      etat_logement_fonction: this.LfForm.get('etat_logement_fonction')?.value,
      etage: this.LfForm.get('etage')?.value,
      type_lieu: this.LfForm.get('type_lieu')?.value,
      code_rattache_DR: this.LfForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.LfForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.LfForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.LfForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.LfForm.get('categorie_pointVente')?.value,

      // Directeur
      directeur_regional: [
        {
          matricule: this.LfForm.get('matricule_directeur')?.value,
          nom: this.LfForm.get('nom_directeur')?.value,
          prenom: this.LfForm.get('prenom_directeur')?.value,
        }
      ],

      // Amenagement
      amenagement: this.LfForm.get('amenagementForm')?.value,

    }

    this.lieuService.addLieu(lfData).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.LfForm.reset();
          this.postDone = false;
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    )
  }
  //////////////////////////////////////////////////////////////////////////////////
  fetchLf() {
    if (this.lF.has_amenagements) {
      this.hasAmenagement = true;
      this.amenagementList = this.lF.amenagement;
      this.LfForm.patchValue({
        code_lieu: this.lF.code_lieu,
        intitule_lieu: this.lF.intitule_lieu,
        intitule_DR: this.lF.intitule_DR,
        adresse: this.lF.adresse,
        ville: this.lF.ville,
        code_localite: this.lF.code_localite,
        desc_lieu_entrer: this.lF.desc_lieu_entrer,
        imgs_lieu_entrer: this.lF.imgs_lieu_entrer,
        has_amenagements: this.lF.has_amenagements,
        superficie: this.lF.superficie,
        telephone: this.lF.telephone,
        fax: this.lF.fax,
        etat_logement_fonction: this.lF.etat_logement_fonction,
        etage: this.lF.etage,
        type_lieu: this.lF.type_lieu,
        code_rattache_DR: this.lF.code_rattache_DR,
        code_rattache_SUP: this.lF.code_rattache_SUP,
        intitule_rattache_SUP_PV: this.lF.intitule_rattache_SUP_PV,
        centre_cout_siege: this.lF.centre_cout_siege,
        categorie_pointVente: this.lF.categorie_pointVente,
        //amenagement inputs
        nature_amenagement: this.amenagementList.nature_amenagement,
        montant_amenagement: this.amenagementList.montant_amenagement,
        valeur_nature_chargeProprietaire: this.amenagementList.valeur_nature_chargeProprietaire,
        valeur_nature_chargeFondation: this.amenagementList.valeur_nature_chargeFondation,
        numero_facture: this.amenagementList.numero_facture,
        numero_bon_commande: this.amenagementList.numero_bon_commande,
        date_passation_commande: this.amenagementList.date_passation_commande,
        evaluation_fournisseur: this.amenagementList.evaluation_fournisseur,
        date_fin_travaux: this.amenagementList.date_fin_travaux,
        date_livraison_local: this.amenagementList.date_livraison_local,
      });
    } else {
      this.hasAmenagement = false;
      this.LfForm.patchValue({
        code_lieu: this.lF.code_lieu,
        intitule_lieu: this.lF.intitule_lieu,
        intitule_DR: this.lF.intitule_DR,
        adresse: this.lF.adresse,
        ville: this.lF.ville,
        code_localite: this.lF.code_localite,
        desc_lieu_entrer: this.lF.desc_lieu_entrer,
        imgs_lieu_entrer: this.lF.imgs_lieu_entrer,
        has_amenagements: this.lF.has_amenagements,
        superficie: this.lF.superficie,
        telephone: this.lF.telephone,
        fax: this.lF.fax,
        etat_logement_fonction: this.lF.etat_logement_fonction,
        etage: this.lF.etage,
        type_lieu: this.lF.type_lieu,
        code_rattache_DR: this.lF.code_rattache_DR,
        code_rattache_SUP: this.lF.code_rattache_SUP,
        intitule_rattache_SUP_PV: this.lF.intitule_rattache_SUP_PV,
        centre_cout_siege: this.lF.centre_cout_siege,
        categorie_pointVente: this.lF.categorie_pointVente,
        // amenagement inputs
        nature_amenagement: '',
        montant_amenagement: '',
        valeur_nature_chargeP: '',
        valeur_nature_chargeF: '',
        numero_facture: '',
        numero_bon_commande: '',
        date_passation_commande: '',
        evaluation_fournisseur: '',
        date_fin_travaux: '',
        date_livraison_local: '',
      });
    }
  }
  //////////////////////////////////////////////////////////////////////////////////
  onUpdateLf() {
    let idlf = this.lF._id;
    let lfData: Lieu = {
      code_lieu: this.LfForm.get('code_lieu')?.value,
      intitule_lieu: this.LfForm.get('intitule_lieu')?.value,
      intitule_DR: this.LfForm.get('intitule_DR')?.value,
      adresse: this.LfForm.get('adresse')?.value,
      ville: this.LfForm.get('ville')?.value,
      code_localite: this.LfForm.get('code_localite')?.value,
      desc_lieu_entrer: this.LfForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.LfForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.LfForm.get('has_amenagements')?.value,
      superficie: this.LfForm.get('superficie')?.value,
      telephone: this.LfForm.get('telephone')?.value,
      fax: this.LfForm.get('fax')?.value,
      etat_logement_fonction: this.LfForm.get('etat_logement_fonction')?.value,
      etage: this.LfForm.get('etage')?.value,
      type_lieu: this.LfForm.get('type_lieu')?.value,
      code_rattache_DR: this.LfForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.LfForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.LfForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.LfForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.LfForm.get('categorie_pointVente')?.value,

      amenagement: [{
        nature_amenagement: this.LfForm.get('nature_amenagement')?.value,
        montant_amenagement: this.LfForm.get('montant_amenagement')?.value,
        valeur_nature_chargeProprietaire: this.LfForm.get('valeur_nature_chargeProprietaire')?.value,
        valeur_nature_chargeFondation: this.LfForm.get('valeur_nature_chargeFondation')?.value,
        numero_facture: this.LfForm.get('numero_facture')?.value,
        numero_bon_commande: this.LfForm.get('numero_bon_commande')?.value,
        date_passation_commande: this.LfForm.get('date_passation_commande')?.value,
        evaluation_fournisseur: this.LfForm.get('evaluation_fournisseur')?.value,
        date_fin_travaux: this.LfForm.get('date_fin_travaux')?.value,
        date_livraison_local: this.LfForm.get('date_livraison_local')?.value,
      }]
    }

    this.lieuService.updateLieux('idlf', lfData).subscribe((_) => {
      console.log(this.lF._id)

    })
  }
  //////////////////////////////////////////////////////////////////////////////////
  get code_lieu() {
    return this.LfForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.LfForm.get('intitule_lieu');
  }

  get intitule_DR() {
    return this.LfForm.get('intitule_DR');
  }

  get adresse() {
    return this.LfForm.get('adresse');
  }

  get ville() {
    return this.LfForm.get('ville');
  }

  get code_localite() {
    return this.LfForm.get('code_localite');
  }

  get desc_lieu_entrer() {
    return this.LfForm.get('desc_lieu_entrer');
  }

  get imgs_lieu_entrer() {
    return this.LfForm.get('imgs_lieu_entrer');
  }

  get has_amenagement() {
    return this.LfForm.get('has_amenagement');
  }

  get superficie() {
    return this.LfForm.get('superficie');
  }

  get telephone() {
    return this.LfForm.get('telephone');
  }

  get fax() {
    return this.LfForm.get('fax');
  }

  get etat_logement_fonction() {
    return this.LfForm.get('etat_logement_fonction');
  }

  get etage() {
    return this.LfForm.get('etage');
  }

  get type_lieu() {
    return this.LfForm.get('type_lieu');
  }

  get code_rattache_DR() {
    return this.LfForm.get('code_rattache_DR');
  }

  get code_rattache_SUP() {
    return this.LfForm.get('code_rattache_SUP');
  }

  get intitule_rattache_SUP_PV() {
    return this.LfForm.get('intitule_rattache_SUP_PV');
  }

  get centre_cout_siege() {
    return this.LfForm.get('centre_cout_siege');
  }

  get amenagementForm(): FormArray {
    return (<FormArray>this.LfForm.get('amenagementForm'));
  }

}
