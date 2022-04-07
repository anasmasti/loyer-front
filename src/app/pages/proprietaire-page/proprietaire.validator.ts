import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkProprietairePhysique(isPersonPhysique: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('inside physique validation',isPersonPhysique );
    if (control?.get('nom_prenom')?.value == '' && control?.get('cin')?.value == '' && isPersonPhysique) {
      console.log('There is an error');
      
      return { requiredWhenIsPhysique: true };

    } 
    else return null;
  };
}

export function checkProprietaireMoral(isPersonPhysique: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log('inside moral validation', !isPersonPhysique);
      
      if (control?.get('raison_social')?.value == '' && control?.get('n_registre_commerce')?.value == '' && !isPersonPhysique ) {

        console.log('There is an error');
        return { requiredWhenIsMoral: true };
      } 
      else return null;
    };
  }
