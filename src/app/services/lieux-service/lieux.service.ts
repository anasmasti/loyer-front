import { Lieu } from 'src/app/models/Lieu';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LieuxService {
  param_url: string = 'lieu';
  
  constructor(private http: HttpClient) { }

  // Get list of all lieux from database
  getLieux(matricule: any): Observable<Lieu[]> | any {
    return this.http.get<Lieu[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/all-lieu/${matricule}`
    );
  }

  // get specific "lieu" by his id
  getLieuById(id: String, matricule: any): Observable<Lieu> {
    return this.http.get<Lieu>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/detail/${id}/${matricule}`
    );
  }

  addLieu(data: any, matricule: any): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${matricule}`,
      data
    );
  }

  // Update the Lieu
  updateLieux(id: any, data: any, matricule: any): Observable<any> {
    return this.http.patch<any>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/modifier/${id}/${matricule}`,
      data
    );
  }

  deleteLieu(id: any, data: any, matricule: any): Observable<Lieu> {
    return this.http.patch<Lieu>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/delete/${id}/${matricule}`,
      data
    );
  }

  //get dr and sup to load dropdown list
  getDrSup(matricule: any): Observable<any> {
    return this.http.get<any>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/Dr/Sup/${matricule}`
    );
  }

  // post formdata file
  uploadFile(formdata: FormData, matricule: any) {
    return this.http.post<any>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${matricule}`,
      formdata
    );
  }

  //get the list of lieux to load the drop down list in contrat component
  listLieux(matricule: any) {
    return this.http.get(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/all-lieu/${matricule}`
    );
  }

  getLieuByType(matricule: any, data: any): Observable<any> {
    return this.http.post(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/lieu-by-type/${matricule}`,
      data
    );
  }
}
