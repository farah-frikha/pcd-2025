import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RendezvousService } from '../services/RendezvousService'; // Importation du service avec le bon nom
import { Router } from '@angular/router'; // Pour naviguer vers d'autres pages

// Add these declarations at the top of the file, outside the component
declare const google: any;

interface Message {
  text: string;
  type: 'success' | 'error';
}

interface Rendezvous {
  id: number;
  date: string;
  time: string;
  doctorName: string;
  doctorImage: string;
  specialty: string;
  type: string;
  location: string;
  status: 'upcoming' | 'past' | 'cancelled';
  isVideoConsult: boolean;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  searchTerm: string = '';
  filterStatus: string = 'all';
  showNewRdvModal: boolean = false;

  doctors = [
    { id: 1, name: 'Dr. Smith', speciality: 'Cardiologue' },
    { id: 2, name: 'Dr. Johnson', speciality: 'Dermatologue' },
    { id: 3, name: 'Dr. Williams', speciality: 'Généraliste' }
  ];

  availableTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  appointment = {
    doctor: '',
    date: '',
    time: '',
    reason: ''
  };

  showConfirmation = false;

  @ViewChild('appointmentForm') appointmentForm: any;

  newAppointment = {
    type: 'consultation',
    date: '',
    time: '',
    doctorId: 0,
    isVideoConsult: false
  };

  message: Message = { text: '', type: 'success' };
  filteredAppointments: Rendezvous[] = [];

  constructor(private rendezvousService: RendezvousService, private router: Router) {}

  ngOnInit() {
    this.loadAppointments(); // Chargement des rendez-vous lors de l'initialisation
    this.initMap();
  }

  initMap() {
    // Ensure the google object is available
    if (typeof google !== 'undefined' && google.maps) {
      const mapOptions = {
        center: { lat: 36.813749572243324, lng: 10.06119097568831 },
        zoom: 12
      };
      
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const map = new google.maps.Map(mapElement, mapOptions);
        new google.maps.Marker({
          position: mapOptions.center,
          map: map,
          title: 'AMS Health'
        });
      }
    }
  }

  loadAppointments() {
    // Récupérer les rendez-vous depuis l'API
    const patientId = 1; // Remplacer par l'ID du patient actuellement connecté
    this.rendezvousService.getRendezVousByPatient(patientId).subscribe(
      (appointments: Rendezvous[]) => {
        this.filteredAppointments = appointments;
      },
      (error: any) => { // Typage de 'error'
        console.error('Erreur lors de la récupération des rendez-vous', error);
      }
    );
  }

  createAppointment() {
    const appointmentData = {
      patient_id: 1, // Remplacer par l'ID du patient actuel
      doctor_id: this.newAppointment.doctorId,
      consultation_type: this.newAppointment.type,
      date: this.newAppointment.date,
      time: this.newAppointment.time,
      mode: this.newAppointment.isVideoConsult ? 'vidéo' : 'présentiel'
    };

    this.rendezvousService.createRendezVous(appointmentData).subscribe(
      (response) => {
        console.log('Rendez-vous créé avec succès', response);
        this.message = { text: 'Rendez-vous créé avec succès !', type: 'success' };
        this.loadAppointments(); // Recharger les rendez-vous après soumission
      },
      (error: any) => { // Typage de 'error'
        console.error('Erreur lors de la création du rendez-vous', error);
        this.message = { text: 'Erreur lors de la création du rendez-vous', type: 'error' };
      }
    );
  }

  editAppointment(rdv: Rendezvous) {
    // Implémenter la logique d'édition des rendez-vous
    console.log('Editing appointment:', rdv);
  }

  cancelAppointment(rdv: Rendezvous) {
    // Implémenter la logique d'annulation
    console.log('Cancelling appointment:', rdv);
  }

  startVideoCall(rdv: Rendezvous) {
    // Implémenter la logique de démarrage d'un appel vidéo
    console.log('Starting video call for:', rdv);
  }

  filterNotifications(event: any) {
    const value = event.target.value;
    // Implémenter un filtrage selon le statut
  }

  handleNotificationChange(type: string, event: any) {
    // Implémenter le changement de notifications
  }

  onSubmit() {
    if (this.appointmentForm.form.valid) {
      this.showConfirmation = true;
      // Here you would typically save the appointment to your backend
    }
  }

  resetForm() {
    this.appointment = {
      doctor: '',
      date: '',
      time: '',
      reason: ''
    };
  }

  closeConfirmation() {
    this.showConfirmation = false;
    this.resetForm();
  }

  getDocterName(id: string): string {
    const doctor = this.doctors.find(d => d.id.toString() === id);
    return doctor ? doctor.name : '';
  }
}
