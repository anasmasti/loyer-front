import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'lf-form',
  templateUrl: './lf-form.component.html',
  styleUrls: ['./lf-form.component.scss'],
})
export class LfFormComponent implements OnInit {
  style: string = '40vh';
  isAmenag: boolean = false;
  etatLogement = '';
  test1 = 'update';
  isReplace!: string;
  @Output() replaceFunction = new EventEmitter<any>();
  @Input() update!: boolean;
  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  emitReplace(){

    this.replaceFunction.emit(this.isReplace);
  
  }

  LfForm: FormGroup = new FormGroup({
    code_lieu: new FormControl(''),
    intitule_lieu: new FormControl(''),
    intitule_DR: new FormControl(''),
    adresse: new FormControl(''),
    ville: new FormControl(''),
    code_localite: new FormControl(''),
    desc_lieu_entrer: new FormControl(''),
    imgs_lieu_entrer: new FormControl(''),
    has_amenagements: new FormControl(''),
    amenagements: new FormControl(''),
    etat_logement_fonction: new FormControl(''),
    etage: new FormControl(''),
    type_lieu: new FormControl(''),
    code_rattache_DR: new FormControl(''),
    code_rattahce_SUP: new FormControl(''),
    intitule_rattache_SUP_PV: new FormControl(''),
    centre_cout_siege: new FormControl(''),
    categorie_pointVente: new FormControl(''),
    //Directeur
    matricule_directeur: new FormControl(''),
    nom_directeur: new FormControl(''),
    prenom_directeur: new FormControl(''),
    //Aménagement
    nature_amenagement: new FormControl(''),
    montant_amenagement: new FormControl(''),
    valeur_nature_chargeProprietaire: new FormControl(''),
    valeur_nature_chargeFondation: new FormControl(''),
    numero_facture: new FormControl(''),
    numero_bon_commande: new FormControl(''),
    date_passation_commande: new FormControl(''),
    fournisseur: new FormControl(''),
    evaluation_fournisseur: new FormControl(''),
    date_fin_travaux: new FormControl(''),
    date_livraison_local: new FormControl(''),
    images_apres_travaux: new FormControl(''),
    images_croquis: new FormControl(''),
    superficie: new FormControl(''),
    telephone: new FormControl(''),
    fax: new FormControl(''),
  });

  showEtatLogement() {
    this.etatLogement = this.LfForm.value.etat_logement_fonction;
  }

  ngOnInit(): void {
    console.log(this.isReplace)
  }

  openReplaceModal(active:any) {
    this.isReplace = active;
    this.mainModalService.open();
    // this.confirmationModalService.open();
  }

  closeReplaceModal() {
    // this.isReplace = false;
    this.mainModalService.close();
  }

  openConfirmationModal() {
    this.confirmationModalService.open();
  }

  openUpdate() {
    this.mainModalService.open();
  }

  closeConfirmationModal() {
    this.confirmationModalService.close();
  }
}
