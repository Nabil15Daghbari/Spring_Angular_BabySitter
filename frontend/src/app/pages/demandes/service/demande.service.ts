import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  baseUrl(){
    return 'http://localhost:8081/api/demande' 
  }

 
  create(demande: FormData , babysitterId:number , announcementId:number): Observable<Demande> {
    let url = this.baseUrl();
    let params = new HttpParams();
    params = params.append('babysitterId' , babysitterId);
    params =params.append('announcementId' , announcementId)
    return this.http.post<Demande>(url, demande, {params});
  }

  

  update(id: number, demande: Demande): Observable<any> {
    let url = `${this.baseUrl()}/${id}`;
    return this.http.put<any>(url, demande);
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

  getByBabysitter(babysitterId:number){
    let url = `${this.baseUrl()}/getByBabysitter/${babysitterId}`;
    return this.http.get(url);
  }


  getByParent(parentId:number){
    let url = `${this.baseUrl()}/requests/by-parent`;
    let params = new HttpParams();
      params = params.append('parentId' , parentId)
    return this.http.get(url , {params});
  }

  updateStatusDemande(demandeId: number, status: string): Observable<Demande> {
    let url = `${this.baseUrl()}/updateStatusDemande/${demandeId}`;
    // Créez un objet qui correspond à la structure attendue par le backend
    const body = { status: status };
    // Assurez-vous que la requête soit envoyée avec le bon 'Content-Type'
    return this.http.put<Demande>(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    });  
  }


  
  findDemandeByStatus():Observable<Array<Demande>>{
    let url = this.baseUrl() + '/findAllByStatus';
    return this.http.get<Array<Demande>>(url);
  }






}
