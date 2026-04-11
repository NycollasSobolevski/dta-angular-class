import { Routes } from '@angular/router';
import { MainPage } from './features/main-page/main-page';
import { LoginPage } from './features/login-page/login-page';
import { authGuardGuard } from './domain/auth-guard-guard';

export const routes: Routes = [
    {path: "", component: MainPage},
    {path: "login", component: LoginPage}
];
