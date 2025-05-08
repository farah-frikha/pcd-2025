import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'; // adapte le chemin si besoin

interface User {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  secu?: string;
  birthDate?: string;
  bloodType?: string;
  specialite?: string;
  rpps?: string;
  termsAccepted: boolean;
}

@Component({
  selector: 'app-creercompte',
  templateUrl: './creercompte.component.html',
  styleUrls: ['./creercompte.component.css'],
  standalone: false
})
export class CreercompteComponent {
  user: User = {
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    secu: '',
    birthDate: '',
    bloodType: '',
    specialite: '',
    rpps: '',
    termsAccepted: false
  };

  showSuccessMessage = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.user);

      const requestData = {
        prenom: this.user.firstName,
        nom: this.user.lastName,
        email: this.user.email,
        telephone: this.user.phone,
        password: this.user.password,
        role: this.user.role,
        num_secu_sociale: this.user.secu,
        date_naissance: this.user.birthDate,
        groupe_sanguin: this.user.bloodType,
        specialite: this.user.specialite,
        numero_rpps: this.user.rpps
      };

      this.authService.register(requestData).subscribe({
        next: response => {
          console.log('Inscription réussie :', response);
          this.showSuccessMessage = true;

          // Redirection après 2 secondes
          setTimeout(() => {
            if (this.user.role === 'docteur') {
              this.router.navigate(['/doctor']);
            } else if (this.user.role === 'patient') {
              this.router.navigate(['/patient']);
            }
          }, 2000);
        },
        error: err => console.error('Erreur d’inscription :', err)
      });
    } else {
      console.warn('Formulaire invalide');
    }
  }

  isFormValid(): boolean {
    const baseValid = this.user.role !== '' &&
                      this.user.firstName !== '' &&
                      this.user.lastName !== '' &&
                      this.user.email !== '' &&
                      this.user.phone !== '' &&
                      this.user.password !== '' &&
                      this.user.password === this.user.confirmPassword &&
                      this.user.termsAccepted;

    if (this.user.role === 'patient') {
      return baseValid &&
             this.user.secu !== '' &&
             this.user.birthDate !== '' &&
             this.user.bloodType !== '';
    }

    if (this.user.role === 'docteur') {
      return baseValid &&
             this.user.specialite !== '' &&
             this.user.rpps !== '';
    }

    return false;
  }
}
