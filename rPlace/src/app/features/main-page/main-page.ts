import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private api: PixelApi
  ){}


  ngOnInit(){
    if(!sessionStorage.getItem('token'))
      this.router.navigate(['login'])


    let lines = [];
    for (let y = 0; y < 100; y++) {
      let row : IPixel[] = [];
      for(let x = 0; x < 100; x++ ) {
        row.push({
            color: 'gray',
            x: x,
            y: y
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
      {x:1,y:1,color:'#111',lastChange:new Date()},
      {x:2,y:1,color:'#634444',lastChange:new Date()},
      {x:3,y:1,color:'#aa9c9c',lastChange:new Date()},
      {x:1,y:2,color:'#111',lastChange:new Date()},
      {x:2,y:2,color:'#b6ef9c',lastChange:new Date()},
      {x:3,y:2,color:'#4c28a2',lastChange:new Date()},
      {x:1,y:3,color:'#5aac79',lastChange:new Date()},
      {x:2,y:3,color:'#e88f8f',lastChange:new Date()},
      {x:3,y:3,color:'#862986',lastChange:new Date()},
    ]

    this.api.GetAll().subscribe(
      res => {
        console.log(res);
        for (let y = 0; y < 100; y++) {
          for(let x = 0; x < 100; x++ ) {
            let exists = res.find(p => p.x == x && p.y == y);
            console.log(exists);
            
            if(exists)
              this.pixels[x][y] = exists;
          }
        }
      }
    )

    
  }

  updateData(pixel: IPixel){
    this.pixels[pixel.y][pixel.x] = pixel
  }
}
