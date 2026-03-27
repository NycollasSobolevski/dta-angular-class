import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input()
  _value: string = ""

  password: string = "";
  isValidPassword = false;

  onInputChange = (value: any) => {
    this._value = value.target.value;
  }

  onPasswordChange(value: any){ 
    this.password = value.target.value;
    if(this.password.length >= 8) {
      this.isValidPassword = true;
    } else {
      this.isValidPassword = false;
    }
  }

}
