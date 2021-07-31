
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lieu } from 'src/app/models/Lieu';


import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { AppState } from 'src/app/store/app.state';
import { SharedState } from 'src/app/store/shared/shared.state';
import { MainModalService } from '../../../../services/main-modal/main-modal.service';
import { getCodeDr } from '../../lieux-store/lieux.selector';
import { LieuxState } from '../../lieux-store/lieux.state';

@Component({
  selector: 'lf-form',
  templateUrl: './lf-form.component.html',
  styleUrls: ['./lf-form.component.scss'],
})
export class LfFormComponent implements OnInit {
  modalHeight: string = '40vh';
  hasAmenagement: boolean = false;
  etatLogement = '';
  isReplace: string = '';
  amenagementList: any = [];
  codeDr: any;
  $lieux: Lieu[] = [];

  @Input() update!: boolean;
  @Input() Lieu!: any;

  lF !: Lieu;
  LfForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Logement de fonction ajouté avec succés';
  UpdateDone: boolean = false;
  UpdateSucces: string = 'Point de vente modifié avec succés';



  constructor(
    private mainModalService: MainModalService,
    private mainModel: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private lieuService: LieuxService,
    // private route: ActivatedRoute,
     private store: Store<SharedState>,
  ) { }



  ngOnChanges() {
    if (this.Lieu !== "") {
      setTimeout(() => {
        this.fetchLf();
      }, 100);
    }
  }


  lieu: Lieu = {
    _id: 'Chargement...',
    code_lieu: 'Chargement...',
    intitule_lieu: 'Chargement...',
    intitule_DR: 'Chargement...',
    adresse: 'Chargement...',
    ville: 'Chargement...',
    code_localite: 'Chargement...',
    desc_lieu_entrer: 'Chargement...',
    imgs_lieu_entrer: 'Chargement...',
    has_amenagements: false,
    superficie: 'Chargement...',
    telephone: 'Chargement...',
    fax: 'Chargement...',
    etat_logement_fonction: 'Chargement...',
    etage: 'Chargement...',
    type_lieu: 'Chargement...',
    code_rattache_DR: 'Chargement...',
    code_rattache_SUP: 'Chargement...',
    intitule_rattache_SUP_PV: 'Chargement...',
    centre_cout_siege: 'Chargement...',
    categorie_pointVente: 'Chargement...',
    deleted: false,

    directeur_regional: [
      {
        matricule: 'Chargement...',
        nom: 'Chargement...',
        prenom: 'Chargement...',
        deleted: false
      }
    ],

    amenagement: [
      {
        _id: 'Chargement...',
        nature_amenagement: 'Chargement...',
        montant_amenagement: 'Chargement...',
        valeur_nature_chargeProprietaire: 'Chargement...',
        valeur_nature_chargeFondation: 'Chargement...',
        numero_facture: 'Chargement...',
        numero_bon_commande: 'Chargement...',
        date_passation_commande: 'Chargement...',
        evaluation_fournisseur: 'Chargement...',
        date_fin_travaux: 'Chargement...',
        date_livraison_local: 'Chargement...',
        deleted: false,

        fournisseur: [{
          nom: 'Chargement...',
          prenom: 'Chargement...',
          amenagement_effectue: 'Chargement...',
          deleted: false,
        }]
      }
    ]

  };




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

  //  this.store.select(getCodeDr).subscribe((data) => {
    //  this.codeDr = data.code_rattache_DR
  //    console.log("Test =====",data)
  //  })

  // this.$lieux = this.lieuService.getLieux();
  // const $data = this.store.pipe(select(getCodeDr));
  // console.log("Test =====",$data);
  // console.log("Test Lieux =====",this.$lieux)

  this.store.select(getCodeDr).subscribe((data) => {
    this.$lieux = data
    console.log("Test Lieux =====",this.$lieux)
  })

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

