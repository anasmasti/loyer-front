import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '@services/helpers/helper.service';
import { SignaletiqueService } from '@services/signaletique.service';
import { Signaletique } from 'src/app/models/Signaletique';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() isUpdate!: boolean;
  @Input() signaletique!: any;

  signaletiqueForm: FormGroup;
  userMatricule: any = localStorage.getItem('matricule');
  isDoneMessage: string;
  hasErrorMessage: string;
  isActive: boolean;

  constructor(
    private signaletiqueService: SignaletiqueService,
    private help: HelperService
  ) {
    this.isDoneMessage = '';
    this.hasErrorMessage = '';
    this.isActive = false;
    this.signaletiqueForm = new FormGroup({
      raison_sociale: new FormControl('', Validators.required),
      if: new FormControl('', Validators.required),
      active: new FormControl(false),
      rib: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  scrollToTop() {
    this.help.scrollToTop();
  }

  addSignaletique() {
    let signaletique: Signaletique = this.signaletiqueForm.value;
    this.signaletiqueService
      .addSignaletique(signaletique, this.userMatricule)
      .subscribe(
        () => {
          this.scrollToTop();
          this.isDoneMessage = 'Signalétique ajoutée avec succée';
          this.signaletiqueForm.reset();
          setTimeout(() => {
            this.isDoneMessage = '';
          }, 3000);
        },
        ({ error }) => {
          this.scrollToTop();
          this.hasErrorMessage = error.message;
          setTimeout(() => {
            this.hasErrorMessage = '';
          }, 3000);
        }
      );
  }

  get raison_sociale() {
    return this.signaletiqueForm.get('raison_sociale');
  }
  get active() {
    return this.signaletiqueForm.get('active');
  }
  get ifv() {
    return this.signaletiqueForm.get('if');
  }
  get rib() {
    return this.signaletiqueForm.get('rib');
  }
  get adresse() {
    return this.signaletiqueForm.get('adresse');
  }
}