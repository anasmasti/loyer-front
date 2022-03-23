import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from './../../../../services/main-modal/main-modal.service';

@Component({
  selector: 'siege-form',
  templateUrl: './siege-form.component.html',
  styleUrls: ['./siege-form.component.scss']
})
export class SiegeFormComponent implements OnInit, OnChanges {

  siegeForm!: FormGroup;
  postDone: boolean = false;
  PostSucces: string = 'Siège ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Siège modifié avec succés';
  errors!: any;

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  userMatricule: any = localStorage.getItem('matricule')

  constructor(
    private siegeService: LieuxService,
    private lieuService: LieuxService,
    private mainModalService: MainModalService,
    private help: HelperService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchSg();
      }, 100);
    }
  }

  ngOnInit(): void {
    this.siegeForm = new FormGroup({
      code_lieu: new FormControl('',[Validators.required,Validators.maxLength(3),Validators.pattern('[0-9]*')]),
      intitule_lieu: new FormControl('',[Validators.required]),
      code_localite: new FormControl(''),
      etat_logement_fonction: new FormControl(''),
      telephone: new FormControl('',[Validators.pattern('[0-9]*'),Validators.maxLength(10)]),
      fax: new FormControl('',[Validators.pattern('[0-9]*'),Validators.maxLength(10)]),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      attached_DR: new FormControl(''),
      attached_SUP: new FormControl(''),
    })
  }

    // Check if all inputs has invalid errors
    checkInputsValidation(targetInput: any) {
      return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
    }

  fetchSg() {
    this.siegeForm.patchValue({
      code_lieu: this.Lieu.code_lieu,
      intitule_lieu: this.Lieu.intitule_lieu,
      code_localite: this.Lieu.code_localite,
      telephone: this.Lieu.telephone,
      fax: this.Lieu.fax,
      etat_logement_fonction: this.Lieu.etat_logement_fonction,
      type_lieu: this.Lieu.type_lieu,
      code_rattache_DR: this.Lieu.code_rattache_DR,
      code_rattache_SUP: this.Lieu.code_rattache_SUP,
      intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
      centre_cout_siege: this.Lieu.centre_cout_siege,
      categorie_pointVente: this.Lieu.categorie_pointVente,
      attached_DR: this.Lieu.attached_DR?._id,
      attached_SUP: this.Lieu.attached_SUP?._id,
    });
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  scrollToTop(){
    let element : HTMLElement = document.getElementById('form_content') as HTMLElement;    
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }

  onAddsiege() {
    let siegeData: any = {
      code_lieu: this.siegeForm.get('code_lieu')?.value,
      intitule_lieu: this.siegeForm.get('intitule_lieu')?.value, 
      code_localite: this.siegeForm.get('code_localite')?.value,
      telephone: this.siegeForm.get('telephone')?.value,
      fax: this.siegeForm.get('fax')?.value,
      etat_logement_fonction: this.siegeForm.get('etat_logement_fonction')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.siegeForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.siegeForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.siegeForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.siegeForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.siegeForm.get('categorie_pointVente')?.value,
      attached_DR: this.siegeForm.get('attached_DR')?.value || null,
      attached_SUP: this.siegeForm.get('attached_SUP')?.value || null,
    }

    this.siegeService.addLieu(siegeData, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.siegeForm.reset();
          this.postDone = false;
          this.router.navigate(['/lieux/list']).then(() => {
            this.help.refrechPage()
          });
        }, 3000);

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

    let sgData: any = {
      code_lieu: this.siegeForm.get('code_lieu')?.value,
      intitule_lieu: this.siegeForm.get('intitule_lieu')?.value,
      code_localite: this.siegeForm.get('code_localite')?.value,
      telephone: this.siegeForm.get('telephone')?.value,
      fax: this.siegeForm.get('fax')?.value,
      etat_logement_fonction: this.siegeForm.get('etat_logement_fonction')?.value,
      type_lieu: this.siegeForm.get('type_lieu')?.value,
      code_rattache_DR: this.siegeForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.siegeForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.siegeForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.siegeForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.siegeForm.get('categorie_pointVente')?.value,
      attached_DR: this.siegeForm.get('attached_DR')?.value || null,
      attached_SUP: this.siegeForm.get('attached_SUP')?.value || null,
    }

    this.lieuService.updateLieux(id, sgData, this.userMatricule).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.siegeForm.reset();
          this.updateDone = false;
          location.reload();
        }, 3000);
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

  get code_lieu() {
    return this.siegeForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.siegeForm.get('intitule_lieu');
  }

  get code_localite() {
    return this.siegeForm.get('code_localite');
  }

  get etat_logement_fonction() {
    return this.siegeForm.get('etat_logement_fonction');
  }

  get telephone() {
    return this.siegeForm.get('telephone');
  }

  get fax() {
    return this.siegeForm.get('fax');
  }

  get type_lieu() {
    return this.siegeForm.get('type_lieu');
  }

  get code_rattache_DR() {
    return this.siegeForm.get('code_rattache_DR');
  }

  get code_rattache_SUP() {
    return this.siegeForm.get('code_rattache_SUP');
  }

  get intitule_rattache_SUP_PV() {
    return this.siegeForm.get('intitule_rattache_SUP_PV');
  }

  get centre_cout_siege() {
    return this.siegeForm.get('centre_cout_siege');
  }

  get categorie_pointVente() {
    return this.siegeForm.get('categorie_pointVente');
  }
}
