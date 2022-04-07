import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkProprietairePhysique(
  isPersonPhysique: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null && isPersonPhysique)
      return { requiredWhenIsPhysique: true };
    else if (control.value !== null && isPersonPhysique) return null;
    else return null;
  };
}

export function checkProprietaireMoral(isPersonPhysique: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null && !isPersonPhysique)
      return { requiredWhenIsMoral: true };
    else if (control.value !== null && !isPersonPhysique) return null;
    else return null;
  };
}
