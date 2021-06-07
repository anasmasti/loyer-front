import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss']
})
export class ProprietaireComponent implements OnInit {

  // proprietaireForm !: FormGroup;

  constructor() { }

  ngOnInit(): void {
  
  }

  proprietaireForm = new FormGroup({
    // Champs du propriètaire
    cinPr: new FormControl(),
    passeportPr: new FormControl(),
    carteSejourPr: new FormControl(),
    raisonSocialPr: new FormControl(),
    NregCommercePr: new FormControl(),
    nomprenomPr: new FormControl(),
    telPr: new FormControl(),
    faxPr: new FormControl(),
    adressePr: new FormControl(),
    NcptBancPr: new FormControl(),
    bancPr: new FormControl(),
    nomAgencebancPr: new FormControl(),
    isMandataire:new FormControl(),
    // Champs du mandataire
    cinM: new FormControl(),
    rsocialM: new FormControl(),
    nomprenomM: new FormControl(),
    telM: new FormControl(),
    faxM: new FormControl(),
    adresseM: new FormControl(),
    ncptBancM: new FormControl(),

   }) 


  onSubmit()
  {
    console.log(this.proprietaireForm.value);
  }



}
