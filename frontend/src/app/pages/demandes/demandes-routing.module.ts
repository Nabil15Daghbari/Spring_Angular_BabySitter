import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeBabysitterComponent } from './demande-babysitter/demande-babysitter.component';
import { DemandePArentComponent } from './demande-parent/demande-parent.component';
import { DemandeAccepteComponent } from './demande-accepte/demande-accepte.component';

const routes: Routes = [
  {
    path:'suivi_demande',
    component:DemandeBabysitterComponent
  }, 
  {
    path:'demande_babysitter',
    component:DemandePArentComponent
  } , 
  {
    path:'demande_accepte' ,
    component:DemandeAccepteComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandesRoutingModule { }
