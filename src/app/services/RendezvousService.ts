// src/app/services/rendezvous.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous.model'; // Import du modèle

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  
  private apiUrl = 'http://127.0.0.1:5000/api/rendezvous'; // Assure-toi que l'URL est correcte

  constructor(private http: HttpClient) { }

  // Méthode pour créer un rendez-vous
  createRendezVous(rdv: RendezVous): Observable<any> {
    return this.http.post(this.apiUrl, rdv);
  }
  getRendezVousByPatient(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}`);
  }
  
  
  // Méthode pour récupérer les rendez-vous d'un docteur
  getRendezVousByDoctor(doctor_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${doctor_id}`);
  }
}
