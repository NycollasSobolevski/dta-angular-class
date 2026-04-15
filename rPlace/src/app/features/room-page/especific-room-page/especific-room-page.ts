import { Component, signal } from '@angular/core';
import { RoomApi } from '../../../domain/room.api';
import { ActivatedRoute } from '@angular/router';
import { IPixel } from '../../main-page/components/pixel/IPixel';
import { Pixel } from "../../main-page/components/pixel/pixel";

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

  ngOnInit(){
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
    this.router.paramMap.forEach((param) => {
      this.id = param.get('id') ?? ""
    })
    this.api.connect(this.id)

  }

  updateData = (data: IPixel) => {
    this.api.updatePixel({
      Pixel: data,
      UserToken: sessionStorage.getItem('token') ?? ""
    })
  }

  ngOnDestroy(): void {
    this.api.closeConnection();
  }

}
