import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/account/auth/services/user.service';
import { AvisService } from '../service/avis.service';

@Component({
  selector: 'app-announcement-babysitter',
  templateUrl: './announcement-babysitter.component.html',
  styleUrls: ['./announcement-babysitter.component.scss']
})
export class AnnouncementBabysitterComponent implements OnInit {
  announcementForm:FormGroup;
  announcements: Array<any> = []
  announcementsected: any = {}
  isUpdateMode = false;
  announcement: any;
  userConnected: any;
  babysitterIdConnecter: number;
  userConnectedById:any
  constructor(
    private announcementService: AnnouncementService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private userService:UserService,
   

  ) { }

  ngOnInit(): void {
    this.setConnectedUser();
    this.announcementForm=this.formBuilder.group({
      name: ['', Validators.required],
      tel: ['', Validators.required],
      nombreEnfant: ['', Validators.required],
      typeService: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      adresse: ['', Validators.required], 
      role: ['BabySitter', Validators.required], 
      status: ['En attente', Validators.required], 
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
        this.babysitterIdConnecter = this.userConnectedById.babysitter.id;
        this.getAnnouncementbyrole();
      }, 
      error: error => console.error(error)
    });
  }


  getAnnouncementbyrole() {
     this.announcementService.findByIdBabysiiter(this.babysitterIdConnecter).subscribe(
      (data) => {
        this.announcements=data;     
      }
     )
  }

  onClickEdit(id: number , content) {
    this.isUpdateMode = true;
    this.selectedServiceByid = id;
    this.announcementService.findById(id).subscribe({
      next: result => {
        this.announcementForm.patchValue(result);
      },
      error: error => console.error(error)
    });
   this.verificationModal(content);
  }


 
resetFormAndHideModal() {
  this.isUpdateMode = false;
  this.selectedServiceByid = null;
  this.announcementForm.reset();
  this.hidenModal();
}

OnSaveAnnouncement() {
  const formData: any = this.announcementForm.value;
  if (this.isUpdateMode) {
    
    this.announcementService.save(this.selectedServiceByid, formData , null , null).subscribe({
      next: () => {
        this.resetFormAndHideModal();
        this.getAnnouncementbyrole();
      },
      error: error => {
      }
    });
  } else {  
    this.announcementService.save(null, formData , null ,this.babysitterIdConnecter ).subscribe({
      next: () => {
        this.resetFormAndHideModal();   
        this.getAnnouncementbyrole();
            },
      error: error => {
      }
    });
  }
}

  findById(id: number) {
    this.announcementService.findById(id).subscribe({
      next: result => this.announcement = result,
      error: error => console.error(error)
    })
  }

  onClickDelete(id: number) {
      this.announcementService.delete(id).subscribe({
        next: () => {
          this.getAnnouncementbyrole();    
        },
        error: error => { 
        }
      })
  
  }

  verificationModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  
  hidenModal(){
    this.announcementForm.get('role').patchValue("BabySitter");
    this.announcementForm.get('status').patchValue("En attente");
    this.modalService.dismissAll();
  }

selectedServiceByid?=-1; 
select(id?:number){
  this.selectedServiceByid=id ;
  this.announcementService.findById(this.selectedServiceByid).subscribe(
    res => {
      this.announcementsected=res
    }, 
    error =>{
    }
  )

}





}
