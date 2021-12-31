import { ActivatedRoute } from '@angular/router';
import { FoncierService } from '@services/foncier-service/foncier.service';
import { Foncier } from './../../../models/Foncier';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foncier-detail',
  templateUrl: './foncier-detail.component.html',
  styleUrls: ['./foncier-detail.component.scss'],
})
export class FoncierDetailComponent implements OnInit {
  foncier!: Foncier;
  userMatricule: any = localStorage.getItem('matricule');
  selectedAmenagement!: any;
  //Get image croquis to download
  selectedAmenagementCroquis!: any;
  //Get image apres amenagement to download
  selectedAmenagementImage!: any;
  displayAmenagementSection: boolean = false;
  selectedImageEntrer!: any;
  url: string = environment.API_URL_WITHOUT_PARAM;

  hasAmenagement: boolean = true;

  constructor(
    private foncierService: FoncierService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFoncierById();
  }

  // Get the foncier data by id
  getFoncierById() {
    const id: string = this.actRoute.snapshot.paramMap.get('id') || '';
    this.foncierService
      .getFoncierById(id, this.userMatricule)
      .subscribe((data: Foncier) => {
        if (data != null) {
          this.foncier = data;
          // @ts-ignore 
          if (data.amenagement.length.toString() == '0') {
            this.hasAmenagement = false;
          }

          this.foncier.amenagement = data.amenagement;
          this.foncier.imgs_lieu_entrer = data.imgs_lieu_entrer;

          for (
            let index = 0;
            // @ts-ignore: Object is possibly 'null'.
            index < this.foncier.imgs_lieu_entrer.length;
            index++
          ) {
            // @ts-ignore: Object is possibly 'null'.
            this.selectedImageEntrer = this.foncier?.imgs_lieu_entrer[index];
            this.selectedAmenagementCroquis =
            // @ts-ignore 
              this.foncier.amenagement[index]?.croquis_travaux[index];
            this.selectedAmenagementImage =
            // @ts-ignore 
              this.foncier.amenagement[index]?.images_apres_travaux[index];
          }
        }
        console.log(this.foncier);
      });
      
  }

  displayAmenagement(id: any) {
    if (this.foncier.amenagement?.length) {
      for (let index = 0; index < this.foncier.amenagement.length; index++) {
        if (this.foncier.amenagement[index]._id == id) {
          this.selectedAmenagement = this.foncier.amenagement[index];
        }
      }
      this.displayAmenagementSection = true;
    }
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }
}
