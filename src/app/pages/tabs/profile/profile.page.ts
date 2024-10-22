import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/authetication.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  email: string | null = null;

  constructor(private authService: AutheticationService, private router: Router) {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const user = await this.authService.getProfile();
    if (user) {
      this.email = user.email;
    }
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
