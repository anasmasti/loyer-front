import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainModalService {

  mainModal = this.document.getElementById('mainModal')

  constructor(@Inject(DOCUMENT) private document: Document) { }

  open() {
    let mainModal = this.document.getElementById("mainModal")
    mainModal?.classList.add('open')
  }

  close() {
    let mainModal = this.document.getElementById("mainModal")
    mainModal?.classList.remove('open')
  }
}
