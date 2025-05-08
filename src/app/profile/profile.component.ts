import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = null;
  editedProfile: any = {};
  showSettingsModal = false;
  saveSuccess = false;
  showHelp: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const savedProfile = this.profileService.getProfile();
    if (savedProfile) {
      this.userProfile = savedProfile;
    }
  }

  toggleSettings() {
    this.showSettingsModal = !this.showSettingsModal;
    if (this.showSettingsModal) {
      this.editedProfile = { ...this.userProfile };
    }
  }

  saveSettings() {
    if (this.profileService.saveProfile(this.editedProfile)) {
      this.userProfile = { ...this.editedProfile };
      this.showSettingsModal = false;
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    }
  }

  closeSettings() {
    this.showSettingsModal = false;
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.avatar = e.target.result;
        // Update in storage
        this.profileService.saveProfile(this.userProfile);
      };
      reader.readAsDataURL(file);
    }
  }
}
