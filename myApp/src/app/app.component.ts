import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  
  nome = "Nycollas";
  inputValueChanged = (value: string) => {
    this.nome = value
  }
  
  
  // count = 0;
  // foiClicado = () => {
  //   this.count++;
  //   console.log("aaa");
  // }
}
