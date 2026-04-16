import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, Subject } from 'rxjs';
import { IPixel, IUpdatePixelDto } from '../features/main-page/components/pixel/IPixel';
import { CanvasAction, GetAllRoomsResponse, MessageType, WebSocketMessage } from './interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class RoomApi extends Api {
  // private wsURL = "ws://10.234.197.18:5294/ws/room";
  private wsURL = "ws://localhost:5294/api/room";

  private socket!: WebSocket;
  private _pixelsSubject = new Subject<CanvasAction>();

  public pixels: Observable<CanvasAction> = this._pixelsSubject.asObservable();

  public connect = (roomId: string) => {
    const token = sessionStorage.getItem('token');
    if(!token)
      return

    this.socket = new WebSocket(`${this.wsURL}/${roomId}?token=${encodeURIComponent(token)}`);
    
    this.socket.onopen = (res) => {
      console.log("Socket Connectado ", res);
    };

    this.socket.onmessage = (event: MessageEvent) => {
      // console.log("On Message activated", event.data);
      const message: WebSocketMessage<any> = JSON.parse(event.data)
      console.log(message);
      
      switch(message.Type) {
        case MessageType.Message: {
          // Aqui eu recebo somente uma mensagem de texto
          break;
        } case MessageType.FirstConnection: {
          // Aqui eu recebo uma lista de pixels com todos os pixeis atuais da sessão
          this._pixelsSubject.next({type: "FULL_LOAD", payload: message.Data})
          break;
          
        } case MessageType.PlayerAction: {
          // aqui eu recebo um unico pixel que um usuário modificou
          this._pixelsSubject.next({type: "SINGLE_LOAD", payload: message.Data})
          break;

        } default: {
          console.log("nao caiu em nenhum dos casos");
          break;
          
        }
      }
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
