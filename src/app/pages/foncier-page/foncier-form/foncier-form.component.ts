import { Foncier } from './../../../models/Foncier';
import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { getPropWithLieuxAction } from './../foncier-store/foncier.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { getLieux, getProprietaires } from '../foncier-store/foncier.selector';
import { debounceTime, delay, map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { getCitiesAction } from 'src/app/store/shared/shared.action';
import { DOCUMENT } from '@angular/common';
import { getCities } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss'],
})
export class FoncierFormComponent implements OnInit, OnDestroy {
  @Input() formType!: string;
  @Input() foncier!: any;

  hasAmenagement: boolean = false;
  hasAmenagementCheck: string = '';
  file!: string;
  fd: FormData = new FormData();
  idm: any = JSON.stringify(Math.random());
  isAmenagementEmpty: boolean = true;
  imageExtension: string = '.pdf';
  selectedImagesLieuEntrer!: [];
  amenagementList: any = [];
  userMatricule: any = localStorage.getItem('matricule');
  cities!: any[];
  citiesSubscription$!: Subscription;

  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Locale ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Locale modifié avec succés';
  foncierForm!: FormGroup;

  proprietaires!: any;
  lieux!: any;
  lieuxSubscription$!: Subscription;
  proprietairesSubscription$!: Subscription;
  countriesSubscription$!: Subscription;

  cities!: any;
  countries!: any;

  userMatricule: any = localStorage.getItem('matricule');

  constructor(
    private foncierService: FoncierService,
    private store: Store<AppState>,
    private help: HelperService,
    private mainModalService: MainModalService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.foncierForm = new FormGroup({
      proprietaire: new FormControl(),
      type_foncier: new FormControl(),
      adresse: new FormControl(),
      description: new FormControl(),
      lieu: new FormControl(),
      assure: new FormControl(),
      etat_du_bien: new FormControl(),
      ville: new FormControl(),
      code_postal: new FormControl(),
      pays: new FormControl(),
      montant_loyer: new FormControl(),
      meuble_equipe: new FormControl(),
    });
    this.getCities();
    this.getProprietaires();
    this.getLieux();
    // this.getCountries()
    setTimeout(() => {
      // this.selectCountries();
    }, 500);
  }

  fetchCities() {
    this.store.dispatch(getCitiesAction());
  }

  getCities() {
    this.citiesSubscription$ = this.store
      .select(getCities)
      .subscribe((data) => {
        if (data) this.cities = data;
        if (data.length == 0) this.fetchCities();
      });
  }

  ngOnChanges() {
    if (this.foncier !== '' && this.foncier !== undefined) {
      setTimeout(() => {
        this.fetchFc('Default');
      }, 200);
    }
  }

