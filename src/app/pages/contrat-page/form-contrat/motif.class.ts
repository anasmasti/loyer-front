import { FormArray } from '@angular/forms';

export class Motif {
  proprDecesFormList!: boolean;
  proprCessionFormList!: boolean;
  montantLoyerForm!: boolean;

  constructor() {}

  // ngOnChanges() {
  //   this.proprDecesFormList = false
  //   this.proprCessionFormList = false
  //   this.montantLoyerForm = false
  // }

  displayForms(checkboxId: string): void {
    let checkbox: HTMLInputElement = document.querySelector(
      `#${checkboxId}`
    ) as HTMLInputElement;

    if (checkboxId == 'deces') {
      if (checkbox.checked) {
        this.proprDecesFormList = true;
      } else {
        this.proprDecesFormList = false;
      }
    }

    if (checkboxId == 'cession')
      checkbox.checked
        ? (this.proprCessionFormList = true)
        : (this.proprCessionFormList = false);

    if (checkboxId == 'revison_mnt_loyer')
      checkbox.checked
        ? (this.montantLoyerForm = true)
        : (this.montantLoyerForm = false);
  }
}
