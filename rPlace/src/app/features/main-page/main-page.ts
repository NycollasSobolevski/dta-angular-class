import { ChangeDetectorRef, Component } from '@angular/core';
import { IPixel } from './components/pixel/IPixel';
import { Pixel } from "./components/pixel/pixel";
import { PixelApi } from '../../domain/pixel.api';

@Component({
  selector: 'app-main-page',
  imports: [Pixel],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  //FORMA ERRADA DE SE FAZER (porem funciona)  
  constructor(
    private cdr: ChangeDetectorRef,
    private api: PixelApi
  ){}


  ngOnInit(){
    let lines = [];
    for (let y = 0; y < 100; y++) {
      let row : IPixel[] = [];
      for(let x = 0; x < 100; x++ ) {
        row.push({
            Color: 'gray',
            X: x,
            Y: y
        })
      }
      lines.push(row);
    }
    this.pixels = lines;
    this.loadData();
  }

  protected pixels: IPixel[][] = []

  loadData(){
    let received: IPixel[] = [
      {X:1,Y:1,Color:'#111',LastChange:new Date()},
      {X:2,Y:1,Color:'#634444',LastChange:new Date()},
      {X:3,Y:1,Color:'#aa9c9c',LastChange:new Date()},
      {X:1,Y:2,Color:'#111',LastChange:new Date()},
      {X:2,Y:2,Color:'#b6ef9c',LastChange:new Date()},
      {X:3,Y:2,Color:'#4c28a2',LastChange:new Date()},
      {X:1,Y:3,Color:'#5aac79',LastChange:new Date()},
      {X:2,Y:3,Color:'#e88f8f',LastChange:new Date()},
      {X:3,Y:3,Color:'#862986',LastChange:new Date()},
    ]

    this.api.GetAll().subscribe(
      res => {
        this.pixels = this.pixels.map((row, x) => {
          return row.map((pixel, y) => {
            const exists = res.find(p => p.X == x && p.Y == y);
            return exists ? exists : pixel;
          })
        })
        // Estudar!!!
        this.cdr.detectChanges();
      }
    )
  }

  updateData(pixel: IPixel){
    this.pixels[pixel.Y][pixel.X] = pixel
  }

  logout = () => {
    sessionStorage.clear();
    location.reload();
  }
}
