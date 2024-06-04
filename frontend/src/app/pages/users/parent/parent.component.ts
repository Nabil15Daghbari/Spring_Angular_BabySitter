import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  constructor(
    private userService : UserService ,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.findAllResponsible();  
  }


  findAllResponsible(){
    this.userService.findByRole('Parent').subscribe(
      (result) => {
        this.ListeParent =result ; 
      }
    )
  }


  updateStatus(userId, idStatus) {
    this.userService
      .putStatusUsers(userId, idStatus, this.ListeParent[0])
      .subscribe((response) => {
        this.modalService.dismissAll();
        this.findAllResponsible();
      });
  }

}
