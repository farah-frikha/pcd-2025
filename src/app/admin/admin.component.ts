import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isAuthenticated = false;
  username = '';
  password = '';
  loginError = false;

  users = [
    { name: 'Test User', email: 'test@example.com' }
  ];

  newUser = { name: '', email: '' };

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      this.isAuthenticated = true;
      this.loginError = false;
    } else {
      this.loginError = true;
    }
  }

  addUser() {
    if (this.newUser.name && this.newUser.email) {
      this.users.push({ ...this.newUser });
      this.newUser = { name: '', email: '' };
    }
  }

  editUser(user: any) {
    const newName = prompt("Modifier le nom :", user.name);
    const newEmail = prompt("Modifier l'email :", user.email);
    if (newName) user.name = newName;
    if (newEmail) user.email = newEmail;
  }

  deleteUser(user: any) {
    const confirmed = confirm("Confirmer la suppression ?");
    if (confirmed) {
      this.users = this.users.filter(u => u !== user);
    }
  }
}
