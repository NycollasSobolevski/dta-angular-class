import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isSubscribe = false;

  login: string = "Nycollas";








  constructor(
    private _router: Router, 
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((param) => {
      this.isSubscribe = param['tab'] == "subscribe";
      
    })
  }



}
