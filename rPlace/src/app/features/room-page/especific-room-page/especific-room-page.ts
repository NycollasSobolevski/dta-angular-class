import { Component, signal } from '@angular/core';
import { RoomApi } from '../../../domain/room.api';
import { ActivatedRoute } from '@angular/router';
import { IPixel } from '../../main-page/components/pixel/IPixel';
import { Pixel } from "../../main-page/components/pixel/pixel";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-especific-room-page',
  imports: [Pixel],
  templateUrl: './especific-room-page.html',
  styleUrl: './especific-room-page.css',
})
export class EspecificRoomPage {

  constructor (
    private api: RoomApi,
    private router: ActivatedRoute
  ){}

  protected id: string = '';
  protected pixels = signal<IPixel[][]>([]);

  protected pixelSubscription!: Subscription

  ngOnInit(){
    //Definindo pixels vazios default por enquanto
    let lines = [];
    for (let y = 0; y < 100; y++) {
      let row : IPixel[] = [];
      for(let x = 0; x < 100; x++ ) {
        row.push({
            Color: '#585858',
            X: x,
            Y: y
        })
      }
      lines.push(row);
    }
    this.pixels.set(lines);

    // pegando id da room para verificar os pixels
    this.router.paramMap.forEach((param) => {
      this.id = param.get('id') ?? ""
    })

    //Conectando com websocket
    this.api.connect(this.id)
    //! UTILIZANDO O OBSERVABLE criado dos pixels
    this.pixelSubscription = this.api.pixels.subscribe(res => {
      console.log("subscription updating: ",res);
        
        switch (res.type) {
          case 'FULL_LOAD':
            this.drawAllApiPixels(res.payload)
            break;
          case 'SINGLE_LOAD':
            this.drawSinglePixel(res.payload)
            break;
        
          default:
            break;
        }
    })

  }

  drawSinglePixel = (data: IPixel) => {
    console.log("Drawing a single pixel");
    
    this.pixels.update(oldValues => {
      return oldValues.map((currentRow, y) => {
        return currentRow.map((pixel, x) => {
          if(x == data.X && y == data.Y) {
            return data
          }else {
            return pixel
          }
        })
      })
    })
  }

  drawAllApiPixels = (data: IPixel[]) => {
    console.log("Drawing all pixels");
    this.pixels.update(oldValues => {
      var values = [...oldValues];

      data.forEach(newPixel => {
        values[newPixel.Y][newPixel.X] = newPixel;
      })

      return values;
    })
  }

  updateData = (data: IPixel) => {
    this.api.updatePixel({
      Pixel: data,
      UserToken: sessionStorage.getItem('token') ?? ""
    })
  }

  ngOnDestroy(): void {
    this.api.closeConnection();
    this.pixelSubscription.unsubscribe();
  }

}
