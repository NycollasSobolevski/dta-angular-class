import { Component } from '@angular/core';
import MockPessoas, { IPessoa } from './Pessoas.mock';

@Component({
  selector: 'app-comida-page',
  templateUrl: './comida-page.component.html',
  styleUrls: ['./comida-page.component.css'],
})
export class ComidaPageComponent {
  protected pessoas: IPessoa[] = []
  protected abrido  = true;
  constructor () {
    this.pessoas = MockPessoas;
  }
}