  fetchFc(HasAmenagement: string) {
    this.removeAllAmenagement();

    this.foncierForm.patchValue({
      proprietaire: this.foncier.proprietaire,
      type_foncier: this.foncier.type_foncier,
      adresse: this.foncier.adresse,
      description: this.foncier.description,
      lieu: this.foncier.lieu,
      assure: this.foncier.assure,
      etat_du_bien: this.foncier.etat_du_bien,
      ville: this.foncier.ville,
      code_postal: this.foncier.code_postal,
      pays: this.foncier.pays,
      montant_loyer: this.foncier.montant_loyer,
      meuble_equipe: this.foncier.meuble_equipe,
    });

    this.amenagementList = this.Lieu.amenagement;

    //amenagement inputs
    this.Lieu.amenagement.forEach((amenagementControl: any) => {
      let formGroupAmenagement = this.addAmenagement(
        'OldAmng',
        amenagementControl.deleted
      );

      formGroupAmenagement.controls.idm.setValue(amenagementControl.idm);

      formGroupAmenagement.controls.images_apres_travaux.setValue(
        amenagementControl.images_apres_travaux
      );

      formGroupAmenagement.controls.croquis_travaux.setValue(
        amenagementControl.croquis_travaux
      );

      formGroupAmenagement.controls.nature_amenagement.setValue(
        amenagementControl.nature_amenagement
      );

      formGroupAmenagement.controls.montant_amenagement.setValue(
        amenagementControl.montant_amenagement
      );

      formGroupAmenagement.controls.valeur_nature_chargeProprietaire.setValue(
        amenagementControl.valeur_nature_chargeProprietaire
      );

      formGroupAmenagement.controls.valeur_nature_chargeFondation.setValue(
        amenagementControl.valeur_nature_chargeFondation
      );

      formGroupAmenagement.controls.numero_facture.setValue(
        amenagementControl.numero_facture
      );

      formGroupAmenagement.controls.numero_bon_commande.setValue(
        amenagementControl.numero_bon_commande
      );

      formGroupAmenagement.controls.date_passation_commande.setValue(
        amenagementControl.date_passation_commande
      );

      formGroupAmenagement.controls.evaluation_fournisseur.setValue(
        amenagementControl.evaluation_fournisseur
      );

      formGroupAmenagement.controls.date_fin_travaux.setValue(
        amenagementControl.date_fin_travaux
      );

      formGroupAmenagement.controls.date_livraison_local.setValue(
        amenagementControl.date_livraison_local
      );

      formGroupAmenagement.controls.deleted.setValue(
        amenagementControl.deleted
      );

      if (amenagementControl.fournisseur.length !== 0) {
        for (let FourniseurControl of amenagementControl.fournisseur) {
          let formGroupFournisseur = new FormGroup({
            nom: new FormControl(''),
            prenom: new FormControl(''),
            amenagement_effectue: new FormControl(''),
            deleted: new FormControl(''),
            NewOrOld: new FormControl('old'),
          });

          (<FormArray>formGroupAmenagement.controls.fournisseur).push(
            <FormGroup>formGroupFournisseur
          );

          formGroupFournisseur.controls.nom.setValue(FourniseurControl.nom);

          formGroupFournisseur.controls.prenom.setValue(
            FourniseurControl.prenom
          );

          formGroupFournisseur.controls.amenagement_effectue.setValue(
            FourniseurControl.amenagement_effectue
          );

          formGroupFournisseur.controls.deleted.setValue(
            FourniseurControl.deleted
          );
        }
      }

      if (!amenagementControl.deleted) {
        this.hasAmenagement = true;
      }
    });

    if (HasAmenagement == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = '';
      this.drForm.patchValue({
        has_amenagements: this.hasAmenagement,
      });
    } else {
      if (HasAmenagement != 'Default') {
        this.hasAmenagement = false;
        this.hasAmenagementCheck = 'ButtonNon';
        this.drForm.patchValue({
          has_amenagements: this.hasAmenagement,
        });
      }
    }
  }

  // Amenagement
  addAmenagement(NewOrOld: string, deleted: boolean) {
    const amenagementData = new FormGroup({
      idm: new FormControl(''),
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
      images_apres_travaux_files: new FormControl(''),
      images_apres_travaux: new FormControl(''),
      croquis_travaux_files: new FormControl(''),
      croquis_travaux: new FormControl(''),
      deleted: new FormControl(deleted),
      NewOrOld: new FormControl(NewOrOld),
    });

    (<FormArray>this.drForm.get('amenagementForm')).push(
      <FormGroup>amenagementData
    );

    return <FormGroup>amenagementData;
  }

  removeAmenagement(index: number) {
    // (<FormArray>this.drForm.get('amenagementForm')).removeAt(index)

    let Amenagement = <FormArray>this.drForm.get('amenagementForm');

    if (Amenagement.value[index].NewOrOld == 'NewAmng') {
      (<FormArray>this.drForm.get('amenagementForm')).removeAt(index);
    } else {
      let element = this.document.getElementById(
        'deleted ' + index
      ) as HTMLInputElement;

      element.value = 'True';
      this.document.getElementById(index.toString())?.classList.add('d-none');
      Amenagement.value[index].deleted = true;
    }
  }

  removeAllAmenagement() {
    (<FormArray>this.drForm.get('amenagementForm')).clear();
  }

  // FournisseurData
  addFournisseur(amenagementForm: any, index: number, NewOrOld: string) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
      deleted: new FormControl(''),
      NewOrOld: new FormControl(NewOrOld),
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(
      <FormGroup>fournisseurData
    );

