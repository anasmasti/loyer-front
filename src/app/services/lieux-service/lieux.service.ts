import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lieu } from '../../models/lieu';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class LieuxService {


  constructor(private http: HttpClient) { }

  
  // Get list of all proprietaires from database
  getLieux(){
    return this.http.get('http://localhost:5000/api/v1/Lieu/tout');
  }

  // get specific "lieu" by his id 
  getLieuById(id:any){
    return this.http.get('http://localhost:5000/api/v1/Lieu/'+id);
  }

  postDR(data:any){
     return this.http.post('http://192.168.11.124:5000/api/v1/lieu/ajouter',data);
  }

 




}
