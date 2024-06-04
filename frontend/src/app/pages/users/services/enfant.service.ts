import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnfantService {

  constructor(private http: HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/enfant' 
  }

  save(id: number|null, announcement: any , parentId:number): Observable<any> {
    if(id){
      return this.update(id, announcement)
    }
    return this.create(announcement , parentId)
  }

  create(enfant:any , parentId:number ):Observable<any>{
    let url = `${this.baseUrl()}?parentId=${parentId}`;
     return this.http.post<any>(url , enfant); 
   }

  update(id: number, announcement: any): Observable<any> {
    let url = `${this.baseUrl()}/${id}`;
    return this.http.put<any>(url, announcement);
  }

  findById(id: number): Observable<any> {
    let url = `${this.baseUrl()}/${id}`;
    return this.http.get<any>(url);
  }

  findAll(): Observable<Array<any>> {
    let url = this.baseUrl();
    return this.http.get<Array<any>>(url);
  }

  delete(id: number): Observable<boolean> {
    let url = `${this.baseUrl()}/${id}`;
    return this.http.delete<boolean>(url);
  }

  findEnfnatByParentId(parentId:number):Observable<any>{
    let url = `${this.baseUrl()}/getEnfnatByParentId/${parentId}`;
    return this.http.get<any>(url);
  }







}
