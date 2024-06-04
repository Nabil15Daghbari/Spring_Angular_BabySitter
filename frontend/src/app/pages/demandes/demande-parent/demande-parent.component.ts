import { DemandeService } from './../service/demande.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/account/auth/services/user.service';
import { Demande } from '../models/demande';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../service/image-processing.service';

@Component({
  selector: 'app-demande-parent',
  templateUrl: './demande-parent.component.html',
  styleUrls: ['./demande-parent.component.scss']
})
export class DemandePArentComponent implements OnInit {


  listDemande:any;
  selectedDemandeId: number;
  demandeSelected: any;

  userConnected;
  userConnectedById;
  idParentConnecter; 


  constructor(
    private userService:UserService,
    private demandeService :DemandeService,
    private modalService:NgbModal ,
    private imageProcessingService:ImageProcessingService,



  ) { }

  ngOnInit(): void {
    this.setConnectedUser();

    
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
        this.getDemandeParent();

      }, 
      error: error => console.error(error)
    });
  }


  getDemandeParent(){
    this.demandeService.getByParent(this.idParentConnecter)
     .pipe(
      map((result: any) => {
        result = result.map(demande => this.imageProcessingService.createImageDemande(demande));
        console.log(result);
        return result;
      })
     )
    .subscribe({
      next: result => {
        this.listDemande=result ; 
      }
    })
  }

  selectedDemande(demandeId:number){
    this.selectedDemandeId =demandeId ; 
  this.demandeService.findById(demandeId).subscribe(
    (data) => {
      this.demandeSelected=data ;
      console.log(this.demandeSelected) ;
    }
  )
  }

  updateStatusDemande(deamndeId:number , newStatus: string){
    this.selectedDemande(deamndeId);
     this.demandeService.updateStatusDemande(this.selectedDemandeId ,newStatus ).subscribe(
       (data) => {
         console.log('Statut du demande mis à jour', data);
         this.getDemandeParent();
       }, 
       (error) => {
         console.error('Erreur lors de la mise à jour du statut du deamnde', error);
       }
     )
     
   }

    /**
  * Open modal
  * @param content modal content
  */
    verificationModal(content: any) {
      this.modalService.open(content, { size: 'lg' });
    }
}
