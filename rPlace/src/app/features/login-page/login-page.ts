import { Component, OnInit } from '@angular/core';
import { AuthApi } from '../../domain/auth.api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto } from '../../domain/UserInterfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  constructor(
    private api : AuthApi,
    private router: Router
  ){ }

  protected isSubscribe: boolean = false;

  ngOnInit() {
    if(sessionStorage.getItem('token'))
      this.router.navigate(['']);
  }

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

  formAction = () => {
    if(this.isSubscribe)
      return this.subscribe();
    return this.login()
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
        sessionStorage.setItem("token", res);
        this.router.navigate(['']);
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
