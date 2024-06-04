import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvisService } from '../service/avis.service';
import { UserService } from 'src/app/account/auth/services/user.service';

@Component({
  selector: 'app-offre-babysitter',
  templateUrl: './offre-babysitter.component.html',
  styleUrls: ['./offre-babysitter.component.scss']
})
export class OffreBabysitterComponent implements OnInit {
  listAnnouncementBabySitter ;
  avisForm:FormGroup
  selectedAnnouncementId:number
  announcementSelected:any 

  userConnected;
  userConnectedById;
  idParentConnecter; 
  listAvis

  constructor(
    private announcementService: AnnouncementService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private avisService :AvisService ,
    private userService:UserService,

    ) { }

  ngOnInit(): void {
    this.getAnnouncementByStatusAndRole();
    this.setConnectedUser();
    this.avisForm=this.formBuilder.group({
      contenu: ['', Validators.required],
    })  
  }


  setConnectedUser() {
    const userConnectedString = localStorage.getItem('UserConnected');
    if (userConnectedString) {
      this.userConnected = JSON.parse(userConnectedString);
      }
    
    this.findByIdUser();
  }

  findByIdUser() {
    this.userService.findById(this.userConnected.id).subscribe({
      next: result => {
        this.userConnectedById = result;
        console.log( this.userConnectedById )        
        this.idParentConnecter = this.userConnectedById?.parent?.id;
      }, 
      error: error => console.error(error)
    });
  }



  getAnnouncementByStatusAndRole( ){
    this.announcementService.getAnnouncementByStatusAndRole("Accepter" , "Babysitter").subscribe(
      (data) => {
           this.listAnnouncementBabySitter=data ;
      }
    )
  }


  selectedAnnouncement(id:number , content:any){
    this.selectedAnnouncementId=id;
    this.announcementService.findById(id).subscribe(
      (data)=>{
        this.announcementSelected=data;
        this.verificationModal(content)
        this.getAvis();
      }
    )
  
  } 

  verificationModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  saveAvis(){
    this.avisService.save(null , this.avisForm.value , this.idParentConnecter ,this.selectedAnnouncementId ).subscribe({
      next :data => {
        this.avisForm.reset();
         this.modalService.dismissAll();
      }
    })
  }


  getAvis(){
    this.avisService.getAvisByAnnouncement(this.selectedAnnouncementId).subscribe({
      next:data => {
         this.listAvis=data ;
      }
    })
  }
  

}
