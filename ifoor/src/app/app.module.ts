import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { MainPageComponent } from './features/main-page/main-page.component';
import { NotFoundPageComponent } from './features/not-found-page/not-found-page.component';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';
import { MercadoPageComponent } from './features/main-page/mercado-page/mercado-page.component';
import { ComidaPageComponent } from './features/main-page/comida-page/comida-page.component';
import { ComidaDetailsModalComponent } from './features/main-page/comida-page/comida-details-modal/comida-details-modal.component';
import { ComidaCardComponent } from './features/main-page/comida-page/comida-card/comida-card.component';
import { ModalComponent } from './shared/modal/modal.component';
import { InputComponent } from './shared/input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    NotFoundPageComponent,
    HeaderComponent,
    NavComponent,
    MercadoPageComponent,
    ComidaPageComponent,
    ComidaDetailsModalComponent,
    ComidaCardComponent,
    ModalComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
