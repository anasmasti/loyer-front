import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Lieu } from 'src/app/models/Lieu';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from './../../../../services/main-modal/main-modal.service';

@Component({
  selector: 'siege-form',
  templateUrl: './siege-form.component.html',
  styleUrls: ['./siege-form.component.scss']
})
export class SiegeFormComponent implements OnInit {

  siegeForm!: FormGroup;
  postDone: boolean = false;
  PostSucces: string = 'Siège ajouté avec succés';
  UpdateDone: boolean = false;
  UpdateSucces: string = 'Siège modifié avec succés';
  errors!: any;
  hasAmenagement: boolean = false;
  hasAmenagementCheck: string = "";
  isAmenagementEmpty : boolean = true
  amenagementList: any = [];

  selectedFile!: File;
  file!: string;
  fd: FormData = new FormData();
  idm: any = JSON.stringify(Math.random());
  extension: string = '.zip';


  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;


  
    constructor(
      private siegeService: LieuxService ,
      private lieuService: LieuxService ,
      private mainModalService: MainModalService,
      private help: HelperService,
      @Inject(DOCUMENT) private document: Document
    ) { }



  ngOnChanges() {
    if ( this.Lieu !== "") {
      setTimeout(() => {
        this.fetchSg('Default');
      }, 100);
    }
  }



