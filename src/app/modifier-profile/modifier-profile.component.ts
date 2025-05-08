import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.css']
})
export class ModifierProfileComponent implements OnInit {
  profileForm: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  saveSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      specialite: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      adresse: ['', Validators.required],
      bio: [''],
      photo: [null]
    });
  }

  ngOnInit() {
    // Simulation du chargement des données du profil
    this.loadProfileData();
  }

  triggerFileInput() {
    document.getElementById('photo-upload')?.click();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.profileForm.patchValue({
          photo: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  loadProfileData() {
    const savedProfile = this.profileService.getProfile();
    if (savedProfile) {
      this.profileForm.patchValue(savedProfile);
      if (savedProfile.photo) {
        this.imagePreview = savedProfile.photo;
      }
    } else {
      // Charger les données par défaut si aucun profil n'est sauvegardé
      const defaultProfile = {
        nom: 'Dr. Jean Dupont',
        specialite: 'Cardiologue',
        email: 'jean.dupont@example.com',
        telephone: '0123456789',
        adresse: '123 rue de la Santé, 75001 Paris',
        bio: 'Cardiologue spécialisé avec plus de 10 ans d\'expérience.'
      };
      this.profileForm.patchValue(defaultProfile);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const profileData = {
        ...this.profileForm.value,
        photo: this.imagePreview,
        lastUpdated: new Date().toISOString()
      };

      if (this.profileService.saveProfile(profileData)) {
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      } else {
        this.errorMessage = 'Erreur lors de la sauvegarde';
      }
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
