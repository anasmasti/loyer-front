import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PropValidator {
  static checkProprietairePhysique(isPersonPhysique: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value && isPersonPhysique) {
        console.log('phys');
        return { requiredWhenIsPhysique: true };
      }
      return null;
    };
  }

  static checkProprietaireMoral(isPersonPhysique: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value && !isPersonPhysique) {
        console.log('morl');
        return { requiredWhenIsMoral: true };
      }
      return null;
    };
  }

  static runInOrder(validators: ValidatorFn[]): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      for (const validator of validators) {
        const resp = validator(c);
        if (resp != null) {
          return resp;
        }
      }
      return null;
    };
  }
}
