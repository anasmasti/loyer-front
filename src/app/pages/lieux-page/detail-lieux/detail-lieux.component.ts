import { environment } from './../../../../environments/environment';
import { Lieu } from 'src/app/models/Lieu';
import { Component, OnInit } from '@angular/core';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss'],
})
export class DetailLieuxComponent implements OnInit {

  lieu!: Lieu;
  selectedAmenagement!: any;
  //Get image croquis to download
  selectedAmenagementCroquis!: any;
  //Get image apres amenagement to download
  selectedAmenagementImage!: any;
  displayAmenagementSection: boolean = false;
  selectedImageEntrer!: any;
  url: string = environment.API_URL_WITHOUT_PARAM;

  hasAmenagement: boolean = true

  userMatricule: any = localStorage.getItem('matricule')


  constructor(
    private lieuxService: LieuxService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLieuById();
  }

  // Get the Lieu data by id
  getLieuById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.lieuxService.getLieuById(id, this.userMatricule).subscribe((data: Lieu) => {
      this.lieu = data;
      
      if ((data.amenagement.length).toString() == '0') {
        this.hasAmenagement = false
      }
      
      this.lieu.amenagement = data.amenagement;
      this.lieu.imgs_lieu_entrer = data.imgs_lieu_entrer;

      for (let index = 0; index < this.lieu.imgs_lieu_entrer.length; index++) {
        this.selectedImageEntrer = this.lieu.imgs_lieu_entrer[index];
        this.selectedAmenagementCroquis =  this.lieu.amenagement[index]?.croquis_travaux[index];
        this.selectedAmenagementImage = this.lieu.amenagement[index]?.images_apres_travaux[index];
      }

    });
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  displayAmenagement(id: any) {
    if (this.lieu.amenagement?.length) {
      for (let index = 0; index < this.lieu.amenagement.length; index++) {
        if (this.lieu.amenagement[index]._id == id) {
          this.selectedAmenagement = this.lieu.amenagement[index];
        }
      }
      this.displayAmenagementSection = true;
    }
  }
}
