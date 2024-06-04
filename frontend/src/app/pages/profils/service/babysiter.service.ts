import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BabysiterService {
  constructor(private http:HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/babysitter'
  }



  save(id:number|null , babysitter:any):Observable<any>{
    if(id)
       return this.update(id , babysitter);
    return this.create(babysitter);
  }

 create(babysitter:any):Observable<any>{
   let url = this.baseUrl();
   return this.http.post<any>(url , babysitter);
 }

  update(id:number , babysitter:any ) :Observable<any>{
    let url = `${this.baseUrl()}/${id}`;
    return this.http.put<any>(url , babysitter);
  }


  findById(id:number):Observable<any>{
    let url = `${this.baseUrl()}/${id}`;
    return this.http.get<any>(url);
   }

   
}