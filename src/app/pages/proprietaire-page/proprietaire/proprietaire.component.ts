import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProprietaireService } from 'src/app/services/proprietaire.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss']
})
export class ProprietaireComponent implements OnInit {

  // proprietaireForm !: FormGroup;
  isMand: boolean = false

  constructor(private proprietaire:ProprietaireService) { }

  ngOnInit(): void {
    console.log(this.proprietaire.getProprietaire())
  
  }

  proprietaireForm = new FormGroup({
    // Champs du propriètaire
    cinPr: new FormControl('',Validators.required),
    passeportPr: new FormControl('',Validators.required),
    carteSejourPr: new FormControl('',Validators.required),
    raisonSocialPr: new FormControl('',Validators.required),
    NregCommercePr: new FormControl('',Validators.required),
    nomprenomPr: new FormControl('',Validators.required),
    telPr: new FormControl('',Validators.required),
    faxPr: new FormControl('',Validators.required),
    adressePr: new FormControl('',Validators.required),
    NcptBancPr: new FormControl('',Validators.required),
    bancPr: new FormControl('',Validators.required),
    nomAgencebancPr: new FormControl('',Validators.required),
    isMandataire:new FormControl('',Validators.required),
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
    // console.log(this.proprietaireForm?.value);

    this.proprietaire.PostProprietaire(this.proprietaireForm.value).subscribe(data => {
      console.log(data)
    }, error => {console.log(error)}
    )
  }



}
