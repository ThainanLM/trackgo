import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutheticationService } from 'src/app/authetication.service';
import {Router} from '@angular/router';

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
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.loginForm?.valid){
      const user = await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).catch((error) =>{
        console.log(error);
        loading.dismiss()
      })

      if(user){
        loading.dismiss()
        this.router.navigate(['/tabs/tab1'])
      }else{
        console.log('provide correct values');
      }
    }
  }
}
  
 
