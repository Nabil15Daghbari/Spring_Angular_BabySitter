import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParentService {
  constructor(private http:HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/parent'
  }



  save(id:number|null , parent:any):Observable<any>{
    if(id)
       return this.update(id , parent);
    return this.create(parent);
  }

 create(parent:any):Observable<any>{
   let url = this.baseUrl();
   return this.http.post<any>(url , parent);
 }

  update(id:number , parent:any ) :Observable<any>{
    let url = `${this.baseUrl()}/${id}`;
    return this.http.put<any>(url , parent);
  }


  findById(id:number):Observable<any>{
    let url = `${this.baseUrl()}/${id}`;
    return this.http.get<any>(url);
   }

   
}