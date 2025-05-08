import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationComponent } from './consultation.component';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { BrowserModule } from '@angular/platform-browser'; // Pour les pipes comme titlecase et date

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule // Ajouté pour les pipes et directives globales
  ],
  exports: [
    
  ]
})
export class ConsultationModule {}
