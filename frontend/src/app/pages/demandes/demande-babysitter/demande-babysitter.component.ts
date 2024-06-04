import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../service/demande.service';
import { UserService } from 'src/app/account/auth/services/user.service';

@Component({
  selector: 'app-demande-babysitter',
  templateUrl: './demande-babysitter.component.html',
  styleUrls: ['./demande-babysitter.component.scss']
})
export class DemandeBabysitterComponent implements OnInit {
  userConnected;
  userConnectedById;
  babysitterId: any;
  listDemande: Object;

  constructor(
    private demandeService:DemandeService,
    private userService:UserService,

  ) { }

  ngOnInit(): void {
    this.setConnectedUser();
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
        console.log(this.userConnectedById)
        this.babysitterId = this.userConnectedById.babysitter.id;
        console.log(this.babysitterId)    
        this.findDemandeByBabysitterId()  
      }, 
      error: error => console.error(error)
    });
  }

  findDemandeByBabysitterId(){
    if(this.babysitterId){
      this.demandeService.getByBabysitter(this.babysitterId).subscribe(
        (data) => {
          this.listDemande =data ;
        }
      )
    }else{
    }
  }


}
