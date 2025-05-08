import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Patient } from '../models/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients = new BehaviorSubject<Patient[]>([]);
  patients$ = this.patients.asObservable();

  constructor() {
    // Initial dummy data
    this.patients.next([
      {
        id: 1,
        name: 'Jean Dupont',
        birthDate: '1980-05-15',
        phone: '0612345678',
        email: 'jean.dupont@email.com',
        address: '123 rue de Paris',
        lastConsultation: '2023-12-01',
        history: ''
      }
    ]);
  }

  getPatients(): Observable<Patient[]> {
    return this.patients$;
  }

  getCurrentId(): number {
    return Math.max(0, ...this.patients.value.map(p => p.id || 0));
  }

  addPatient(patientData: Partial<Patient>): Observable<Patient> {
    const newPatient: Patient = {
      id: this.getCurrentId() + 1,
      name: patientData.name || '',
      birthDate: patientData.birthDate || '',
      phone: patientData.phone || '',
      email: patientData.email || '',
      address: patientData.address || '',
      medicalNotes: patientData.medicalNotes,
      lastConsultation: new Date().toISOString(),
      history: '',
      documents: patientData.documents || []
    };

    const currentPatients = this.patients.value;
    this.patients.next([...currentPatients, newPatient]);
    return of(newPatient);
  }

  updatePatient(patientId: number, patientData: Partial<Patient>): Observable<Patient> {
    const currentPatients = this.patients.value;
    const index = currentPatients.findIndex(p => p.id === patientId);
    
    if (index === -1) {
      throw new Error('Patient non trouvé');
    }

    const updatedPatient: Patient = {
      ...currentPatients[index],
      ...patientData,
      id: patientId
    };

    currentPatients[index] = updatedPatient;
    this.patients.next([...currentPatients]);
    
    return of(updatedPatient);
  }

  deletePatient(id: number): Observable<void> {
    const currentPatients = this.patients.value;
    const updatedPatients = currentPatients.filter(p => p.id !== id);
    this.patients.next(updatedPatients);
    return of(void 0);
  }
}
