import { Component } from '@angular/core';
import MockPessoas, { IPessoa } from './Pessoas.mock';
import { FoodItem, menu } from './Food.mock';

@Component({
  selector: 'app-comida-page',
  templateUrl: './comida-page.component.html',
  styleUrls: ['./comida-page.component.css'],
})
export class ComidaPageComponent {
  protected menu: FoodItem[] = []
  protected focusedFood?: FoodItem; 
  // protected abrido = true;
  constructor () {
    this.menu = menu;
  }

  onCardClick = (item: FoodItem) => {
    this.focusedFood = item
  }

  save = () => {
    alert('Pedido efetuado com sucesso!')
  }
}
