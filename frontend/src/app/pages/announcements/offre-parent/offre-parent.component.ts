import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../service/announcement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../demandes/service/demande.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/account/auth/services/user.service';
import { FileHandle } from '../../demandes/models/file-handle.model';
import { Demande, demandeFormData } from '../../demandes/models/demande';

@Component({
  selector: 'app-offre-parent',
  templateUrl: './offre-parent.component.html',
  styleUrls: ['./offre-parent.component.scss']
})
export class OffreParentComponent implements OnInit {

  listAnnouncementParent ;
  selectedAnnouncementId:number
  announcementSelected:any 
  demandeForm:FormGroup ;
  candidature: Demande;

  userConnected: any;
  babysitterIdConnecter: number;
  userConnectedById:any


  constructor(
    private announcementService: AnnouncementService,
    private modalService:NgbModal, 
    private formBuilder :FormBuilder,
    private demandeService:DemandeService,
    private sanitizer: DomSanitizer,
    private userService:UserService,

  ) { }

  ngOnInit(): void {
    this.getAnnouncementByStatusAndRole();

    this.setConnectedUser();

    this.demandeForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      cin: ['', Validators.required],
      status:['En attente', Validators.required],
      document: this.formBuilder.array([]),
      
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
        this.babysitterIdConnecter = this.userConnectedById.babysitter.id;
      }, 
      error: error => console.error(error)
    });
  }


  getAnnouncementByStatusAndRole( ){
    this.announcementService.getAnnouncementByStatusAndRole("Accepter" , "Parent").subscribe(
      (data) => {
           this.listAnnouncementParent=data ;  
      }
    )
  }

  onFileSelected(event){
    if(event.target.files){
     const file = event.target.files[0];
 
     const fileHandle :FileHandle={
       file:file ,
       url: this.sanitizer.bypassSecurityTrustUrl(
         window.URL.createObjectURL(file)
       )
     }
     const documentControl = this.demandeForm.get('document');
     if (documentControl instanceof FormArray) {
      documentControl.push(new FormControl(fileHandle));            
     }
   }
 }



  selectedAnnouncement(id:number , content:any){
    this.selectedAnnouncementId=id;
    this.announcementService.findById(id).subscribe(
      (data)=>{
        this.announcementSelected=data;
        this.verificationModal(content)
      }
    )
  
  }  


  verificationModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  prepareFormData(demandeFormData: demandeFormData):FormData{
    const formData = new FormData();
    formData.append(
      'demande',   /** lazeeeeem tkoun d meme non dans le controller */
      new Blob([JSON.stringify(demandeFormData)] , {type:'application/json'})
    );
    if (!demandeFormData.document) {     
    console.error('document est null ou undefined');
    return formData;
  }
  for (var i = 0; i < demandeFormData.document.length; i++) {
    if (demandeFormData.document[i] && demandeFormData.document[i].file) {
      formData.append(
        'imageFile',
        demandeFormData.document[i].file,
        demandeFormData.document[i].file.name
      );
    } else {
      console.error('Le fichier est null pour document à l\'index', i);
    }
  }
  console.log('Après la boucle :', demandeFormData.document.length);
    return formData ;
  }
 

  onSaveDemande(){
    if(this.demandeForm.valid){
     let formData:demandeFormData = this.demandeForm.value ;
     let documentController = this.demandeForm.get('document') as FormArray ;
       documentController.clear();
     const prepardDemandeFormData = this.prepareFormData(formData)  ;
     console.log(prepardDemandeFormData)
             console.log(formData); 
     this.demandeService.create(prepardDemandeFormData  , this.babysitterIdConnecter , this.selectedAnnouncementId).subscribe(
       (data)=>{
         this.candidature = data ;
         console.log('condudature envoyer');+
         this.modalService.dismissAll();
         console.log(this.candidature)
       }
     )   
    }else{   
     console.log('demande form nest pas valide ')
    }    
  }



}
