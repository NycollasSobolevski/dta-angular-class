import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input()
  Title: string = ""
  @Input()
  Confirmation: boolean = false;
  @Input()
  SaveLabel?: string;



  @Output()
  onClose: EventEmitter<void> = new EventEmitter();
  @Output()
  onSave: EventEmitter<void> = new EventEmitter();

  toggleClose = () => {
    this.onClose.emit();
  }

  toggleSave = () => {
    this.onSave.emit();
  }
}
