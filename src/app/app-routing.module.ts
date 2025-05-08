import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';
import { ParametresComponent } from './parametres/parametres.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { SeconnecterComponent } from './seconnecter/seconnecter.component';
import { CreercompteComponent } from './creercompte/creercompte.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientsComponent } from './patients/patients.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ModifierProfileComponent } from './modifier-profile/modifier-profile.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { MessagesdComponent } from './messagesd/messagesd.component';

const routes: Routes = [
  { path: 'patient', component: PatientComponent },
  { path: 'parametres', component:ParametresComponent },
  { path: 'notifications', component:NotificationsComponent },
  { path: 'rendezvous', component:RendezvousComponent },
  { path: 'messages', component:MessagesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'acceuil', component:AcceuilComponent },
  { path: 'seconnecter', component : SeconnecterComponent },
  { path: 'creercompte', component : CreercompteComponent },
  { path: 'admin', component : AdminComponent },
  { path: 'doctor', component : DoctorComponent },
  { path: 'patients', component : PatientsComponent },
  { path: 'consultation', component : ConsultationComponent},
  { path: 'modifierprofile', component : ModifierProfileComponent},
  { path: 'analyse', component : AnalyseComponent},
  { path: 'messagesd', component : MessagesdComponent},
  { path: '', redirectTo: '/patient', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
