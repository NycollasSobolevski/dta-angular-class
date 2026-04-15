import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomApi } from '../../domain/room.api';
import { RouterOutlet } from '@angular/router';
import { GetAllRoomsResponse } from '../../domain/interfaces/room';

@Component({
  selector: 'app-room-page',
  imports: [RouterOutlet],
  templateUrl: './room-page.html',
  styleUrl: './room-page.css',
})
export class RoomPage implements OnInit, OnDestroy{
  constructor (
    private api: RoomApi,
  ){}

  protected ids: GetAllRoomsResponse = {
    rooms: []
  };

  ngOnInit(){
    this.api.getRooms().subscribe(res => {
      this.ids = res;
    })
  }

  ngOnDestroy(): void {
    this.api.closeConnection();
  }

}
