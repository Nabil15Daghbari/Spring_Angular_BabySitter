import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  constructor(private http: HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/avis' 
  }

  save(id: number|null, avis: any , parentId:number|null , announcementId:number|null): Observable<any> {
    if(id){
      return this.update(id, avis)
    }
    
    return this.create(avis , parentId ,announcementId )
  }

  create(avis: any , parentId:number|null , announcementId:number|null): Observable<any> { 
    let url = this.baseUrl();
    let params = new HttpParams();
   
    if(parentId !==null){
      params = params.append('parentId', parentId);  
    }
    if(announcementId !==null){
      params = params.append('announcementId' , announcementId); 
    }  

    return this.http.post<any>(url, avis , {params});
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

  getAvisByAnnouncement(announcementId: number): Observable<any[]> {
    let url = this.baseUrl() + '/getByAnnouncement';
    let params = new HttpParams().set("announcementId", announcementId);
    return this.http.get<any[]>(url, { params });
  }
 

}
