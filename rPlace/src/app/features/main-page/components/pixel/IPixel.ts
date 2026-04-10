export interface IPixel {
    id?: number,
    x: number,
    y: number,
    lastChange?: Date,
    color: string,
    user?: UserDto
}

export interface UserDto {
    id: number,
    username: string,
}