    return <FormGroup>fournisseurData;
  }

  removeFournisseur(
    amenagementForm: any,
    indexAmng: number,
    indexFourn: number
  ) {
    let fournisseur = <FormArray>(
      amenagementForm.controls[indexAmng].controls.fournisseur
    );

    if (fournisseur.value[indexFourn].NewOrOld == 'New') {
      (<FormArray>(
        amenagementForm.controls[indexAmng].controls.fournisseur
      )).removeAt(indexFourn);
    } else {
      let element = this.document.getElementById(
        'deleted ' + indexAmng + ' ' + indexFourn.toString()
      ) as HTMLInputElement;
      element.value = 'True';
      fournisseur.value[indexFourn].deleted = 'true';
    }
  }

  getFournisseur(amenagementForm: any, i: number) {
    return amenagementForm.controls[i].controls.fournisseur.controls;
  }

  hasAmengmnt(HasAmng: string) {
    if (HasAmng == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = '';
    } else {
      this.hasAmenagement = false;
      this.hasAmenagementCheck = 'ButtonNon';
    }
  }

  //Upload Image amenagement après amenagement
  onFileSelectedAmenagement(event: any, index: number) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (!this.update) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_amenagement', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_amenagement', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm !== undefined) {
        this.file = this.Lieu.amenagement[index]?.idm + this.imageExtension;
        this.fd.append('imgs_amenagement', this.selectedFile, this.file);
      }
    }
  }

  //Upload Croquis
  onFileSelectedCroquis(event: any, index: number) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (!this.update) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm !== undefined) {
        this.file = this.Lieu.amenagement[index]?.idm + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
    }
  }

  //Upload Image amenagement avant amenagement
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('imgs_lieu_entrer', this.selectedFile);
    }
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  addFoncier() {
    let foncier: Foncier = {
      proprietaire: this.foncierForm.get('proprietaire')?.value,
      type_foncier: this.foncierForm.get('type_foncier')?.value,
      adresse: this.foncierForm.get('adresse')?.value,
      description: this.foncierForm.get('description')?.value,
      lieu: this.foncierForm.get('lieu')?.value,
      assure: this.foncierForm.get('assure')?.value,
      etat_du_bien: this.foncierForm.get('etat_du_bien')?.value,
      ville: this.foncierForm.get('ville')?.value,
      code_postal: this.foncierForm.get('code_postal')?.value,
      pays: this.foncierForm.get('pays')?.value,
      montant_loyer: this.foncierForm.get('montant_loyer')?.value,
      meuble_equipe: this.foncierForm.get('meuble_equipe')?.value,
    };
    this.fd.append('data', JSON.stringify(foncier));
    this.foncierService.addFoncier(this.fd, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.foncierForm.reset();
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
    );
  }

  updateFoncier() {
    let id = this.foncier._id;

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck == 'ButtonNon') {
      this.isAmenagementEmpty = false;
    } else {
      this.drForm.get('amenagementForm')?.value.forEach((element: any) => {
        if (!element.deleted) {
          this.isAmenagementEmpty = true;
        }
      });
    }
    this.selectedImagesLieuEntrer = this.Lieu.imgs_lieu_entrer;

    let foncier: Foncier = {
      proprietaire: this.foncierForm.get('proprietaire')?.value,
      type_foncier: this.foncierForm.get('type_foncier')?.value,
      adresse: this.foncierForm.get('adresse')?.value,
      description: this.foncierForm.get('description')?.value,
      lieu: this.foncierForm.get('lieu')?.value,
      assure: this.foncierForm.get('assure')?.value,
      etat_du_bien: this.foncierForm.get('etat_du_bien')?.value,
      ville: this.foncierForm.get('ville')?.value,
      code_postal: this.foncierForm.get('code_postal')?.value,
      pays: this.foncierForm.get('pays')?.value,
      montant_loyer: this.foncierForm.get('montant_loyer')?.value,
      meuble_equipe: this.foncierForm.get('meuble_equipe')?.value,
      has_amenagements: this.isAmenagementEmpty,
      imgs_lieu_entrer: this.selectedImagesLieuEntrer,

      // Amenagment
      amenagement: this.foncierForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(foncier));

    this.foncierService
      .updateFoncier(this.fd, foncier, this.userMatricule)
      .subscribe(
        (_) => {
          this.updateDone = true;
          setTimeout(() => {
            this.foncierForm.reset();
            this.updateDone = false;
            this.mainModalService.close();
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

  // Get Proprietaire With Lieux Ids from the server
  getPropWithLieux() {
    this.store.dispatch(getPropWithLieuxAction());
  }

  // Select Proprietaire ids
  getProprietaires() {
    this.proprietairesSubscription$ = this.store
      .select(getProprietaires)
      .pipe(debounceTime(500))
      .subscribe((data) => {
        if (data) this.proprietaires = data;
        if (!data) this.getPropWithLieux();
      });
  }

  // Select Lieux ids
  getLieux() {
    this.lieuxSubscription$ = this.store.select(getLieux).subscribe((data) => {
      if (data) this.lieux = data;
      if (!data) this.getPropWithLieux();
    });
  }
  
  ngOnDestroy() {
    if (this.lieuxSubscription$) this.lieuxSubscription$.unsubscribe();
    if (this.proprietairesSubscription$)
      this.proprietairesSubscription$.unsubscribe();
    if (this.citiesSubscription$) this.citiesSubscription$.unsubscribe();
  }

  get amenagementForm(): FormArray {
    return (<FormArray>this.siegeForm.get('amenagementForm'));
  }
}
