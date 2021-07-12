import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  adminForm: any = new FormGroup({
    // Champs du propriètaire
    Matricule: new FormControl('', []),
    NomComplet: new FormControl('', [
    ]),
    Role: new FormControl('', [
    ]),
   
  });

  constructor() { }

  ngOnInit(): void {
  }

}
