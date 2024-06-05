import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserConnected } from 'src/app/account/auth/models/user';
import { UserService } from 'src/app/account/auth/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageModelService } from 'src/app/account/auth/services/image-model.service';
import { SharedService } from 'src/app/account/auth/services/shared.service';
import { ImageModel } from 'src/app/account/auth/models/ImageModel';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.scss']
})
export class ProfilAdminComponent implements OnInit {
  isCollapsed: boolean;
  profilFormSuperUserInterne:FormGroup
  changePasswordForm:FormGroup
  userConnected;
  userConnectedById;

  image: any;
  imageId: number = null;
  imageObject:ImageModel=null
  imageConditionAffichage=false;

  imgUrl : string | ArrayBuffer  ;
  file: File | null = null;
  imageSelectionner: any; 



  constructor(
    private FormBuilder:FormBuilder,  
    private userService:UserService,
    private adminServiceService :AdminService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private imageModelService : ImageModelService,
    private imageService: SharedService,



  ) { }

  ngOnInit(): void {
    this.isCollapsed = false;
    this.setConnectedUser();
    this.onClickEditSuperUserInterne(this.userConnected.id);


    this.changePasswordForm = this.FormBuilder.group({
      currentPassword:['', Validators.required],
      newPassword: ['', Validators.required],
      confirmationPassword: ['', Validators.required], 
    })

    this.profilFormSuperUserInterne = this.FormBuilder.group({
      id:[''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email:['', Validators.required],
      role:[],
      sexe:[],
      password:[],
      status:[],
      telephone:['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
    }) 
  }

  onUpdateSuperUserInterne() {
    // Vérifiez si le formulaire est valide avant de procéder à la mise à jour
    if (this.profilFormSuperUserInterne.valid) {
      // Créez un objet avec les données du formulaire
      const updatedUserInterne: UserConnected = {
        id: this.profilFormSuperUserInterne.value.id,
        firstname: this.profilFormSuperUserInterne.value.firstname,
        lastname: this.profilFormSuperUserInterne.value.lastname,
        email:this.profilFormSuperUserInterne.value.email,
        role:this.profilFormSuperUserInterne.value.role,
        sexe:this.profilFormSuperUserInterne.value.sexe,
        password:this.profilFormSuperUserInterne.value.password,
        status:this.profilFormSuperUserInterne.value.status,
      };
      const updatedUserInterneTechncien: any = {
        id: this.userConnectedById.admin.id,
        telephone: this.profilFormSuperUserInterne.value.telephone,
        adresse: this.profilFormSuperUserInterne.value.adresse,
        codePostal:this.profilFormSuperUserInterne.value.codePostal,
        user:{
          id:this.profilFormSuperUserInterne.value.id,   
        }
  
      };
      // Appelez la méthode de mise à jour appropriée
      this.userService.save(updatedUserInterne).subscribe({
        next: (result) => {
          console.log('Mise à jour réussie', result);
          this.profilFormSuperUserInterne.reset();  
        },
        error: (error) => { 
          console.error('Erreur lors de la mise à jour', error);
        },
      });
      this.adminServiceService.save(null , updatedUserInterneTechncien).subscribe({
        next: (result) => {
          console.log('Mise à jour réussie', result);
          this.profilFormSuperUserInterne.reset();
          this.findById();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
        },
      });
    } else {
      console.log('Formulaire invalide. Veuillez le corriger.');
    }
  }


  onClickEditSuperUserInterne(id: number ) {
    //  recupération par id user 
    this.userService.findById(id).subscribe({
      next: (result: UserConnected) => {
        // Remplir le formulaire avec les données de UserConnected
        this.profilFormSuperUserInterne.patchValue({
          id: result.id,
          firstname: result.firstname,
          lastname: result.lastname,
          email:result.email,
          role:result.role,
          sexe:result.sexe,
          password:result.password,
          status:result.status,
          adresse: result.admin?.adresse || '',
          telephone: result.admin?.telephone || '', // Utilisez le ? pour éviter les erreurs si client est null
          codePostal: result.admin?.codePostal || '',
        });
      },
      error: (error) => console.error(error),
    });
  }

  OnSubmit(){
    const formData = this.changePasswordForm.value;
    this.userService.changePassword(formData).subscribe({
      next :result => {
           this.changePasswordForm.reset();
  
      },
      error:error => {
  
      }
    }
    )
  }




  
setConnectedUser() {
  const userConnectedString = localStorage.getItem('UserConnected');
  if (userConnectedString) {
    this.userConnected = JSON.parse(userConnectedString);
    this.findById();
  }
}

findById(){
  this.userService.findById(this.userConnected.id).subscribe({
    next: result => {
      this.userConnectedById=result;
      this.loadImage();
    },
    error: error => console.error(error)
  });
   


}



delete(){
  this.imageModelService.delete(this.imageObject.id).subscribe(
    (data: any) => {
      this.loadImage();
      this.imageService.sendImage("");
      this.imageObject.id=null;
      this.imgUrl=null;
      this.modalService.dismissAll();
    },
    error => {
      console.error('Erreur lors du suppremer  de l\'image:', error);
    }
  );

}
  
loadImage(): void {
  this.imageModelService.getImageByUserId(this.userConnected.id)
    .subscribe(
      (data: any) => {
        if(data!=null){
          this.imageObject=data;
          this.image = data; 
          const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${this.image.picByte}`);
          this.image.safeUrl = safeUrl; 
          // ligne qui permet de syncronisé l'affichage de l'image dans le topbar 
          this.imageService.sendImage(this.image.safeUrl);
          this.imageConditionAffichage=true
        }else{
          console.log("image vide ");
          this.imageConditionAffichage=false;
          this.image='';
        }
         
      },
      error => {
        console.error('Erreur lors du chargement de l\'image:', error);
      }
    );
}



uploadImage(): void {
  if (this.file) {
    const userId = this.userConnectedById.id;
    console.log('this user id :::: ' , this.userConnectedById.id)
    if (this.imageObject && this.imageObject.id) {
      this.updateImage();
      
    } else {
      this.uploadNewImage(userId , null);
      this.loadImage();
    }
  }
}

getImageProfilUpload():string{
  if (this.imgUrl) {
    return this.imgUrl.toString();
  }

return  'assets/images/users/default.png';

}
updateImage() {
  if (this.file && this.imageObject.id ) {
    this.imageModelService.updateImage(this.imageObject.id , this.file).subscribe(
      response => {
        console.log('Image mise à jour avec succès:', response);
        // Ajoutez ici le code nécessaire en cas de succès
        this.loadImage();
        this.getImageProfilUpload()
        this.modalService.dismissAll();
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'image', error);
        // Ajoutez ici le code nécessaire en cas d'erreur
      }
    );
  } else {
    console.error('Fichier ou ID de l\'image non valide');
  }
}

uploadNewImage(userId: any , imageId:any): void {
  if (userId) {
    this.imageModelService.createOrUpdateImage(this.file, userId).subscribe(
      response => {
        this.imageSelectionner = response;
        console.log('Nouvelle image enregistrée avec succès. ID de l\'image sélectionnée:', this.imageId);
        this.loadImage();
        this.modalService.dismissAll();
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la nouvelle image', error);
      }
    );
  } else {
    console.error('ID utilisateur non trouvé');
  }
}

onFileInput(files: FileList | null): void {
  if (files) {
    this.file = files.item(0);
    console.log(this.file);
    if (this.file) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(this.file);
      fileReader.onload = (event) => {
        if (fileReader.result) {
          this.imgUrl = fileReader.result;
        }       
      };
    }
  }
}

getImageProfilByGener():string{
  if(this.userConnected && this.userConnected.sexe){
 

 }
return  'assets/images/users/default.png';

}
getProfileImage():string{
  if(this.userConnected && this.userConnected.sexe){
     if(this.userConnected.sexe.toLowerCase() === 'femme'){
       return 'assets/images/users/femme.png';
     }else if(this.userConnected.sexe.toLowerCase() === 'homme'){
       return 'assets/images/users/homme.png';
     }

  }
 return  'assets/images/users/default.png';
}
/**
 * Open center modal
 * @param centerDataModal center modal data
 */
centerModal(centerDataModal: any) {
this.modalService.open(centerDataModal, { centered: true });
}
centerModalUpload(centerDataModal: any) {
this.modalService.dismissAll();
this.modalService.open(centerDataModal, { centered: true });

}

}