import { getDrWithSupAction } from './../../lieux-store/lieux.actions';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Lieu } from 'src/app/models/Lieu';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { AppState } from 'src/app/store/app.state';
import { MainModalService } from '../../../../services/main-modal/main-modal.service';
import { getDr } from '../../lieux-store/lieux.selector';
import { Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'lf-form',
  templateUrl: './lf-form.component.html',
  styleUrls: ['./lf-form.component.scss'],
})
export class LfFormComponent implements OnInit, OnChanges, OnDestroy {
  modalHeight: string = '40vh';
  hasAmenagement: boolean = false;
  hasAmenagementCheck: string = '';
  etatLogement = '';
  isReplace: string = '';
  amenagementList: any = [];
  Dr$!: Observable<any>;
  DrSubscription$!: Subscription;
  lieux: Lieu[] = [];
  isAmenagementEmpty: boolean = true;
  FullNameDerct: string = '';
  fd: FormData = new FormData();

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  DirecteurForm!: FormGroup;
  lF!: Lieu;
  LfForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Logement de fonction ajouté avec succés';
  UpdateDone: boolean = false;
  UpdateSucces: string = 'Logement de fonction modifié avec succés';

  selectedFile!: File;
  file!: string;
  idm: any = JSON.stringify(Math.random());
  extension: string = '.zip';

