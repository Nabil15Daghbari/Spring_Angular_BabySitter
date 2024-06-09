import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../service/announcement.service';

@Component({
  selector: 'app-announcement-admin',
  templateUrl: './announcement-admin.component.html',
  styleUrls: ['./announcement-admin.component.scss']
})
export class AnnouncementAdminComponent implements OnInit {
  announcements: Array<any> = []
  announcementsected: any = {}
  constructor(
    private announcementService: AnnouncementService,

  ) { }

  ngOnInit(): void {

    this.getAnnouncementbyStatus();  
  }


  onClickDelete(id: number) {
    this.announcementService.delete(id).subscribe({
      next: () => {
        this.getAnnouncementbyStatus();    
      },
      error: error => { 
      }
    })

}


  getAnnouncementbyStatus() {
    this.announcementService.getAnnouncementByStatus("En attente").subscribe(  
     (data) => {
       this.announcements=data;      
       console.log('::::::::::::::: >>>>>>>>>>>>>>>>>>>>>>' ,  this.announcements)
     }
    )
 }


 updateStatusDemande(deamndeId:number , newStatus: string){
  this.select(deamndeId);
   this.announcementService.updateStatusDemande(this.selectedServiceByid ,newStatus ).subscribe(
     (data) => {
       console.log('Statut du demande mis à jour', data);
       this.getAnnouncementbyStatus();
     }, 
     (error) => {
       console.error('Erreur lors de la mise à jour du statut du deamnde', error);
     }
   )
   
 }


 selectedServiceByid?=-1; 
select(id?:number){
  this.selectedServiceByid=id ;
  this.announcementService.findById(this.selectedServiceByid).subscribe(
    res => {
      this.announcementsected=res
    }, 
    error =>{
      console.log("error lors de la selection de service by id pour afficher le details ")
    }
  )

}


}
