import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandesRoutingModule } from './demandes-routing.module';
import { DemandeBabysitterComponent } from './demande-babysitter/demande-babysitter.component';
import { DemandePArentComponent } from './demande-parent/demande-parent.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DemandeAccepteComponent } from './demande-accepte/demande-accepte.component';


@NgModule({
  declarations: [
    DemandeBabysitterComponent,
    DemandePArentComponent,
    DemandeAccepteComponent
  ],
  imports: [
    CommonModule,
    DemandesRoutingModule,
    NgbDropdownModule
  ]
})
export class DemandesModule { }
