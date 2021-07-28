import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from 'src/app/models/Contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  
  // Get list of all proprietaires from database
  getContrat(){
    return this.http.get('http://localhost:5000/api/v1/contrat/tous/');
  }

  //get details contrat by id
  getSelectedContrat(id:String){
    return this.http.get('http://localhost:5000/api/v1/contrat/details/'+id);
  }
  
  updateContrat(id:String,contrat:Contrat){
    return this.http.put('http://localhost:5000/api/v1/contrat/modifier/'+id,contrat);
  }
  addContrat(contrat:Contrat){
    return this.http.post('http://localhost:5000/api/v1/contrat/ajouter/',contrat);
  }

  

}
