import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss']
})
export class DrFormComponent implements OnInit, OnDestroy {
  $testDrForm !: any;
  isAmenag : boolean = false;
  selectedFile !: File;
  // drForm !: FormGroup;
  constructor(private drService: LieuxService) { }

  drForm : FormGroup = new FormGroup({
	   code_lieu: new FormControl('',),
       intitule_lieu: new FormControl('',),
    //    intitule_DR: new FormControl('',),
       adresse: new FormControl('',),
       ville: new FormControl('',),
       code_localite: new FormControl('',),
       desc_lieu_entrer: new FormControl('',),
    //    imgs_lieu_entrer: new FormControl('',),
       has_amenagements: new FormControl('',),
       superficie: new FormControl('',),
       telephone: new FormControl('',),
       fax: new FormControl('',),
       etage: new FormControl('',),
       type_lieu: new FormControl('',),
       code_rattache_DR: new FormControl('',),
       code_rattahce_SUP: new FormControl('',),
       intitule_rattache_SUP_PV: new FormControl('',),
       centre_cout_siege: new FormControl('',),
       categorie_pointVente: new FormControl('',),
       deleted: new FormControl('',),
	
	
	// nature_travaux_amenagement : new FormControl('',),
	// montant_travaux_amenagement : new FormControl('',),
	// valeur_nature_travaux_charge_propriétaire : new FormControl('',),
	// valeur_nature_travaux_charge_fondation : new FormControl('',),
	// Nfacture : new FormControl('',),
	// Nbon_commande : new FormControl('',),
	// date_passation_commande : new FormControl('',),
	// fournisseur : new FormControl('',),
	// evaluation_fournisseur : new FormControl('',),
	// date_fin_travaux : new FormControl('',),
	// date_livraison_local : new FormControl('',),
	// images_local_apres_amenagement : new FormControl('',),
	// croquis_amenagement_via_imagerie : new FormControl('',),
	// superficie : new FormControl('',),
	// telephone : new FormControl('',),
	// fax : new FormControl('',),
  })

  ngOnInit(): void {
	// console.log(this.drForm)
}

ngOnDestroy() {
	// this.$testDrForm.unsubscribe()
}

onFileSelected(event:any){
	this.selectedFile = <File>event.target.files[0];
}

  addDR(){
	// this.$testDrForm = this.drService.postDR(this.drForm)
	// this.$testDrForm.subscribe()
	// const fd = new FormData();
	// fd.append('imgs_lieu_entrer',this.selectedFile,this.selectedFile.name)
	// let myform = JSON.stringify(this.drForm.value)
	// let myform=JSON.parse(this.drForm.value)

	let data: any =
    {
		code_lieu: this.drForm.get('code_lieu')?.value,
		intitule_lieu: this.drForm.get('intitule_lieu')?.value,
		adresse: this.drForm.get('adresse')?.value,
		ville: this.drForm.get('ville')?.value,
		code_localite: this.drForm.get('code_localite')?.value,
		desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      
    };
	this.drService.postDR(data).subscribe((_) => {
		   console.log('Form post =====> ',data)
		//    console.log('file post =====> ',fd)
	})
}



   get code_lieu() {
       return this.drForm.get('code_lieu');
     }
   
   get intitule_lieu() {
     return this.drForm.get('intitule_lieu');
   }
   
   get adresse() {
     return this.drForm.get('adresse');
   }
   
   get code_localite() {
     return this.drForm.get('code_localite');
   }
   
   get desc_lieu_entrer() {
     return this.drForm.get('desc_lieu_entrer');
   }
   
}



