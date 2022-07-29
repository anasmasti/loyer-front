import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DownloadService } from '@services/download-service/download.service';

@Component({
  selector: 'app-declaration-annuelle',
  templateUrl: './declaration-annuelle.component.html',
  styleUrls: ['./declaration-annuelle.component.scss'],
})
export class DeclarationAnnuelleComponent implements OnInit {
  declarationAnnuelleForm!: FormGroup;
  dateSelected: boolean = false;
  fileParam: string = 'annex2';

  constructor(private downloadService: DownloadService) {}

  ngOnInit(): void {
    this.declarationAnnuelleForm = new FormGroup({
      date_gen: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{4}'),
      ]),
    });
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  showButtons() {
    return (this.dateSelected = true);
  }

  dowloadExcelAnnex2(fileName: string) {
    let date_gen = this.declarationAnnuelleForm.get('date_gen')?.value;
    this.downloadService
      .dowloadExcelAnnex2(fileName, date_gen)
      .catch(console.error);
  }

  downloadFiles(param: string) {
    // let today = new Date()
    let date_gen = new Date(
      this.declarationAnnuelleForm.get('date_gen')?.value
    );
    // Fill date cloture
    let date = {
      mois: date_gen.getMonth() + 1,
      annee: date_gen.getFullYear(),
    };

    let filename = 'Declaration_DeclarationRASRF';

    this.downloadService
      .dowloadFiles(filename, date, param)
      .subscribe((res) => {
        if (res) {
          saveAs(res, filename);
        }
      });
  }

  get date_gen() {
    return this.declarationAnnuelleForm.get('date_gen');
  }
}
