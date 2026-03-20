import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from '../Food.mock';

@Component({
  selector: 'app-comida-details-modal',
  templateUrl: './comida-details-modal.component.html',
  styleUrls: ['./comida-details-modal.component.css']
})
export class ComidaDetailsModalComponent {
  @Input()
  item?: FoodItem
  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  toggleClose = () => {
    this.onClose.emit();
  }
}