    return (<FormGroup>amenagementData)

  }



  removeAmenagement(index: number) {
    (<FormArray>this.LfForm.get('amenagementForm')).removeAt(index)
  }



  removeAllAmenagement() {
    (<FormArray>this.LfForm.get('amenagementForm')).clear();
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
    this.mainModel.open();
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

    this.removeAllAmenagement();

    this.etatLogement = this.Lieu.etat_logement_fonction;


    if (this.Lieu.has_amenagements) {
      this.hasAmenagement = true;
      this.amenagementList = this.Lieu.amenagement;
      this.LfForm.patchValue({
        code_lieu: this.Lieu.code_lieu,
        intitule_lieu: this.Lieu.intitule_lieu,
        intitule_DR: this.Lieu.intitule_DR,
        adresse: this.Lieu.adresse,
        ville: this.Lieu.ville,
        code_localite: this.Lieu.code_localite,
        desc_lieu_entrer: this.Lieu.desc_lieu_entrer,
        imgs_lieu_entrer: this.Lieu.imgs_lieu_entrer,
        has_amenagements: this.Lieu.has_amenagements,
        superficie: this.Lieu.superficie,
        telephone: this.Lieu.telephone,
        fax: this.Lieu.fax,
        etat_logement_fonction: this.Lieu.etat_logement_fonction,
        etage: this.Lieu.etage,
        type_lieu: this.Lieu.type_lieu,
        code_rattache_DR: this.Lieu.code_rattache_DR,
        code_rattache_SUP: this.Lieu.code_rattache_SUP,
        intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
        centre_cout_siege: this.Lieu.centre_cout_siege,
        categorie_pointVente: this.Lieu.categorie_pointVente,
        
        
        // directeur_regional
        matricule_directeur: this.Lieu.directeur_regional.matricule,
        nom_directeur: this.Lieu.directeur_regional.nom,
        prenom_directeur: this.Lieu.directeur_regional.prenom,
      });
      
      
      // Amenagement
      for (let LieuControl of this.Lieu.amenagement ) {

        let formGroupAmenagement = this.addAmenagement();

        formGroupAmenagement.controls.nature_amenagement.setValue(
          LieuControl.nature_amenagement
        );

        formGroupAmenagement.controls.montant_amenagement.setValue(
          LieuControl.montant_amenagement
        );

        formGroupAmenagement.controls.valeur_nature_chargeProprietaire.setValue(
          LieuControl.valeur_nature_chargeProprietaire
        );

        formGroupAmenagement.controls.valeur_nature_chargeFondation.setValue(
          LieuControl.valeur_nature_chargeFondation
        );

        formGroupAmenagement.controls.numero_facture.setValue(
          LieuControl.numero_facture
        );

        formGroupAmenagement.controls.numero_bon_commande.setValue(
          LieuControl.numero_bon_commande
        );

        formGroupAmenagement.controls.date_passation_commande.setValue(
          LieuControl.date_passation_commande
        );

        formGroupAmenagement.controls.evaluation_fournisseur.setValue(
          LieuControl.evaluation_fournisseur
        );

        formGroupAmenagement.controls.date_fin_travaux.setValue(
          LieuControl.date_fin_travaux
        );

        formGroupAmenagement.controls.date_livraison_local.setValue(
          LieuControl.date_livraison_local
        );



        if (LieuControl.fournisseur.length !== 0) {
          for (let FourniseurControl of LieuControl.fournisseur) {

            let formGroupFournisseur = new FormGroup({
              nom: new FormControl(''),
              prenom: new FormControl(''),
              amenagement_effectue: new FormControl(''),
            });

            (<FormArray>formGroupAmenagement.controls.fournisseur).push(<FormGroup>formGroupFournisseur)

            formGroupFournisseur.controls.nom.setValue(
              FourniseurControl.nom
            );

            formGroupFournisseur.controls.prenom.setValue(
              FourniseurControl.prenom
            );

            formGroupFournisseur.controls.amenagement_effectue.setValue(
              FourniseurControl.amenagement_effectue
            );


          }
        }

      }
    } else {
      this.hasAmenagement = false;
      this.LfForm.patchValue({
        code_lieu: this.Lieu.code_lieu,
        intitule_lieu: this.Lieu.intitule_lieu,
        intitule_DR: this.Lieu.intitule_DR,
        adresse: this.Lieu.adresse,
        ville: this.Lieu.ville,
        code_localite: this.Lieu.code_localite,
        desc_lieu_entrer: this.Lieu.desc_lieu_entrer,
        imgs_lieu_entrer: this.Lieu.imgs_lieu_entrer,
        has_amenagements: this.Lieu.has_amenagements,
        superficie: this.Lieu.superficie,
        telephone: this.Lieu.telephone,
        fax: this.Lieu.fax,
        etat_logement_fonction: this.Lieu.etat_logement_fonction,
        etage: this.Lieu.etage,
        type_lieu: this.Lieu.type_lieu,
        code_rattache_DR: this.Lieu.code_rattache_DR,
        code_rattache_SUP: this.Lieu.code_rattache_SUP,
        intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
        centre_cout_siege: this.Lieu.centre_cout_siege,
        categorie_pointVente: this.Lieu.categorie_pointVente,
        
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
  updateLf() {
    let idlf = this.Lieu._id;
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

    this.lieuService.updateLieux(idlf, lfData).subscribe(
      (_) => {
        this.UpdateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.LfForm.reset();
          this.UpdateDone = false;
          location.reload();
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
