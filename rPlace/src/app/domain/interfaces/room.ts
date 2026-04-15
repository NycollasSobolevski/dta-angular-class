import { IPixel, UserDto } from "../../features/main-page/components/pixel/IPixel";

export interface IRoom {
    id: string,
    name: string,
    players: UserDto[],
    pixels: IPixel[]
}

export interface MinimalizedRoom {
    id: string,
    name: string,
    quantityOfPlayers: number,
}

export interface GetAllRoomsResponse {
    rooms?: MinimalizedRoom[]
}

export interface WebSocketMessage {
    title: string,
    data: any
}