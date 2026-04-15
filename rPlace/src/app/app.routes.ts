import { Routes } from '@angular/router';
import { MainPage } from './features/main-page/main-page';
import { LoginPage } from './features/login-page/login-page';
import { authGuard } from './domain/auth-guard';
import { RoomPage } from './features/room-page/room-page';
import { EspecificRoomPage } from './features/room-page/especific-room-page/especific-room-page';

export const routes: Routes = [
    //! problema era que o guard precisava ser validado por ultimo, pois a ordem da lista importa ja que o match foi rejeitado e as rotas nao foram vistas antes(no caso de login)
    {path: "login", component: LoginPage, canMatch:[authGuard]},
    {path: "", component: MainPage, canMatch:[authGuard]},
    {path: "room", component: RoomPage, canMatch:[authGuard], children: [
        {path: ":id", component: EspecificRoomPage}
    ]},
];
