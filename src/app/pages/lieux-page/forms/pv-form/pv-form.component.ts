import { AppState } from './../../../../store/app.state';
import { MainModalService } from './../../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../../services/confirmation-modal-service/confirmation-modal.service';
import { Lieu } from '../../../../models/Lieu';
import { LieuxService } from './../../../../services/lieux-service/lieux.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { getDrWithSupAction } from '../../lieux-store/lieux.actions';
import { getDr, getSup } from '../../lieux-store/lieux.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'pv-form',
  templateUrl: './pv-form.component.html',
  styleUrls: ['./pv-form.component.scss']
})
export class PvFormComponent implements OnInit, OnDestroy {

  hasAmenagement: boolean = false;
  PvForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Point de vente ajouté avec succés';
  UpdateDone: boolean = false;
  UpdateSucces: string = 'Point de vente modifié avec succés';
  amenagementList: any = [];
  Dr$!: Observable<any>;
  Sup$!: Observable<any>;
  DrSubscription$!: Subscription;
  SupSubscription$!: Subscription;

  @Input() update!: boolean;
  @Input() Lieu!: any;

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private lieuService: LieuxService,
    private store: Store<AppState>
  ) { }



  ngOnChanges() {
    if (this.Lieu !== "") {
      setTimeout(() => {
        this.fetchPv();
      }, 100);
    }
  }



  ngOnInit(): void {
    this.PvForm = new FormGroup({
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

      //Aménagement
      amenagementForm: new FormArray([]),
    })

    this.getDr()
    this.getSup()
  }


  fetchPv() {

    this.removeAllAmenagement();

    // this.etatLogement = this.Lieu.etat_logement_fonction;

    if (this.Lieu.has_amenagements) {
      this.hasAmenagement = true;
      this.amenagementList = this.Lieu.amenagement;
      this.PvForm.patchValue({
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
      });


      // Amenagement
      for (let LieuControl of this.Lieu.amenagement) {

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

            // console.log(formGroupAmenagement);

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
      this.PvForm.patchValue({
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

    (<FormArray>this.PvForm.get('amenagementForm')).push(<FormGroup>amenagementData)

    return (<FormGroup>amenagementData)

  }


  removeAmenagement(index: number) {
    (<FormArray>this.PvForm.get('amenagementForm')).removeAt(index)
  }


  removeAllAmenagement() {
    (<FormArray>this.PvForm.get('amenagementForm')).clear();
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



  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }



  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }



  addPv() {
    let pvData: Lieu = {
      code_lieu: this.PvForm.get('code_lieu')?.value,
      intitule_lieu: this.PvForm.get('intitule_lieu')?.value,
      intitule_DR: this.PvForm.get('intitule_DR')?.value,
      adresse: this.PvForm.get('adresse')?.value,
      ville: this.PvForm.get('ville')?.value,
      code_localite: this.PvForm.get('code_localite')?.value,
      desc_lieu_entrer: this.PvForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.PvForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.PvForm.get('has_amenagements')?.value,
      superficie: this.PvForm.get('superficie')?.value,
      telephone: this.PvForm.get('telephone')?.value,
      fax: this.PvForm.get('fax')?.value,
      etat_logement_fonction: this.PvForm.get('etat_logement_fonction')?.value,
      etage: this.PvForm.get('etage')?.value,
      type_lieu: this.PvForm.get('type_lieu')?.value,
      code_rattache_DR: this.PvForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.PvForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.PvForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.PvForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.PvForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.PvForm.get('amenagementForm')?.value,

    }

    this.lieuService.addLieu(pvData).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.PvForm.reset();
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



  updatePv() {
    let idlf = this.Lieu._id;
    let lfData: Lieu = {
      code_lieu: this.PvForm.get('code_lieu')?.value,
      intitule_lieu: this.PvForm.get('intitule_lieu')?.value,
      intitule_DR: this.PvForm.get('intitule_DR')?.value,
      adresse: this.PvForm.get('adresse')?.value,
      ville: this.PvForm.get('ville')?.value,
      code_localite: this.PvForm.get('code_localite')?.value,
      desc_lieu_entrer: this.PvForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.PvForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.PvForm.get('has_amenagements')?.value,
      superficie: this.PvForm.get('superficie')?.value,
      telephone: this.PvForm.get('telephone')?.value,
      fax: this.PvForm.get('fax')?.value,
      etat_logement_fonction: this.PvForm.get('etat_logement_fonction')?.value,
      etage: this.PvForm.get('etage')?.value,
      type_lieu: this.PvForm.get('type_lieu')?.value,
      code_rattache_DR: this.PvForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.PvForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.PvForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.PvForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.PvForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.PvForm.get('amenagementForm')?.value,
    }

    this.lieuService.updateLieux(idlf, lfData).subscribe(
      (_) => {
        this.UpdateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.PvForm.reset();
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

  // Get Dr and Sup from the server
  getDrSup() {
    this.store.dispatch(getDrWithSupAction())
  }
  // Select Dr
  getDr() {
    this.Dr$ = this.store.select(getDr)
    this.DrSubscription$ = this.Dr$.subscribe(data => {
      if (!data?.length) this.getDrSup()
    })
  }
  // Select Sup
  getSup() {
    this.Sup$ = this.store.select(getSup)
    this.SupSubscription$ = this.Sup$.subscribe(data => {
      if (!data?.length) this.getDrSup()
      console.log(data);

    })
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
  }

  ngOnDestroy() {
    if (this.DrSubscription$) this.DrSubscription$.unsubscribe()
    if (this.SupSubscription$) this.SupSubscription$.unsubscribe()
  }


  get amenagementForm(): FormArray {
    return (<FormArray>this.PvForm.get('amenagementForm'));
  }

}
