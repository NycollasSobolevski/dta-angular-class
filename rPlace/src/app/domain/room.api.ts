import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, Subject } from 'rxjs';
import { IPixel, IUpdatePixelDto } from '../features/main-page/components/pixel/IPixel';
import { GetAllRoomsResponse } from './interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class RoomApi extends Api {
  // private wsURL = "ws://10.234.197.18:5294/ws/room";
  private wsURL = "ws://localhost:5294/api/room";

  private socket!: WebSocket;
  private PixelsSubject = new Subject<IPixel>();

  public pixels: Observable<IPixel> = this.PixelsSubject.asObservable();

  public connect = (roomId: string) => {
    const token = sessionStorage.getItem('token');
    if(!token)
      return

    this.socket = new WebSocket(`${this.wsURL}/${roomId}?token=${encodeURIComponent(token)}`);
    
    this.socket.onopen = (res) => {
      console.log("Socket Connectado ", res);
    };

    this.socket.onmessage = (event) => {
      console.log("Recebendo mensagem do socket", event);
    };  

    this.socket.onerror = (error) => {
      console.log("Erro no websocket", error);
    }

    this.socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    }
  }
  
  public updatePixel = (data: IUpdatePixelDto) => {
    if(this.socket.readyState === WebSocket.OPEN){
      this.socket.send(JSON.stringify(data));
    }
    else
      console.error("Error on send message to socket" + this.socket.readyState);
  }

  public closeConnection = () => {
    if(this.socket)
      this.socket.close();
  }

  public getRooms = () : Observable<GetAllRoomsResponse> => {
    var token = sessionStorage.getItem('token')
    if(!token) alert("Unauthorized operation!!")
    return this.client.get<GetAllRoomsResponse>(`${this.URL}/room`, {headers:this.headers}).pipe();
  }

}
