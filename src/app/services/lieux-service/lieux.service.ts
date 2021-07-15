import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lieu } from '../../models/Lieu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LieuxService {
  constructor(private http: HttpClient) {}

  // Get list of all proprietaires from database
  getLieux() {
    return this.http.get('http://localhost:5000/api/v1/Lieu/tout');
  }

  // get specific "lieu" by his id
  getLieuById(id: String): Observable<Lieu> {
    return this.http.get<Lieu>('http://localhost:5000/api/v1/Lieu/' + id);
  }
}
