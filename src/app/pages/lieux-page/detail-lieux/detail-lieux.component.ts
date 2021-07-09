import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from './../../../services/confirmation-modal.service';
import { MainModalService } from './../../../services/main-modal.service';
import { LieuxService } from 'src/app/services/lieux.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss']
})
export class DetailLieuxComponent implements OnInit {
  Lieu={
    "deleted": false,                                          
        "_id":"chargement ...",                                          
        "type_lieu":"chargement ...",                       
        "intitule_de_lieu":"chargement ...",                           
        "intitule_direction_regional":"chargement ...",                            
        "ville":"chargement ...",                        
        "raison_sociale":"chargement ...",                         
        "telephone":"chargement ...",                         
        "fax":"chargement ...",                         
        "code_localite":"chargement ...",                      
        "superficie":"chargement ...",                             
        "etage":"chargement ...",                      
        "code_Rattachement_DR":"chargement ...",                    
        "code_Rattachement_SUP":"chargement ...",                    
        "intitule_Rattachement_supervision_POS":"chargement ...",                          
        "centre_cout_Siege":"chargement ...",                          
        "categorie_point_Vente":"chargement ..."   ,                    
        "has_amenagement":"chargement"
    };
  Amenagements:any=[
    {
      "proprietaire": {
        "nature": "chargement ...",
        "valeur": "chargement ..."
    },
    "fondation": {
        "nature": "chargement ...",
        "valeur": "chargement ..."
    },
    "deleted": false,
    "_id": "chargement ...",
    "nature": "chargement ...",
    "montant": "chargement ...",
    "n_Facture": "chargement ...",
    "n_bon_Cde": "chargement ...",
    "date_Passation_Cde": "chargement ...",
    "evaluation_Fournisseur": "chargement ...",
    "date_Fin_travaux":"chargement ...",
    "date_Livraison_local": "chargement ...",
    "croquis":"chargement ...",
    }
  ];
  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLieuById();
  }
// Get the proprietaire data by id
getLieuById() {
  const id = this.actRoute.snapshot.paramMap.get('id') || '';
  this.lieuxService.getLieuById(id).subscribe((data:any) => {
    this.Lieu = data[0];
    this.Amenagements= data[0].amenagement;
  });


}


  

}
