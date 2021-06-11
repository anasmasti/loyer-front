import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proprietaire } from '../models/proprietaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProprietaireService {
  constructor(private http: HttpClient) {}

  // Get list of all proprietaires from database
  getProprietaire(): Observable<Proprietaire[]> {
    return this.http.get<Proprietaire[]>(`${environment.API_URL}proprietaire`);
  }

  // Get one proprietaire by id from database
  getProprietaireById(id: string): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(`${environment.API_URL}proprietaire/${id}`);
  }
  
  // Push the proprietaire data to database
  postProprietaire(data: Proprietaire): Observable<Proprietaire> {
    const url : string="proprietaire"
    return this.http.post<Proprietaire>(`${environment.API_URL}proprietaire`, data);
  }

  // Update the proprietaire
  updateProprietaire(data: Proprietaire): Observable<Proprietaire> {
    const url : string="proprietaire"
    return this.http.put<Proprietaire>(`${environment.API_URL}proprietaire`, data)
     
  }

}
