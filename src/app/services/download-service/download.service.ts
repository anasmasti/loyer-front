import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  dowloadFileAnnex1(filename: string) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION}/annex1`, {
      ...this.setFilename(filename),
      responseType: 'blob',
    });
  }

  dowloadFileAnnex2(filename: string) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION}/annex2`, {
      ...this.setFilename(filename),
      responseType: 'blob',
    });
  }

  dowloadFileComptableLoyer(filename: string) {
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION}/fichier-comptable-loyer`, {
      ...this.setFilename(filename),
      responseType: 'blob',
    });
  }

}
