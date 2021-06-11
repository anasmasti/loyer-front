import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proprietaire } from '../models/proprietaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProprietaireService {
  param_url: string = "proprietaire"

  constructor(private http: HttpClient) { }

  // Get list of all proprietaires from database
  getProprietaire(): Observable<Proprietaire[]> {
    return this.http.get<Proprietaire[]>(`${environment.API_URL}${this.param_url}`);
  }

  // Get one proprietaire by id from database
  getProprietaireById(id: string): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(`${environment.API_URL}${this.param_url}/${id}`);
  }

  // Push the proprietaire data to database
  postProprietaire(data: Proprietaire): Observable<Proprietaire> {
    return this.http.post<Proprietaire>(`${environment.API_URL}${this.param_url}`, data);
  }

  // Update the proprietaire
  updateProprietaire(id: string, data: Proprietaire): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(`${environment.API_URL}${this.param_url}/${id}`, data)

  }

  // Delete the proprietaire
  deleteProprietaire(id: string, data: any): Observable<Proprietaire> {
    return this.http.put<Proprietaire>(`${environment.API_URL}${this.param_url}/delete/${id}`, data)
  }

}
