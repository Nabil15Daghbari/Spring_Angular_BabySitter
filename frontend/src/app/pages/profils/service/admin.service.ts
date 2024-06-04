import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/admin'
  }



  save(id:number|null , admin:any):Observable<any>{
    if(id)
       return this.update(id , admin);
    return this.create(admin);
  }

 create(admin:any):Observable<any>{
   let url = this.baseUrl();
   return this.http.post<any>(url , admin);
 }

  update(id:number , admin:any ) :Observable<any>{
    let url = `${this.baseUrl()}/${id}`;
    return this.http.put<any>(url , admin);
  }

}