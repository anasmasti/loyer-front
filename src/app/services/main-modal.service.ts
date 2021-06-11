import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainModalService {

  // Get modal from the DOM by id
  mainModal = this.document.getElementById('mainModal')

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Open the modal
  open() {
    this.mainModal?.classList.add('open') // Open it by add open class to the selected modal element
  }

  // Close the modal
  close() {
    this.mainModal?.classList.remove('open') // Close it by removing open class to the selected modal element
  }
}
