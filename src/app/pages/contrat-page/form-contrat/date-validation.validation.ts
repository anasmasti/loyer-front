import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateGTCurrentDateOfTreatment(
  dateOfTreatment: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('inside validation');

    let inputDate: string = `${new Date(control.value).getFullYear()}-${
      new Date(control.value).getMonth() + 1
    }-01`;
    if (inputDate < dateOfTreatment) {
      return { hasIncorrectDate: true };
    } else {
      return null;
    }
  };
}
