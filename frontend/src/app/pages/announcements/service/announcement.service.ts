import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/announcement' 
  }

  save(id: number|null, announcement: any , parentId:number|null , babysitterId:number|null): Observable<any> {
    if(id){
      return this.update(id, announcement)
    }
    
    return this.create(announcement , parentId ,babysitterId )
  }

  create(announcement: any , parentId:number|null , babysiiterId:number|null): Observable<any> { 
    let url = this.baseUrl();
    let params = new HttpParams();
   
    if(parentId !==null){
      params = params.append('parentId', parentId);  
    }
    if(babysiiterId !==null){
      params = params.append('babysiiterId' , babysiiterId); 
    }  

    return this.http.post<any>(url, announcement , {params});
  }

  update(id: number, announcement: any): Observable<any> {
    let url = `${this.baseUrl()}/${id}`;
    return this.http.put<any>(url, announcement);
  }

  findById(id: number): Observable<any> {
    let url = `${this.baseUrl()}/${id}`;
    return this.http.get<any>(url);
  }

  findByIdParent(parentId: number): Observable<any> {
    let url = `${this.baseUrl()}/parent/${parentId}`;
    return this.http.get<any>(url);
  }

  findByIdBabysiiter(babysitter: number): Observable<any> { 
    let url = `${this.baseUrl()}/babysitter/${babysitter}`; 
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

  getAnnouncementByRole(role: string): Observable<any[]> {
    let url = this.baseUrl() + '/findAnnouncementByRole';
    let params = new HttpParams().set("role", role);
    return this.http.get<any[]>(url, { params });
  }
  getAnnouncementByStatus(status: string): Observable<any[]> {
    let url = this.baseUrl() + '/findByStatus';
    let params = new HttpParams().set("status", status);
    return this.http.get<any[]>(url, { params });
  }


  getAnnouncementByStatusAndRole(status: string , role: string): Observable<any[]> {
    let url = this.baseUrl() + '/findByStatusAndRole';
    let params = new HttpParams()
    .set("status", status)
    .set("role", role);  
    return this.http.get<any[]>(url, { params });
  }

  updateStatusDemande(announcementId: number, status: string): Observable<any> {
    let url = `${this.baseUrl()}/updateStatusDemande/${announcementId}`;
    const body = { status: status };
    return this.http.put<any>(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    });
  }
}
