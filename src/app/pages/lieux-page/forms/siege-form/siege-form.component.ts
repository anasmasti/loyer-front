import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Lieu } from 'src/app/models/Lieu';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';

@Component({
  selector: 'siege-form',
  templateUrl: './siege-form.component.html',
  styleUrls: ['./siege-form.component.scss']
})
export class SiegeFormComponent implements OnInit {

  hasAmenagement: boolean = false;
  siegeForm!: FormGroup;
  postDone: boolean = false;
  errors!: any;
  Updatesuccess: string = 'Siège modifié avec succés';
  PostSucces: string = 'Siège ajouté avec succés';

  constructor(private siegeService: LieuxService) { }

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

    (<FormArray>this.siegeForm.get('amenagementForm')).push(<FormGroup>amenagementData)

  }

  removeAmenagement(index: number) {
    (<FormArray>this.siegeForm.get('amenagementForm')).removeAt(index)
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

  
   // Afficher le message d'erreur de serveur
   showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
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
      imgs_lieu_entrer: this.siegeForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.siegeForm.get('has_amenagements')?.value,
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
    
      //Aménagement
        amenagement: this.siegeForm.get('amenagementForm')?.value,
    }

      this.siegeService.addLieu(siegeData).subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            this.siegeForm.reset();
            this.postDone = false;
          }, 2000);
          console.log(siegeData);
          
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
