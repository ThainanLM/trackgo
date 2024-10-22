import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService, public router:Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
       fullname:['', [Validators.required]],
       email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")
      ]],
       password: ['', [
        Validators.required,
        Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
      
    })
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    if (this.regForm.valid) {
      const { email, password } = this.regForm.value;
      try {
        await this.authService.registerUser(email, password);
        this.router.navigate(['/login']); // Redireciona após o registro
      } catch (error) {
        console.error('Erro ao registrar:', error);
      }
    }
  }
}
