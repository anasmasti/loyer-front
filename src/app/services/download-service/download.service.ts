import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  // param_url: string = 'annex1';
  setFilename(filename: string) {
    const param = new HttpParams().set('filename', filename);
    const options = {
      params: param,
    };
    return options
  }

  dowloadFiles(filename: any, date: any, param: string) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION + param }/${date.mois}/${date.annee}`, {
      ...this.setFilename(filename),
      responseType: 'blob',
    });
  }
}
