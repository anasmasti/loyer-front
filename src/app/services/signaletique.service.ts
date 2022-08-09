import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signaletique } from '../models/Signaletique';

@Injectable({
  providedIn: 'root',
})
export class SignaletiqueService {
  param_url: string;
  
  constructor(private http: HttpClient) {
    this.param_url = 'signaletique';
  }

  // Post new Signaletique
  addSignaletique(
    data: Signaletique,
    matricule: any
  ): Observable<Signaletique> {
    return this.http.post<Signaletique>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/ajouter/${matricule}`,
      data
    );
  }

  // Update Signaletique
  updateSignaletique(
    data: Signaletique,
    id: any,
    matricule: any
  ): Observable<Signaletique> {
    return this.http.put<Signaletique>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/update/${id}/${matricule}`,
      data
    );
  }

  //Signaletique list
  getSignaletiqueList(matricule: any): Observable<Signaletique[]> {
    return this.http.get<Signaletique[]>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/all/${matricule}`
    );
  }

  // Delete Signaletique
  deleteSignaletique(id: String, matricule: any) {
    return this.http.put(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/delete/${id}/${matricule}`,
      null
    );
  }
}
