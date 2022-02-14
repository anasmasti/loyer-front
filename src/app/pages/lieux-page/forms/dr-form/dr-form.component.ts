import { Router } from '@angular/router';
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss'],
})
export class DrFormComponent implements OnInit, OnChanges {
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Direction régionale ajoutée avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Direction régionale modifiée avec succés';

  selectedFile!: File;
  drForm!: FormGroup;

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  userMatricule: any = localStorage.getItem('matricule');

  constructor(
    private lieuService: LieuxService,
    private mainModalService: MainModalService,
    private help: HelperService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchDr();
      }, 100);
    }
  }

  ngOnInit(): void {
    this.drForm = new FormGroup({
      code_lieu: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]*'),
      ]),
      intitule_lieu: new FormControl('', [Validators.required]),
      code_localite: new FormControl(''),
      telephone: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      fax: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      deleted: new FormControl(''),
    });
  }

  fetchDr() {
    this.drForm.patchValue({
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

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  //Add direction regional
  async addDR() {
    let dr_data: any = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      has_amenagements: this.drForm.get('has_amenagements')?.value,
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
    };

    this.lieuService.addLieu(dr_data, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.drForm.reset();
          this.postDone = false;
          this.router.navigate(['/lieux/list']).then(() => {
            this.help.refrechPage();
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

  //Patch Direction regional
  updateDR() {
    let id = this.Lieu._id;

    let dr_data: any = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      telephone: this.drForm.get('telephone')?.value,
      fax: this.drForm.get('fax')?.value,
      etage: this.drForm.get('etage')?.value,
      type_lieu: this.drForm.get('type_lieu')?.value,
      code_rattache_DR: this.drForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.drForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.drForm.get('code_lieu')?.value,
      centre_cout_siege: this.drForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.drForm.get('categorie_pointVente')?.value,
    };

    this.lieuService.updateLieux(id, dr_data, this.userMatricule).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.drForm.controls;
          this.mainModalService.close();
          this.updateDone = false;
          this.help.refrechPage();
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

  get code_lieu() {
    return this.drForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.drForm.get('intitule_lieu');
  }

  get code_localite() {
    return this.drForm.get('code_localite');
  }

  get telephone(): FormArray {
    return <FormArray>this.drForm.get('telephone');
  }

  get fax(): FormArray {
    return <FormArray>this.drForm.get('fax');
  }
}
