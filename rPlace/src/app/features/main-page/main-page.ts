import { Component } from '@angular/core';
import { AuthApi } from '../../domain/auth.api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto } from '../../domain/UserInterfaces';

@Component({
  selector: 'app-main-page',
  imports: [ReactiveFormsModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  constructor(private api : AuthApi){}

  loginForm : FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get Username() {
    return this.loginForm.get("username")
  }
  get Password() {
    return this.loginForm.get("password")
  }

  login = () => {
    if(!this.loginForm.valid)
    {
      alert("Nem todos os campos são validos!");
      return
    }
    const data: LoginDto = {
      password: this.Password?.value,
      username: this.Username?.value
    }

    this.api.login(data).subscribe(
      res => {
        console.log(res)
        sessionStorage.setItem("token", res);
        // location.reload();
      }
    );
  }

  subscribe = () => {
    if(!this.loginForm.valid)
    {
      alert("Nem todos os campos são validos!");
      return
    }
  }
}