  constructor(
    private mainModalService: MainModalService,
    private mainModel: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private help: HelperService,
    private lieuService: LieuxService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchLf('Default');
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

    // directeur_regional: [
    //   {
    //     matricule: 'Chargement...',
    //     nom: 'Chargement...',
    //     prenom: 'Chargement...',
    //     deleted: false
    //   }
    // ],

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

        fournisseur: [
          {
            nom: 'Chargement...',
            prenom: 'Chargement...',
            amenagement_effectue: 'Chargement...',
            deleted: false,
          },
        ],
      },
    ],
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
      superficie: new FormControl(''),
      telephone: new FormControl(''),
      fax: new FormControl(''),

      //Directeur
      matricule_directeur: new FormControl(''),
      nom_directeur: new FormControl(''),
      prenom_directeur: new FormControl(''),
      deleted_directeur: new FormControl(''),

      directeur_regional: new FormArray([]),

      //Aménagement
      amenagementForm: new FormArray([]),
    });

    this.getDr();
  }

  fetchLf(HasAmenagement: string) {
    console.log(this.Lieu);

    this.removeAllAmenagement();
    this.RemoveAllDericteurs();

    this.etatLogement = this.Lieu.etat_logement_fonction;

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
    });

    // Directeur
    this.Lieu.directeur_regional.forEach((directeur: any) => {
      let NewDirecteur = this.addDirecteur();

      NewDirecteur.controls.matricule.setValue(directeur.matricule);
      NewDirecteur.controls.nom.setValue(directeur.nom);
      NewDirecteur.controls.prenom.setValue(directeur.prenom);
      NewDirecteur.controls.deleted_directeur.setValue(
        directeur.deleted_directeur
      );

      if (!directeur.deleted_directeur) {
        this.LfForm.patchValue({
          // directeur_regional
          matricule_directeur: directeur.matricule,
          nom_directeur: directeur.nom,
          prenom_directeur: directeur.prenom,
          deleted_directeur: false,
        });

        this.FullNameDerct = directeur.nom + ' ' + directeur.prenom;

        // (<FormGroup>DirecteurData).controls.matricule_directeur.setValue(directeur.matricule)
      }
    });
    console.log('Test');

    console.log(this.LfForm.controls.directeur_regional);

    // Amenagement
    this.amenagementList = this.Lieu.amenagement;
    //amenagement inputs
    this.Lieu.amenagement.forEach((LieuControl: any, index: any) => {
      let formGroupAmenagement = this.addAmenagement(
        'OldAmng',
        LieuControl.deleted
      );

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

      formGroupAmenagement.controls.deleted.setValue(LieuControl.deleted);

      if (LieuControl.fournisseur.length !== 0) {
        for (let FourniseurControl of LieuControl.fournisseur) {
          let formGroupFournisseur = new FormGroup({
            nom: new FormControl(''),
            prenom: new FormControl(''),
            amenagement_effectue: new FormControl(''),
            deleted: new FormControl('Test'),
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

      if (!LieuControl.deleted) {
        this.hasAmenagement = true;
      }
    });

    if (HasAmenagement == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = '';
      this.LfForm.patchValue({
        has_amenagements: this.hasAmenagement,
      });
    } else {
      if (HasAmenagement != 'Default') {
        this.hasAmenagement = false;
        this.hasAmenagementCheck = 'ButtonNon';
        this.LfForm.patchValue({
          has_amenagements: this.hasAmenagement,
        });
      }
    }
  }

  addDirecteur() {
    const DirecteurData = new FormGroup({
      matricule: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      deleted_directeur: new FormControl(''),
    });

    (<FormArray>this.LfForm.get('directeur_regional')).push(
      <FormGroup>DirecteurData
    );

    return <FormGroup>DirecteurData;
  }

  RemoveAllDericteurs() {
    (<FormArray>this.LfForm.get('directeur_regional')).clear();
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
      images_local_apres_amenagement: new FormControl(''),
      croquis_amenagement_via_imagerie: new FormControl(''),
      deleted: new FormControl(deleted),
      NewOrOld: new FormControl(NewOrOld),
    });

    (<FormArray>this.LfForm.get('amenagementForm')).push(
      <FormGroup>amenagementData
    );

    return <FormGroup>amenagementData;
  }

  removeAmenagement(index: number) {
    // (<FormArray>this.LfForm.get('amenagementForm')).removeAt(index)
    let Amenagement = <FormArray>this.LfForm.get('amenagementForm');

    if (Amenagement.value[index].NewOrOld == 'NewAmng') {
      (<FormArray>this.LfForm.get('amenagementForm')).removeAt(index);
      // console.log(Amenagement);
    } else {
      let element = this.document.getElementById(
        'deleted ' + index
      ) as HTMLInputElement;

      element.value = 'True';
      this.document.getElementById(index.toString())?.classList.add('d-none');
      Amenagement.value[index].deleted = true;
      // Amenagement.controls[index].value.deleted = "true"
      console.log(Amenagement);
    }
  }

  removeAllAmenagement() {
    (<FormArray>this.LfForm.get('amenagementForm')).clear();
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

  RemplacerDirecteur() {
    let Matricule = (
      document.getElementById('Mat_directeur') as HTMLInputElement
    ).value;
    let Nom = (document.getElementById('Nom_directeur') as HTMLInputElement)
      .value;
    let Prenom = (
      document.getElementById('Prenom_directeur') as HTMLInputElement
    ).value;

    this.LfForm.patchValue({
      etat_logement_fonction: 'occupe',
      // directeur_regional
      matricule_directeur: Matricule,
      nom_directeur: Nom,
      prenom_directeur: Prenom,
      deleted_directeur: false,
    });

    this.etatLogement = 'occupe';

    this.LfForm.get('directeur_regional')?.value.forEach((directeur: any) => {
      directeur.deleted_directeur = true;
    });

    let NewDirecteur = this.addDirecteur();

    NewDirecteur.controls.matricule.setValue(Matricule);
    NewDirecteur.controls.nom.setValue(Nom);
    NewDirecteur.controls.prenom.setValue(Prenom);
    NewDirecteur.controls.deleted_directeur.setValue(false);

    this.confirmationModalService.close();

    this.isReplace = '';

    this.FullNameDerct = Nom + ' ' + Prenom;

    console.log(this.LfForm.get('directeur_regional')?.value);
  }

  ModifierDirecteur() {
    this.LfForm.get('directeur_regional')?.value.forEach((directeur: any) => {
      if (!directeur.deleted_directeur) {
        directeur.matricule = this.LfForm.get('matricule_directeur')?.value;
        directeur.nom = this.LfForm.get('nom_directeur')?.value;
        directeur.prenom = this.LfForm.get('prenom_directeur')?.value;

        this.LfForm.patchValue({
          // directeur_regional
          matricule_directeur: directeur.matricule,
          nom_directeur: directeur.nom,
          prenom_directeur: directeur.prenom,
        });

        this.FullNameDerct = directeur.nom + ' ' + directeur.prenom;
      }
    });

    this.isReplace = '';

    console.log(this.LfForm.get('directeur_regional')?.value);
  }

  SupprimerDirecteur() {
    this.LfForm.get('directeur_regional')?.value.forEach((directeur: any) => {
      if (!directeur.deleted_directeur) {
        directeur.deleted_directeur = true;
      }

      this.LfForm.patchValue({
        etat_logement_fonction: 'disponible',
        matricule_directeur: '',
        nom_directeur: '',
        prenom_directeur: '',
        deleted_directeur: false,
      });
    });

    this.etatLogement = 'disponible';

    this.confirmationModalService.close();
  }

  //////////////////////////////////////////////////////////////////////////////////
  openReplaceModal(active: any) {
    this.isReplace = active;
    // this.mainModel.open();
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

  //Upload Image amenagement après amenagement
  async onFileSelectedAmenagement(event: any, index: number) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.file = this.idm + index + this.extension;
      await this.fd.append('imgs_amenagement', this.selectedFile, this.file);
    }
  }

  //Upload Croquis
  async onFileSelectedCroquis(event: any, index: number) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.file = this.idm + index + this.extension;
      await this.fd.append('imgs_croquis', this.selectedFile, this.file);
    }
  }

  //Upload Image amenagement avant amenagement
  async onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      await this.fd.append('imgs_lieu_entrer', this.selectedFile);
    }
  }

  //Post files
  async addFiles() {
    await this.lieuService.uploadFile(this.fd).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
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
      type_lieu: this.LieuName,
      code_rattache_DR: this.LfForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.LfForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.LfForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.LfForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.LfForm.get('categorie_pointVente')?.value,

      // Directeur
      directeur_regional: [
        {
          matricule: this.LfForm.get('matricule_directeur')?.value,
          nom: this.LfForm.get('nom_directeur')?.value,
          prenom: this.LfForm.get('prenom_directeur')?.value,
        },
      ],

      // Amenagement
      amenagement: this.LfForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(lfData));
    console.log('lfData ==> ',lfData);

    this.lieuService.addLieu(this.fd).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.LfForm.reset();
          this.postDone = false;
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

  //////////////////////////////////////////////////////////////////////////////////

  updateLf() {
    let idlf = this.Lieu._id;

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck == 'ButtonNon') {
      this.isAmenagementEmpty = false;
    } else {
      this.LfForm.get('amenagementForm')?.value.forEach((element: any) => {
        if (!element.deleted) {
          this.isAmenagementEmpty = true;
        }
      });
    }

    let lfData: any = {
      code_lieu: this.LfForm.get('code_lieu')?.value,
      intitule_lieu: this.LfForm.get('intitule_lieu')?.value,
      intitule_DR: this.LfForm.get('intitule_DR')?.value,
      adresse: this.LfForm.get('adresse')?.value,
      ville: this.LfForm.get('ville')?.value,
      code_localite: this.LfForm.get('code_localite')?.value,
      desc_lieu_entrer: this.LfForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.LfForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.isAmenagementEmpty,
      superficie: this.LfForm.get('superficie')?.value,
      telephone: this.LfForm.get('telephone')?.value,
      fax: this.LfForm.get('fax')?.value,
      etat_logement_fonction: this.LfForm.get('etat_logement_fonction')?.value,
      etage: this.LfForm.get('etage')?.value,
      type_lieu: this.LfForm.get('type_lieu')?.value,
      code_rattache_DR: this.LfForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.LfForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.LfForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.LfForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.LfForm.get('categorie_pointVente')?.value,

      // Directeur
      directeur_regional: this.LfForm.get('directeur_regional')?.value,

      // Amenagement
      amenagement: this.LfForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(lfData));
    console.log(JSON.stringify(lfData));

    this.lieuService.updateLieux(idlf, this.fd).subscribe(
      (_) => {
        this.UpdateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.LfForm.reset();
          this.UpdateDone = false;
          // location.reload();
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

  // Get Dr and Sup from the server
  getDrSup() {
    return this.store.dispatch(getDrWithSupAction());
  }

  // Select Dr
  getDr() {
    this.Dr$ = this.store.select(getDr);
    this.Dr$.subscribe((data) => {
      if (!data?.length) {
        this.getDrSup();
      }
    });
  }

  ngOnDestroy() {
    if (this.DrSubscription$) this.DrSubscription$.unsubscribe();
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
    return <FormArray>this.LfForm.get('amenagementForm');
  }
}
