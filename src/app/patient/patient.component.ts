import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface Doctor {
  id: string;
  nom: string;
  specialite: string;
  image: string;
  lastVisit?: string;
}

interface Prescription {
  id: number;
  doctorName: string;
  doctorImage: string;
  date: string;
  type: string;
  specialty: string;
  hospital: string;
  validUntil: string;
  isValid: boolean;
  imageUrl: string;
  notes?: string;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @ViewChild('slider') slider!: ElementRef;

  patient = {
    nom: 'Doe',
    prenom: 'John'
  };

  stats = {
    rdvCount: 5,
    totalDoctors: 15,
    totalAppointments: 25,
    totalPatients: 100
  };

  isMyDoctorsVisible = false;
  isPrescriptionsVisible = false;
  isViewPrescriptionVisible = false;
  selectedPrescription: Prescription | null = null;

  myDoctors: Doctor[] = [];
  allDoctors: Doctor[] = [];
  prescriptions: Prescription[] = [];
  
  footerData = {
    adresse: { rue: '123 Rue Example', ville: 'Paris' },
    contact: { tel: '01 23 45 67 89', email: 'contact@ams.fr' },
    horaires: {
      semaine: '8h-18h',
      samedi: '9h-12h',
      dimanche: 'Fermé'
    }
  };

  recentActivity = {
    doctorName: 'Smith',
    time: '10:30'
  };

  ngOnInit() {
    // Initialize mock data
  }

  showPrescriptions() {
    this.isPrescriptionsVisible = true;
  }

  hidePrescriptions() {
    this.isPrescriptionsVisible = false;
  }

  showMyDoctors() {
    this.isMyDoctorsVisible = true;
  }

  hideMyDoctors() {
    this.isMyDoctorsVisible = false;
  }

  hideViewPrescription() {
    this.isViewPrescriptionVisible = false;
    this.selectedPrescription = null;
  }

  viewPrescription(prescription: Prescription) {
    this.selectedPrescription = prescription;
    this.isViewPrescriptionVisible = true;
  }

  downloadPrescription(prescription: Prescription) {
    console.log('Downloading:', prescription);
  }

  printPrescription(prescription: Prescription) {
    console.log('Printing:', prescription);
  }

  sharePrescription(prescription: Prescription) {
    console.log('Sharing:', prescription);
  }

  bookAppointment(doctor: Doctor) {
    console.log('Booking appointment with:', doctor);
  }

  slidePrev() {
    if (this.slider) {
      this.slider.nativeElement.scrollLeft -= 300;
    }
  }

  slideNext() {
    if (this.slider) {
      this.slider.nativeElement.scrollLeft += 300;
    }
  }
}
