import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkProprietairePhysique(isPersonPhysique: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === '' && isPersonPhysique) return { requiredWhenIsPhysique: true };
    else return null;
  };
}

export function checkProprietaireMoral(isPersonPhysique: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '' && !isPersonPhysique ) return { requiredWhenIsMoral: true };
      else return null;
    };
  }
