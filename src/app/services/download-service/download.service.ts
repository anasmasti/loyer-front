import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import dateClotureType from 'src/app/pages/cloture/date-cloture.type';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  dateCloture!: dateClotureType;
  constructor(private http: HttpClient) {}

  setFilename(filename: string) {
    const param = new HttpParams().set('filename', filename);
    const options = {
      params: param,
    };
    return options;
  }
  dowloadFiles(filename: any, date: any, param: string) {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION + param}/${
        date.mois
      }/${date.annee}`,
      {
        ...this.setFilename(filename),
        responseType: 'blob',
      }
    );
  }
  dowloadExcelAnnex2(filename: string,annee: number) {
    // let date = new Date();
    return this.http
      .get(
        `${
          environment.API_URL_TEST +
          environment.API_VERSION +
          'download-excel-annex/'
        }${annee}`,
        {
          responseType: 'blob',
        }
      )
      .toPromise()
      .then(async (res) => {
        return await saveAs(res, filename);
      });
  }

  dowloadExcelFiles(filename: string, mois: number, annee:number) {
    // let date = new Date();
    return this.http
      .get(
        `${
          environment.API_URL_TEST +
          environment.API_VERSION +
          'download-excel/' +
          filename
        }/${mois}/${annee}`,
        {
          responseType: 'blob',
        }
      )
      .toPromise()
      .then(async (res) => {
        return await saveAs(res, filename);
      });
  }
}
