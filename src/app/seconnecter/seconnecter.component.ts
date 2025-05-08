import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Importer le service

@Component({
  selector: 'app-seconnecter',
  templateUrl: './seconnecter.component.html',
  styleUrls: ['./seconnecter.component.css']
})
export class SeconnecterComponent {
  showPassword = false;

  loginData = {
    email: '',
    password: '', // ✅ Corrigé ici
    rememberMe: false,
    userType: '',
    specialite: '',
    dateNaissance: ''
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService // Injecter le service
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  isFormValid() {
    if (!this.loginData.email || !this.loginData.password || !this.loginData.userType) return false;
    if (this.loginData.userType === 'docteur' && !this.loginData.specialite) return false;
    if (this.loginData.userType === 'patient' && !this.loginData.dateNaissance) return false;
    return true;
  }

  onSubmit() {
    console.log("Tentative de connexion avec :", this.loginData);

    this.authService.authenticate(this.loginData).subscribe({
      next: (res) => {
        console.log('Connexion réussie', res);

        // Enregistrer les informations du patient dans le service
        if (res.user.role === 'patient') {
          this.userService.setUser(res.user);  // Enregistrer le patient
          this.router.navigate(['/patient']);
        } else if (res.user.role === 'docteur') {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert('Email ou mot de passe incorrect');
      }
    });
  }
}
