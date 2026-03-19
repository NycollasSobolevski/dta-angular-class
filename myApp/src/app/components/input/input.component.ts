import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input()
  Value: string = "";
  @Output()
  changed: EventEmitter<string> = new EventEmitter();

  onInputChange = (value: any) => {
    const stringValue = value.srcElement?.value;
    this.changed.emit(stringValue)
  }

}
