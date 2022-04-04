import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { Contrat } from '../../../models/Contrat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss'],
})
export class DetailContratComponent implements OnInit {

  selectedPieceContrat: any[] = [];
  selected_images_res_sortie: any[] = [];
  selected_lettre_res!: any;
  selected_piece_jointe_avenant!: any;
  url: string = environment.API_URL_WITHOUT_PARAM;

  contrat!: Contrat

  userMatricule: any = localStorage.getItem('matricule')

  lengthImageSortie!: number
  constructor(
    private contratService: ContratService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getSelectedContrat();
  }

  getSelectedContrat() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';


    this.contratService.getSelectedContrat(id).subscribe((data: any) => {
      this.contrat = data;

      this.contrat.piece_joint_contrat = data.piece_joint_contrat;
      this.contrat.etat_contrat = data.etat_contrat

      for (let index = 0; index < this.contrat.piece_joint_contrat.length; index++) {
        this.selectedPieceContrat.push(this.contrat.piece_joint_contrat[index]);
      }

      for (let index = 0; index < 1; index++) {
        this.selected_lettre_res = this.contrat.etat_contrat?.etat.lettre_res_piece_jointe[index];
        this.selected_piece_jointe_avenant = this.contrat.etat_contrat?.etat.piece_jointe_avenant[index];
      }
      
      let lengthImageSortie = this.contrat?.etat_contrat?.etat.images_etat_res_lieu_sortie.length || 0;
      for (let index = 0; index < lengthImageSortie; index++) {
        this.selected_images_res_sortie.push(this.contrat.etat_contrat?.etat.images_etat_res_lieu_sortie[index]);
        console.log(this.selected_images_res_sortie);
      }

    });
  }


  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }


}
