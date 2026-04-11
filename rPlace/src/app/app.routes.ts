import { Routes } from '@angular/router';
import { MainPage } from './features/main-page/main-page';
import { LoginPage } from './features/login-page/login-page';
import { authGuard } from './domain/auth-guard';

export const routes: Routes = [
    //! problema era que o guard precisava ser validado por ultimo, pois a ordem da lista importa ja que o match foi rejeitado e as rotas nao foram vistas antes(no caso de login)
    {path: "login", component: LoginPage},
    {path: "", component: MainPage, canMatch:[authGuard]},
];
