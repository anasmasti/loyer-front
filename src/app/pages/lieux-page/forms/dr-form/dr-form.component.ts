import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss'],
})
export class DrFormComponent implements OnInit {
  errors!: string;
  hasAmenagement: boolean = false;
  hasAmenagementCheck: string = '';

  postDone: boolean = false;
  PostSucces: string = 'Direction régionale ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Contrat modifié avec succés';
  
  selectedFile!: File;
  drForm!: FormGroup;
  file!: string;
  fd: FormData = new FormData();
  idm: any = JSON.stringify(Math.random());
  isAmenagementEmpty: boolean = true;
  imageExtension: string = '.zip';

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;
  amenagementList: any = [];
  LfForm!: FormGroup;
  selectedImagesLieuEntrer!: [];

  constructor(
    private lieuService: LieuxService,
    private mainModalService: MainModalService,
    private help: HelperService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchDr('Default');
      }, 100);
    }
  }

  ngOnInit(): void {
    this.drForm = new FormGroup({
      code_lieu: new FormControl(''),
      intitule_lieu: new FormControl(''),
      // intitule_DR: new FormControl('',),
      adresse: new FormControl(''),
      ville: new FormControl(''),
      code_localite: new FormControl(''),
      desc_lieu_entrer: new FormControl(''),
      imgs_lieu_entrer: new FormControl(''),
      has_amenagements: new FormControl(''),
      superficie: new FormControl(''),
      telephone: new FormControl(''),
      fax: new FormControl(''),
      etage: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      deleted: new FormControl(''),

      //Aménagement
      amenagementForm: new FormArray([]),
    });
  }

  fetchDr(HasAmenagement: string) {
    this.removeAllAmenagement();

    this.drForm.patchValue({
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

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  //Upload Image amenagement après amenagement
  onFileSelectedAmenagement(event: any, index: number) {
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

      console.log("FormData ==> ",this.fd);
      

     
      
    }
  }

  async addDR() {
    let dr_data: any = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      has_amenagements: this.drForm.get('has_amenagements')?.value,
      superficie: this.drForm.get('superficie')?.value,
      telephone: this.drForm.get('telephone')?.value,
      fax: this.drForm.get('fax')?.value,
      etage: this.drForm.get('etage')?.value,
      // type_lieu: this.drForm.get('type_lieu')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.drForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.drForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.drForm.get('code_lieu')?.value,
      centre_cout_siege: this.drForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.drForm.get('categorie_pointVente')?.value,

      // Amenagment
      amenagement: this.drForm.get('amenagementForm')?.value,
    };
    this.fd.append('data', JSON.stringify(dr_data));

    this.lieuService.addLieu(this.fd).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.drForm.reset();
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

  updateDR() {
    let id = this.Lieu._id;

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

    let dr_data: any = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      has_amenagements: this.isAmenagementEmpty,
      superficie: this.drForm.get('superficie')?.value,
      telephone: this.drForm.get('telephone')?.value,
      fax: this.drForm.get('fax')?.value,
      etage: this.drForm.get('etage')?.value,
      type_lieu: this.drForm.get('type_lieu')?.value,
      code_rattache_DR: this.drForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.drForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.drForm.get('code_lieu')?.value,
      centre_cout_siege: this.drForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.drForm.get('categorie_pointVente')?.value,
      imgs_lieu_entrer: this.selectedImagesLieuEntrer,

      // Amenagment
      amenagement: this.drForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(dr_data));

    this.lieuService.updateLieux(id, this.fd).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.drForm.controls;
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

  get code_lieu() {
    return this.drForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.drForm.get('intitule_lieu');
  }

  get adresse() {
    return this.drForm.get('adresse');
  }

  get code_localite() {
    return this.drForm.get('code_localite');
  }

  get desc_lieu_entrer() {
    return this.drForm.get('desc_lieu_entrer');
  }

  get amenagementForm(): FormArray {
    return <FormArray>this.drForm.get('amenagementForm');
  }
}
