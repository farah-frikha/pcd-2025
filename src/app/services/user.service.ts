import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;

  constructor() { }

  // Méthode pour enregistrer l'utilisateur
  setUser(user: any) {
    this.user = user;
  }

  // Méthode pour récupérer l'utilisateur
  getUser() {
    return this.user;
  }
}
