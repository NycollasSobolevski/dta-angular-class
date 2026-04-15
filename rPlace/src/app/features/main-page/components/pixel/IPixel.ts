export interface IPixel {
    Id?: number,
    X: number,
    Y: number,
    LastChange?: Date,
    Color: string,
    User?: UserDto
}

export interface IUpdatePixelDto {
    Pixel: IPixel,
    UserToken?: string
}

export interface UserDto {
    id: number,
    username: string,
}