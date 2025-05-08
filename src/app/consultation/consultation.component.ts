import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  filteredConsultation: any[] = [];
  consultationRequests: any[] = [];
  pendingRequests: any[] = [];
  showRequestsModal = false;
  isEditing = false;

  newAppointment = {
    patientName: '',
    date: '',
    time: '',
    duration: '30',
    reason: '',
    status: 'scheduled'
  };

  ngOnInit() {
    // Initialisation des données
    this.filteredConsultation = [];
    this.consultationRequests = [
      { patientName: 'Jean Dupont', requestDate: '2025-05-01', reason: 'Consultation générale', preferredDate: '2025-05-10', status: 'pending' },
      { patientName: 'Marie Curie', requestDate: '2025-05-02', reason: 'Suivi médical', preferredDate: '2025-05-15', status: 'pending' }
    ];
    this.pendingRequests = [...this.consultationRequests]; // Initialisation avec les demandes en attente
  }
  getTodayAppointments(): string {
    const today = new Date().toISOString().split('T')[0]; // Format de date: "YYYY-MM-DD"
    const todayAppointments = this.filteredConsultation.filter(appointment => appointment.date === today);
    return todayAppointments.length > 0
      ? `${todayAppointments.length} rendez-vous aujourd'hui`
      : 'Aucun rendez-vous aujourd\'hui';
  }


  // Méthodes d'ajout de rendez-vous
  addAppointment(appointment: any) {
    this.filteredConsultation.push({...appointment});
    this.newAppointment = {
      patientName: '',
      date: '',
      time: '',
      duration: '30',
      reason: '',
      status: 'scheduled'
    };
  }

  // Gestion des demandes de consultation
  acceptRequest(request: any) {
    request.status = 'accepted';
    const index = this.pendingRequests.indexOf(request);
    if (index > -1) {
      this.pendingRequests.splice(index, 1);
    }
    // Ajouter la demande acceptée dans les rendez-vous
    this.filteredConsultation.push({
      patientName: request.patientName,
      date: request.preferredDate || new Date(),
      time: '09:00', // Heure par défaut
      duration: '30',
      reason: request.reason,
      status: 'scheduled'
    });
  }

  rejectRequest(request: any) {
    request.status = 'rejected';
    const index = this.pendingRequests.indexOf(request);
    if (index > -1) {
      this.pendingRequests.splice(index, 1);
    }
  }

  // Méthodes pour les filtres
  filterAppointments(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    // Implémenter la logique de filtrage
    this.filteredConsultation = this.filteredConsultation.filter(appointment =>
      appointment.patientName.toLowerCase().includes(searchTerm) ||
      appointment.reason.toLowerCase().includes(searchTerm)
    );
  }

  filterByStatus(event: any) {
    const selectedStatus = event.target.value;
    this.filteredConsultation = this.filteredConsultation.filter(appointment => appointment.status === selectedStatus);
  }

  filterByPriority(event: any) {
    // Implémenter le filtrage par priorité
  }

  // Gestion de l'état des rendez-vous
  getStatusLabel(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  // Modification et annulation de rendez-vous
  modifyAppointment(appointment: any) {
    this.isEditing = true;
    this.newAppointment = {...appointment};
  }

  cancelAppointment(appointment: any) {
    const index = this.filteredConsultation.indexOf(appointment);
    if (index > -1) {
      this.filteredConsultation.splice(index, 1);
    }
  }

  saveModification() {
    this.isEditing = false;
  }

  cancelModification() {
    this.isEditing = false;
    this.newAppointment = {
      patientName: '',
      date: '',
      time: '',
      duration: '30',
      reason: '',
      status: 'scheduled'
    };
  }

  // Affichage du modal des demandes
  toggleRequestsModal() {
    this.showRequestsModal = !this.showRequestsModal;
  }
}
