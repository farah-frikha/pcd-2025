import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  activeSection: string = '';

  constructor(private router: Router) {}

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  navigateToCreateAccount() {
    this.router.navigate(['/creercompte']);
  }

  navigateToLogin() {
    this.router.navigate(['/seconnecter']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
