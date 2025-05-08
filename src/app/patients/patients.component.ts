import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.interface';

@Component({
  selector: 'app-patient',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  showNewPatientForm = false;
  newPatientForm: FormGroup;
  searchForm: FormGroup;
  selectedFiles: File[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  loading = false;
  errorMessage = '';
  totalPatients = 0;
  sortBy: 'name' | 'date' | 'status' = 'name';

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.newPatientForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      address: [''],
      medicalNotes: ['']
    });

    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
      this.filteredPatients = data;
      this.updateTotalPatients();
    });

    this.searchForm.get('search')?.valueChanges.subscribe(term => {
      this.filteredPatients = this.patients.filter(p =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }

  submitNewPatient(): void {
    if (this.newPatientForm.valid) {
      const formData = this.newPatientForm.value;
      const patientData = {
        ...formData,
        documents: this.selectedFiles
      };

      if (this.selectedPatient) {
        // Mode édition
        this.patientService.updatePatient(this.selectedPatient.id!, patientData).subscribe({
          next: (updatedPatient) => {
            const index = this.patients.findIndex(p => p.id === updatedPatient.id);
            if (index !== -1) {
              this.patients[index] = updatedPatient;
              this.filteredPatients = [...this.patients];
              this.updateTotalPatients();
            }
            this.resetForm();
          },
          error: (error) => console.error('Erreur lors de la mise à jour:', error)
        });
      } else {
        // Mode création
        this.patientService.addPatient(patientData).subscribe({
          next: (newPatient) => {
            this.patients = [...this.patients, newPatient];
            this.filteredPatients = [...this.patients];
            this.updateTotalPatients();
            this.resetForm();
          },
          error: (error) => console.error('Erreur lors de la création:', error)
        });
      }
    }
  }

  public resetForm(): void {
    this.selectedPatient = null;
    this.selectedFiles = [];
    this.newPatientForm.reset();
    this.showNewPatientForm = false;
  }

  onFileSelect(event: any): void {
    if (event.target.files) {
      for (let file of event.target.files) {
        this.selectedFiles.push(file);
      }
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        this.selectedFiles.push(event.dataTransfer.files.item(i)!);
      }
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  viewDocument(doc: File): void {
    const url = URL.createObjectURL(doc);
    window.open(url, '_blank');
  }

  downloadDocument(doc: File): void {
    const url = URL.createObjectURL(doc);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  getAvatarColor(name: string): string {
    const colors = ['#f44336', '#3f51b5', '#009688', '#ff9800', '#9c27b0'];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  }

  getPatientStatus(patient: Patient): string {
    if (!patient.lastConsultation) return 'new';
    
    const lastVisit = new Date(patient.lastConsultation);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 30) return 'active';
    if (diffDays <= 90) return 'inactive';
    return 'archived';
  }

  getActivePatients(): number {
    return this.filteredPatients.filter(patient => 
      this.getPatientStatus(patient) === 'active'
    ).length;
  }

  getNewPatients(): number {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return this.filteredPatients.filter(patient => {
      if (!patient.lastConsultation) return true;
      const patientDate = new Date(patient.lastConsultation);
      return patientDate >= thirtyDaysAgo;
    }).length;
  }

  filterByStatus(event: any) {
    const status = event.target.value;
    this.loading = true;
    
    try {
      if (status === 'all') {
        this.filteredPatients = [...this.patients];
      } else {
        this.filteredPatients = this.patients.filter(patient => 
          this.getPatientStatus(patient) === status
        );
      }
    } catch (error) {
      this.errorMessage = 'Erreur lors du filtrage des patients';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  sortPatients(sortBy: 'name' | 'date' | 'status') {
    this.sortBy = sortBy;
    
    this.filteredPatients.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.lastConsultation || '').getTime() - 
                 new Date(a.lastConsultation || '').getTime();
        case 'status':
          return this.getPatientStatus(b).localeCompare(this.getPatientStatus(a));
        default:
          return 0;
      }
    });
  }

  loadPatients() {
    this.loading = true;
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.filteredPatients = patients;
        this.totalPatients = patients.length;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des patients';
        this.loading = false;
        console.error(error);
      }
    });
  }

  editPatient(patient: Patient) {
    this.selectedPatient = patient;
    this.newPatientForm.patchValue(patient);
    this.showNewPatientForm = true;
  }

  deletePatient(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.patients = this.patients.filter(p => p.id !== id);
          this.filteredPatients = this.filteredPatients.filter(p => p.id !== id);
          this.updateTotalPatients();
        },
        error: (error: any) => {
          console.error('Error deleting patient:', error);
        }
      });
    }
  }

  private updateTotalPatients(): void {
    this.totalPatients = this.patients.length;
  }
}
