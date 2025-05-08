import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CommonModule } from '@angular/common';
import { ProfileService } from './services/profile.service';


// Composants
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { ParametresComponent } from './parametres/parametres.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { SeconnecterComponent } from './seconnecter/seconnecter.component';
import { CreercompteComponent } from './creercompte/creercompte.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ModifierProfileComponent } from './modifier-profile/modifier-profile.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { PatientsComponent } from './patients/patients.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { MessagesdComponent } from './messagesd/messagesd.component';

// Enregistrement de la locale française
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    RendezvousComponent,
    PatientComponent,
    ProfileComponent,
    MessagesComponent,
    ParametresComponent,
    NotificationsComponent,
    AcceuilComponent,
    SeconnecterComponent,
    CreercompteComponent,
    AdminComponent,
    DoctorComponent,
    ModifierProfileComponent,
    AnalyseComponent,
    PatientsComponent,
    ConsultationComponent,
    MessagesdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
