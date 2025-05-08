import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly STORAGE_KEY = 'user_profile';

  saveProfile(profileData: any): boolean {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profileData));
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  }

  getProfile(): any {
    const profile = localStorage.getItem(this.STORAGE_KEY);
    return profile ? JSON.parse(profile) : null;
  }
}
