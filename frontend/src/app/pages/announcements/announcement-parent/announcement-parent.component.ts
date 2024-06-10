import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/account/auth/services/user.service';


@Component({
  selector: 'app-announcement-parent',
  templateUrl: './announcement-parent.component.html',
  styleUrls: ['./announcement-parent.component.scss']
})
export class AnnouncementParentComponent implements OnInit {
  announcementForm:FormGroup;
  announcements: Array<any> = []
  announcementsected: any = {}
  isUpdateMode = false;
  announcement: any;

  userConnected;
  userConnectedById;
  idParentConnecter; 

  constructor(
    private announcementService: AnnouncementService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private userService:UserService,


  ) { }

  ngOnInit(): void {
    this.setConnectedUser();
    this.announcementForm=this.formBuilder.group({
      nombreEnfant: ['', Validators.required],
      typeService: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      adresse: ['', Validators.required], 
      role: ['Parent', Validators.required], 
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
        console.log( this.userConnectedById )        
        this.idParentConnecter = this.userConnectedById?.parent?.id;
        this.getAnnouncementbyrole();
      }, 
      error: error => console.error(error)
    });
  }



  getAnnouncementbyrole() {
     this.announcementService.findByIdParent(this.idParentConnecter).subscribe(
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
        console.log(result)
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

hidenModal(){
  this.announcementForm.get('role').patchValue("Parent");
  this.announcementForm.get('status').patchValue("En attente");
  this.modalService.dismissAll();
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
    this.announcementService.save(null, formData , this.idParentConnecter , null).subscribe({
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

  /**
   * Open modal
   * @param exlargeModal modal content
   */
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
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
