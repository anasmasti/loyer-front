import { ActivatedRoute } from '@angular/router';
import { FoncierService } from '@services/foncier-service/foncier.service';
import { Foncier } from './../../../models/Foncier';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelperService } from '@services/helpers/helper.service';

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
  selectedImageEntrer: any [] = [];
  url: string = environment.API_URL_WITHOUT_PARAM;

  intituleLieu: string | undefined = '';

  hasAmenagement: boolean = true;

  constructor(
    private foncierService: FoncierService,
    private actRoute: ActivatedRoute,
    private helperService: HelperService
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
          if (data.amenagement.length.toString() === '0') {
            this.hasAmenagement = false;
          }

          this.foncier.amenagement = data.amenagement;
          this.foncier.imgs_lieu_entrer = data.imgs_lieu_entrer;

          this.intituleLieu = this.foncier.lieu[0]?.lieu?.intitule_lieu;

          for (
            let index = 0;
            // @ts-ignore: Object is possibly 'null'.
            index < this.foncier.imgs_lieu_entrer.length;
            index++
          ) {
            // @ts-ignore: Object is possibly 'null'.
            this.selectedImageEntrer.push(this.foncier?.imgs_lieu_entrer[index]);
          }

          for (let j = 0; j < this.foncier.amenagement.length; j++) {
            for (
              let x = 0;
              x < this.foncier.amenagement[j].images_apres_travaux.length;
              x++
            ) {
              this.selectedAmenagementCroquis =
                // @ts-ignore
                this.foncier.amenagement[j]?.croquis_travaux[x];
              this.selectedAmenagementImage =
                // @ts-ignore
                this.foncier.amenagement[j]?.images_apres_travaux[x];
            }
          }
        }
      });
  }

  displayAmenagement(id: any) {
    if (this.foncier.amenagement?.length) {
      for (let index = 0; index < this.foncier.amenagement.length; index++) {
        if (this.foncier.amenagement[index]._id === id) {
          this.selectedAmenagement = this.foncier.amenagement[index];
        }
      }
      this.displayAmenagementSection = true;
    }
  }
  checkAndPutText(value: boolean) {
    return this.helperService.booleanToText(value);
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }
}
