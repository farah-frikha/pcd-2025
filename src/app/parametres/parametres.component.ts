import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Settings {
  language: string;
  theme: string;
  notifications: {
    [key: string]: boolean;
  };
  appointmentReminder: string;
  shareHealthData: boolean;
  historyDuration: number;
  privacy: {
    profileVisibility: string;
    activityStatus: boolean;
  };
  security: {
    twoFactorAuth: boolean;
  };
  accessibility: {
    fontSize: number;
    highContrast: boolean;
    reducedMotion: boolean;
  };
}

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  showHelp: boolean = false;
  currentSection: string = 'general';
  hasChanges: boolean = false;
  isSaving: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  messageTimeout: any;
  showResetEffect: boolean = false;
  resetTimeout: any;
  settings: Settings = {
    language: 'fr',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    appointmentReminder: '1',
    shareHealthData: true,
    historyDuration: 12,
    privacy: {
      profileVisibility: 'public',
      activityStatus: true
    },
    security: {
      twoFactorAuth: false
    },
    accessibility: {
      fontSize: 16,
      highContrast: false,
      reducedMotion: false
    }
  };

  originalSettings: Settings = JSON.parse(JSON.stringify(this.settings));
  notificationTypes = [
    { value: 'email', label: 'Email', icon: 'fas fa-envelope' },
    { value: 'sms', label: 'SMS', icon: 'fas fa-sms' },
    { value: 'push', label: 'Notifications Push', icon: 'fas fa-bell' }
  ];
  notificationState: { [key: string]: string } = {}; // Add this line to define notificationState

privacyOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Privé' },
  { value: 'friends', label: 'Amis' }
];
themes = [
  { value: 'light', label: 'Clair', color: '#ffffff' },
  { value: 'dark', label: 'Sombre', color: '#000000' },
  { value: 'blue', label: 'Bleu', color: '#007bff' }
];
 
  constructor() {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      this.settings = JSON.parse(saved);
    }
  }

  async saveSettings() {
    if (this.isSaving) return;
    
    this.isSaving = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userSettings', JSON.stringify(this.settings));
      this.showSuccessMessage = true;
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
      }
      this.messageTimeout = setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      this.showErrorMessage = true;
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
      }
      this.messageTimeout = setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    } finally {
      this.isSaving = false;
    }
  }

  checkChanges() {
    this.hasChanges = JSON.stringify(this.settings) !== JSON.stringify(this.originalSettings);
  }

  onSettingChange() {
    this.checkChanges();
  }

  cancelChanges() {
    this.settings = JSON.parse(JSON.stringify(this.originalSettings));
    this.hasChanges = false;
    this.showResetEffect = true;
    
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
    
    this.resetTimeout = setTimeout(() => {
      this.showResetEffect = false;
    }, 300);
  }

  changeLanguage(lang: string) {
    if (!lang) return;
    
    try {
      this.settings.language = lang;
      localStorage.setItem('preferredLanguage', lang);
      this.onSettingChange();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }

  onLanguageChange(event: any) {
    const lang = event?.target?.value;
    if (lang) {
      this.changeLanguage(lang);
    }
  }

  ngOnDestroy() {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
    if (this.showHelp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  handleNotificationChange(notificationType: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.settings.notifications[notificationType] = isChecked;
    this.onSettingChange();
  }
  onInputChange(): void {
    console.log('Input changed');
  }
  applyTheme(theme: string): void {
    this.settings.theme = theme;
    // Add logic here to apply the theme, e.g., updating a CSS class or saving the preference
  }
  notificationFeedback: { [key: string]: string } = {}; // Add this property to fix the error


}
