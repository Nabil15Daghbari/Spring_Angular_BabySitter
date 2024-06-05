import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from 'src/app/account/auth/services/authentification.service';
import { UserService } from 'src/app/account/auth/services/user.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  ListeParent
  userForm:FormGroup
  isUpdateMode: boolean;
  selectedUserById: number;
  userSelected: any;
  constructor(
    private userService : UserService ,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private authentificationService : AuthentificationService,
  ) { }

  ngOnInit(): void {
    this.findAllResponsible();  
     
    this.userForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['123'],
      role:['Parent'],
      status:['0'],
      sexe:['', Validators.required],
   });
  }


  findAllResponsible(){
    this.userService.findByRole('Parent').subscribe(
      (result) => {
        this.ListeParent =result ; 
      }
    )
  } 

  onClickEdit(id: number , exlargeModalSave) {
    this.isUpdateMode = true;
    this.selectedUserById = id;
    // 1. Récupérer le devis sélectionné par son ID
    this.userService.findById(id)
    .subscribe({
      next: result => {
        this.userSelected =result ;
        this.userForm.patchValue(result);
      },
      error: error => console.error(error)
    });
    // Ouvrir le modal
    this.verificationModal(exlargeModalSave)
  }

  updateStatus(userId, idStatus) {
    this.userService
      .putStatusUsers(userId, idStatus, this.ListeParent[0])
      .subscribe((response) => {
        this.modalService.dismissAll();
        this.findAllResponsible();
      });
  }


  OnSaveUser() {
    debugger
    const formData =  this.userForm.value;  
    if (this.isUpdateMode) {
      // Mode mise à jour
    this.userService.save(formData).subscribe({
      next: () => {
        this.findAllResponsible();
        this.resetFormAndHideModal();
      },
      error: error => {
        console.log("Erreur lors de la mise à jour d'utilisateur'", error);
      }
    });
    
    } else {  
      // Mode ajout
      this.authentificationService.register(formData).subscribe({
        next: () => {
          this.findAllResponsible();
          this.resetFormAndHideModal();
          this.userForm.get('password').patchValue("123") ;
          this.userForm.get('role').patchValue("Parent"); 
          this.userForm.get('status').patchValue('0');
              },
        error: error => {
          console.log("Erreur lors de la création d'utilisateur", error);
        }
      });
    }
  }

   
  resetFormAndHideModal() {
    this.isUpdateMode = false;
    this.hidenModal(); 
  }

  hidenModal(){
    this.userForm.reset(); 
    this.modalService.dismissAll(); 
  }


    /**
   * Open modal
   * @param content modal content
   */
    verificationModal(content: any) { 
      this.modalService.open(content, { size: 'lg' });
    }



     
  }
