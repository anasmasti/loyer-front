import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateGTCurrentDateOfTreatment(
  dateOfTreatment: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let inputDate: string = `${new Date(control.value).getFullYear()}-${
      new Date(control.value).getMonth() + 1
    }-01`;
    
    if (new Date(inputDate) <= new Date(dateOfTreatment)) {
      return { hasIncorrectDate: true };
    } else {
      return null;
    }
  };
}
