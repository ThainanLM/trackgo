import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutheticationService } from 'src/app/authetication.service';
import {Router} from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService, public router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm?.controls;
  }

  async login(){
    const auth = getAuth();
    const email = this.loginForm.value.email; // Pegue o valor do email
    const password = this.loginForm.value.password; // Pegue o valor da senha
    
    const loading = await this.loadingCtrl.create(); // Exibe o loading enquanto faz o login
    await loading.present();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        loading.dismiss(); // Feche o loading se o login for bem-sucedido
        this.router.navigate(['/tabs/tab1']); // Navegue para a tela desejada
      })
      .catch((error) => {
        loading.dismiss(); // Feche o loading em caso de erro
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Login error:', errorCode, errorMessage);
      });
  }
  
}
  
 
