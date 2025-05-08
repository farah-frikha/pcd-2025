// src/app/models/rendezvous.model.ts
export interface RendezVous {
    patient_id: number;
    doctor_id: number;
    consultation_type: string;
    date: string;  // format YYYY-MM-DD
    time: string;  // format HH:MM
    mode: string;  // 'présentiel' ou 'vidéo'
  }
  