import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, Subject } from 'rxjs';
import { IPixel } from '../features/main-page/components/pixel/IPixel';

@Injectable({
  providedIn: 'root',
})
export class PixelApi extends Api{

  // private wsURL = "ws://10.234.197.18:5294/ws/room";

  // //!!get/set dos pixels

  // private socket!: WebSocket;
  // private PixelsSubject = new Subject<IPixel>();

  // public pixels: Observable<IPixel> = this.PixelsSubject.asObservable();


  // public connect(roomId: string) {
  //   const token = sessionStorage.getItem('token');
  //   if(!token)
  //     return

  //   this.socket = new WebSocket(`${this.wsURL}/${roomId}?token=${token}`);
    
  //   this.socket.onopen = () => {
      
  //   }
  // }

  public GetAll = (): Observable<IPixel[]> => {
    return this.client.get<IPixel[]>(`${this.URL}/pixel`).pipe();
  }

  public UpdatePixel = (data: IPixel): Observable<void> => {
    return this.client.post<void>(`${this.URL}/pixel`, data).pipe()
  }

}
