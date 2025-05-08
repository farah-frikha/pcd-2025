import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedDoctor = {
    name: 'Dr. Farah Frikha',
    specialty: 'Dermatologist',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    avatar: ''
  };

  activeSection: string = 'acceuil';
  today: Date = new Date();
  showChangePhotoMessage = false;

  constructor() {}

  ngOnInit() {}

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  triggerFileInput() {
    this.showChangePhotoMessage = true;
    setTimeout(() => {
      this.showChangePhotoMessage = false;
    }, 2000); // Le message disparaît après 2 secondes
    this.fileInput.nativeElement.click();
  }

  onProfileImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedDoctor.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