  ngOnInit(): void {

    this.siegeForm = new FormGroup({
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
      telephone: new FormControl(''),
      fax: new FormControl(''),
      superficie: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),

      //Aménagement
      amenagementForm: new FormArray([]),
    })
  }


  fetchSg(HasAmenagement : string) {
    

    this.removeAllAmenagement();

    this.siegeForm.patchValue({
      code_lieu: this.Lieu.code_lieu,
      intitule_lieu: this.Lieu.intitule_lieu,
      intitule_DR: this.Lieu.intitule_DR,
      adresse: this.Lieu.adresse,
      ville: this.Lieu.ville,
      code_localite: this.Lieu.code_localite,
      desc_lieu_entrer: this.Lieu.desc_lieu_entrer,
      // imgs_lieu_entrer: this.Lieu.imgs_lieu_entrer,
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
      this.Lieu.amenagement.forEach( ( LieuControl : any , index : any ) => {


          let formGroupAmenagement = this.addAmenagement('OldAmng' , LieuControl.deleted );
          
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
              
          formGroupAmenagement.controls.deleted.setValue(
            LieuControl.deleted
          );
                
                
            if (LieuControl.fournisseur.length !== 0) {
                  
              for (let  FourniseurControl  of LieuControl.fournisseur ) {
                    
                      
                  let formGroupFournisseur = new FormGroup({
                    nom: new FormControl(''),
                    prenom: new FormControl(''),
                    amenagement_effectue: new FormControl(''),
                    deleted: new FormControl('Test'),
                    NewOrOld : new FormControl('old',) ,
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
                            
                  formGroupFournisseur.controls.deleted.setValue(
                    FourniseurControl.deleted
                  );
                        
              }

            }
              
                if (!LieuControl.deleted) {
                  
                  this.hasAmenagement = true
                  
                }
              
      });

        if ( HasAmenagement == "Oui" ) {

          this.hasAmenagement = true;
          this.hasAmenagementCheck = ""
          this.siegeForm.patchValue({
            has_amenagements: this.hasAmenagement
          })
          
        }
        else{
          if ( HasAmenagement != "Default" ) {

            this.hasAmenagement = false;
            this.hasAmenagementCheck = "ButtonNon"            
            this.siegeForm.patchValue({
              has_amenagements: this.hasAmenagement
            })

          }
        }
  }



  // Amenagement
  addAmenagement(NewOrOld : string , deleted : boolean) {
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
      deleted: new FormControl(deleted,),
      NewOrOld : new FormControl(NewOrOld,) ,
    });

    (<FormArray>this.siegeForm.get('amenagementForm')).push(<FormGroup>amenagementData)

    return (<FormGroup>amenagementData)

  }



  removeAmenagement(index: number) {
    // (<FormArray>this.siegeForm.get('amenagementForm')).removeAt(index)

    let Amenagement = <FormArray>this.siegeForm.get('amenagementForm');
    
    if (Amenagement.value[index].NewOrOld == "NewAmng") {
      (<FormArray>this.siegeForm.get('amenagementForm')).removeAt(index)
      // console.log(Amenagement);

    }
    else{

    let element = this.document.getElementById('deleted ' + index ) as HTMLInputElement

    element.value = "True"
    this.document.getElementById( index.toString() )?.classList.add('d-none');
    Amenagement.value[index].deleted = true ;
    // Amenagement.controls[index].value.deleted = "true"
    console.log(Amenagement);
    }
  }


  removeAllAmenagement() {
    (<FormArray>this.siegeForm.get('amenagementForm')).clear();
  }



  // FournisseurData
  addFournisseur(amenagementForm: any, index: number,NewOrOld:string) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
      deleted: new FormControl(''),
      NewOrOld : new FormControl(NewOrOld,) ,
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(<FormGroup>fournisseurData)
  }



  removeFournisseur(amenagementForm: any, indexAmng: number ,indexFourn: number) {
    
    let fournisseur = <FormArray>amenagementForm.controls[indexAmng].controls.fournisseur ;

    if (fournisseur.value[indexFourn].NewOrOld == 'New') {

      (<FormArray>amenagementForm.controls[indexAmng].controls.fournisseur).removeAt(indexFourn)
      
    }
    else{

      let element = this.document.getElementById('deleted ' + indexAmng + ' ' + indexFourn.toString() ) as HTMLInputElement
      element.value = "True"
      fournisseur.value[indexFourn].deleted = "true";

    }


  }



  hasAmengmnt(HasAmng : string){
    if (HasAmng == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = ''
    }
    else{
      this.hasAmenagement = false;
      this.hasAmenagementCheck = 'ButtonNon'
    }
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
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
  async onFileSelectedAmenagement(event: any, index: number) {
    
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.file = (this.idm + index) + this.extension;
      await this.fd.append('imgs_amenagement', this.selectedFile, this.file);
    }
  }

  //Upload Croquis
  async onFileSelectedCroquis(event: any, index: number) {
    
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.file = (this.idm + index) + this.extension;
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
  
  onAddsiege() {
    let siegeData: Lieu = {
      code_lieu: this.siegeForm.get('code_lieu')?.value,
      intitule_lieu: this.siegeForm.get('intitule_lieu')?.value,
      intitule_DR: this.siegeForm.get('intitule_DR')?.value,
      adresse: this.siegeForm.get('adresse')?.value,
      ville: this.siegeForm.get('ville')?.value,
      code_localite: this.siegeForm.get('code_localite')?.value,
      desc_lieu_entrer: this.siegeForm.get('desc_lieu_entrer')?.value,
      // imgs_lieu_entrer: this.siegeForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.siegeForm.get('has_amenagements')?.value,
      superficie: this.siegeForm.get('superficie')?.value,
      telephone: this.siegeForm.get('telephone')?.value,
      fax: this.siegeForm.get('fax')?.value,
      etat_logement_fonction: this.siegeForm.get('etat_logement_fonction')?.value,
      etage: this.siegeForm.get('etage')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.siegeForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.siegeForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.siegeForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.siegeForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.siegeForm.get('categorie_pointVente')?.value,
    
      //Aménagement
        amenagement: this.siegeForm.get('amenagementForm')?.value,
    }

    this.fd.append('data', JSON.stringify(siegeData));
    console.log(siegeData);

      this.siegeService.addLieu(this.fd).subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            this.siegeForm.reset();
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



  updateSg() {

    let id = this.Lieu._id;

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck == "ButtonNon" ) {

      this.isAmenagementEmpty = false;
      
    }
    else{

      this.siegeForm.get('amenagementForm')?.value.forEach((element : any) => {

      if (!element.deleted) {

        this.isAmenagementEmpty = true;
        
      }
      
      
      }); 

    }

    let lfData: Lieu = {
      code_lieu: this.siegeForm.get('code_lieu')?.value,
      intitule_lieu: this.siegeForm.get('intitule_lieu')?.value,
      intitule_DR: this.siegeForm.get('intitule_DR')?.value,
      adresse: this.siegeForm.get('adresse')?.value,
      ville: this.siegeForm.get('ville')?.value,
      code_localite: this.siegeForm.get('code_localite')?.value,
      desc_lieu_entrer: this.siegeForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.siegeForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.isAmenagementEmpty,
      superficie: this.siegeForm.get('superficie')?.value,
      telephone: this.siegeForm.get('telephone')?.value,
      fax: this.siegeForm.get('fax')?.value,
      etat_logement_fonction: this.siegeForm.get('etat_logement_fonction')?.value,
      etage: this.siegeForm.get('etage')?.value,
      type_lieu: this.siegeForm.get('type_lieu')?.value,
      code_rattache_DR: this.siegeForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.siegeForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.siegeForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.siegeForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.siegeForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.siegeForm.get('amenagementForm')?.value,
    }

    console.log(lfData);
    

    this.lieuService.updateLieux(id , lfData).subscribe(
      (_) => {
        this.UpdateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.siegeForm.reset();
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



  get code_lieu(){
    return this.siegeForm.get('code_lieu');
  }

  get intitule_lieu(){
    return this.siegeForm.get('intitule_lieu');
  }

  get intitule_DR(){
    return this.siegeForm.get('intitule_DR');
  }

  get adresse(){
    return this.siegeForm.get('adresse');
  }

  get ville(){
    return this.siegeForm.get('ville');
  }

  get code_localite(){
    return this.siegeForm.get('code_localite');
  }

  get desc_lieu_entrer(){
    return this.siegeForm.get('desc_lieu_entrer');
  }

  get imgs_lieu_entrer(){
    return this.siegeForm.get('imgs_lieu_entrer');
  }

  get has_amenagements(){
    return this.siegeForm.get('has_amenagements');
  }

  get amenagements(){
    return this.siegeForm.get('amenagements');
  }

  get etat_logement_fonction(){
    return this.siegeForm.get('etat_logement_fonction');
  }

  get etage(){
    return this.siegeForm.get('etage');
  }

  get telephone(){
    return this.siegeForm.get('telephone');
  }

  get fax(){
    return this.siegeForm.get('fax');
  }

  get superficie(){
    return this.siegeForm.get('superficie');
  }

  get type_lieu(){
    return this.siegeForm.get('type_lieu');
  }

  get code_rattache_DR(){
    return this.siegeForm.get('code_rattache_DR');
  }

  get code_rattache_SUP(){
    return this.siegeForm.get('code_rattache_SUP');
  }

  get intitule_rattache_SUP_PV(){
    return this.siegeForm.get('intitule_rattache_SUP_PV');
  }

  get centre_cout_siege(){
    return this.siegeForm.get('centre_cout_siege');
  }

  get categorie_pointVente(){
    return this.siegeForm.get('categorie_pointVente');
  }


  get amenagementForm(): FormArray {
    return (<FormArray>this.siegeForm.get('amenagementForm'));
  }
}
