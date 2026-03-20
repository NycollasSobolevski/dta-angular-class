import { Component, Input } from '@angular/core';
import { FoodItem } from '../Food.mock';

@Component({
  selector: 'app-comida-card',
  templateUrl: './comida-card.component.html',
  styleUrls: ['./comida-card.component.css']
})
export class ComidaCardComponent {
  @Input()
  food!: FoodItem
}
