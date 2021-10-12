import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainModalService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // Open the modal
  open() {
    let mainModal = this.document.getElementById('mainModal') // Get modal from the DOM by id
    mainModal?.classList.add('open') // Open it by add open class to the selected modal element
  }

  // Close the modal
  close() {
    let mainModal = this.document.getElementById('mainModal') // Get modal from the DOM by id
    mainModal?.classList.remove('open') // Close it by removing open class to the selected modal element
  }
}