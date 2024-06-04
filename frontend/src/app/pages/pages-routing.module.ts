import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  

 
  { path: '', loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'profils', loadChildren: () => import('./profils/profils.module').then(m => m.ProfilsModule) },
  { path: 'demandes', loadChildren: () => import('./demandes/demandes.module').then(m => m.DemandesModule) },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
