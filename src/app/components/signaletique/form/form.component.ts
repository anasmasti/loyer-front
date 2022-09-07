import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '@services/helpers/helper.service';
import { MainModalService } from '@services/main-modal/main-modal.service';
import { SignaletiqueService } from '@services/signaletique.service';
import { Signaletique } from 'src/app/models/Signaletique';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() isUpdate!: boolean;
  @Input() signaletique!: Signaletique;

  signaletiqueForm: FormGroup;
  userMatricule: any = localStorage.getItem('matricule');
  isDoneMessage: string;
  hasErrorMessage: string;
  isActive: boolean;

  constructor(
    private signaletiqueService: SignaletiqueService,
    private mainModalService: MainModalService,
    private help: HelperService
  ) {
    this.isDoneMessage = '';
    this.hasErrorMessage = '';
    this.isActive = false;
    this.signaletiqueForm = new FormGroup({
      raison_sociale: new FormControl('', Validators.required),
      if: new FormControl('', Validators.required),
      active: new FormControl(false),
      rib: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{24}'),
        Validators.maxLength(24),
      ]),
      adresse: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(): void {
    this.signaletique && this.fetchSignaletique();
  }

  ngOnInit(): void {}

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  scrollToTop() {
    this.help.scrollToTop();
  }

  fetchSignaletique() {
    this.isActive = this.signaletique.active;
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
            this.help.refrechPage();
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

  updateSignaletique() {
    let signaletique: Signaletique = this.signaletiqueForm.value;
    this.signaletiqueService
      .updateSignaletique(
        signaletique,
        this.signaletique._id,
        this.userMatricule
      )
      .subscribe(
        () => {
          this.scrollToTop();
          this.isDoneMessage = 'Signalétique modifiée avec succée';
          setTimeout(() => {
            this.isDoneMessage = '';
            this.mainModalService.close();
            this.help.refrechPage();
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
  get ifControl() {
    return this.signaletiqueForm.get('if');
  }
  get rib() {
    return this.signaletiqueForm.get('rib');
  }
  get adresse() {
    return this.signaletiqueForm.get('adresse');
  }
}
