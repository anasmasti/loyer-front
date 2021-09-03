import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  // param_url: string = 'annex1';

  dowloadFileAnnex1(filename: string) {
    const param = new HttpParams().set('filename', filename);
    const options = {
      params: param,
    };
    console.log(options.params);
    
    return this.http.get(`${environment.API_URL_TEST+environment.API_VERSION}/annex1`, {
      ...options,
      responseType: 'blob',
    });
  }

  dowloadFileAnnex2(filename: string) {
    const param = new HttpParams().set('filename', filename);
    const options = {
      params: param,
    };
    console.log(options.params);
    
    return this.http.get(`${environment.API_URL_TEST+environment.API_VERSION}/annex2`, {
      ...options,
      responseType: 'blob',
    });
  }

  dowloadFileComptableLoyer(filename: string) {
    const param = new HttpParams().set('filename', filename);
    const options = {
      params: param,
    };
    console.log(options.params);
    
    return this.http.get(`${environment.API_URL_TEST+environment.API_VERSION}/fichier-comptable-loyer`, {
      ...options,
      responseType: 'blob',
    });
  }

}
