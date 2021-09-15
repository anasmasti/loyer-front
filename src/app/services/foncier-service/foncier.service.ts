import { environment } from 'src/environments/environment';
import { Foncier } from './../../models/Foncier';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoncierService {


  constructor(private http: HttpClient) { }

  param_url: string = 'foncier';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };

  // Get list of all fonciers from database
  getFonciers(): Observable<Foncier[]> {
    return this.http.get<Foncier[]>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all`,
      { headers: this.httpOptions.headers }
    );
  }

  // Get proprietaire and lieux ids 
  getPropWithLieux(): Observable<any> {
    return this.http.get<any>(
      `${environment.API_URL_TEST + environment.API_VERSION}/proprietaire-lieu`,
      { headers: this.httpOptions.headers }
    );
  }

  // Post foncier
  addFoncier(data: Foncier): Observable<Foncier> {
    return this.http.post<Foncier>(
      `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/ajouter`, data,
      { headers: this.httpOptions.headers }
      );
    }
    
    // Get foncier by id
    getFoncierById(id: string): Observable<Foncier> {
      return this.http.get<Foncier>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/${id}`,
        { headers: this.httpOptions.headers }
      );
    }

    updateFoncier(id: any, data: any): Observable<any> {
      return this.http.patch<any>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/modifier/${id}`, data);
    }

    deleteFoncier(id: any, data: any): Observable<Foncier> {
      return this.http.patch<Foncier>(
        `${environment.API_URL_TEST + environment.API_VERSION + this.param_url
        }/delete/${id}`,
        data,
        { headers: this.httpOptions.headers }
      );
    }
    
}
