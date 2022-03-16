import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkProprietaireInputRequired(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        return {};
    }
}