import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Open the modal
  open(id: string = 'confirmationModal') {
    let mainModal = this.document.getElementById(id); // Get modal from the DOM by id
    mainModal?.classList.add('open'); // Open it by add open class to the selected modal element
   // console.log(mainModal);
  }

  // Close the modal
  close(id: string = 'confirmationModal') {
    let mainModal = this.document.getElementById(id); // Get modal from the DOM by id
    mainModal?.classList.remove('open'); // Close it by removing open class to the selected modal element
  }
}
