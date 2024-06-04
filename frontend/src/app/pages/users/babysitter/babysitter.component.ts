import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from 'src/app/account/auth/services/authentification.service';
import { UserService } from 'src/app/account/auth/services/user.service';

@Component({
  selector: 'app-babysitter',
  templateUrl: './babysitter.component.html',
  styleUrls: ['./babysitter.component.scss']
})
export class BabysitterComponent implements OnInit {
  ListeBabySitter
  constructor(
    private userService : UserService ,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private authentificationService : AuthentificationService,
  ) { }

  ngOnInit(): void {
    this.findAllResponsible();  
  }


  findAllResponsible(){
    this.userService.findByRole('Babysitter').subscribe(
      (result) => {
        this.ListeBabySitter =result ; 
      }
    )
  }


  updateStatus(userId, idStatus) {
    this.userService
      .putStatusUsers(userId, idStatus, this.ListeBabySitter[0])
      .subscribe((response) => {
        this.modalService.dismissAll();
        this.findAllResponsible();
      });
  }

}
