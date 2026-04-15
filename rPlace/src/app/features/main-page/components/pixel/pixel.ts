import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPixel } from './IPixel';

@Component({
  selector: 'app-pixel',
  imports: [],
  templateUrl: './pixel.html',
  styleUrl: './pixel.css',
})
export class Pixel {
  @Input()
  data!: IPixel;

  @Output()
  onChange:EventEmitter<IPixel> = new EventEmitter();

  change(event: string){
    this.data.Color = event;
    this.onChange.emit(this.data);
  }
}
