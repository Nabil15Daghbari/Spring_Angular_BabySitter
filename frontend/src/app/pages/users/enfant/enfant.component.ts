import { EnfantService } from './../services/enfant.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/account/auth/services/user.service';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.scss']
})
export class EnfantComponent implements OnInit {

  userConnected;
  userConnectedById;
  idParentConnecter; 
  listEnfant ;
  enfantForm:FormGroup  
  isUpdateMode: boolean;
  selectedServiceByid: number;

  constructor(
    private userService:UserService,
    private enfantService:EnfantService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,



  ) { }

  ngOnInit(): void {
    this.setConnectedUser();
    this.enfantForm=this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', Validators.required],
      sexe: ['', Validators.required],
      category: ['', Validators.required],
      adresse: ['', Validators.required], 

    })  
  }

  setConnectedUser() {
    const userConnectedString = localStorage.getItem('UserConnected');
    if (userConnectedString) {
      this.userConnected = JSON.parse(userConnectedString);
      }
    
    this.findById();
  }

  findById() {
    this.userService.findById(this.userConnected.id).subscribe({
      next: result => {
        this.userConnectedById = result;
        console.log( this.userConnectedById )        
        this.idParentConnecter = this.userConnectedById?.parent?.id;
        this.findEnfantByIdParent();
      }, 
      error: error => console.error(error)
    });
  }

  onClickEdit(id: number , content) {
    this.isUpdateMode = true;
    this.selectedServiceByid = id;
    this.enfantService.findById(id).subscribe({
      next: result => {
        this.enfantForm.patchValue(result);
        console.log(result)
      },
      error: error => console.error(error)
    });
   this.verificationModal(content);
  }


  verificationModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  resetFormAndHideModal() {
    this.isUpdateMode = false;
    this.selectedServiceByid = null;
    this.enfantForm.reset();
    this.hidenModal();
  }
  
  hidenModal(){
  //  this.announcementForm.get('role').patchValue("Parent");
   // this.announcementForm.get('status').patchValue("En attente");
    this.modalService.dismissAll();
  }


  OnSaveAnnouncement() {
    const formData: any = this.enfantForm.value;
    if (this.isUpdateMode) {
      this.enfantService.save(this.selectedServiceByid, formData , null).subscribe({
        next: () => {
          this.resetFormAndHideModal();
          this.findEnfantByIdParent();    
        },
        error: error => {
        }
      });
    } else {  
      this.enfantService.save(null, formData , this.idParentConnecter ).subscribe({
        next: () => {
          this.resetFormAndHideModal();   
          this.findEnfantByIdParent();      
        
              },
        error: error => {
        }
      });
    }
  }
  
 
  
    onClickDelete(id: number) {
        this.enfantService.delete(id).subscribe({
          next: () => {
            
            this.findEnfantByIdParent();
          },
          error: error => {
          
          }
        })
    
    }










  findEnfantByIdParent() {
    this.enfantService.findEnfnatByParentId(this.idParentConnecter).subscribe(
      (data) => {
        this.listEnfant =data ;
      }
    ) 
  
  }

}
