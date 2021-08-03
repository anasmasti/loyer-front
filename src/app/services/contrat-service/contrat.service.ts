import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    }),
  };
  
  // Get list of all proprietaires from database
  getContrat(){
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION}contrat/tous/`,{ headers: this.httpOptions.headers });
  }

  //get details contrat by id
  getSelectedContrat(id:String){
    return this.http.get(`${environment.API_URL_TEST + environment.API_VERSION}contrat/details/${id}`,{ headers: this.httpOptions.headers });
  }
  
  updateContrat(id:String,contrat:Contrat){
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION}contrat/modifier/${id}`,contrat,{ headers: this.httpOptions.headers });
  }

  updateContratNvEtat(id:String,contrat:Contrat , nvEtatContrat:any , oldEtatContrat : any){
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION}contrat/modifierNvEtat/${id}`,{
      oldEtat:oldEtatContrat,
      NewEtat:nvEtatContrat,
      contrat: contrat
    },{ headers: this.httpOptions.headers });
  }

  addContrat(contrat:Contrat){
    return this.http.post(`${environment.API_URL_TEST + environment.API_VERSION}contrat/ajouter`,contrat,{ headers: this.httpOptions.headers });
  }

  deleteContrat(id:String){
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION}contrat/supprimer/${id}`,{deleted:true},{ headers: this.httpOptions.headers });
  }

  

}
